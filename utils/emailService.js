const nodemailer = require("nodemailer");

// Get notification emails from database
const getNotificationEmails = async (type) => {
  try {
    const NotificationEmail = require("../models/NotificationEmail");
    const notificationEmail = await NotificationEmail.findOne({
      type,
      isEnabled: true,
    });

    console.log(`🔍 Looking for notification emails for type: ${type}`);
    console.log(`📧 Found notification settings:`, notificationEmail);

    if (!notificationEmail || !notificationEmail.emails.length) {
      console.log(
        `⚠️ No notification settings found for ${type}, no emails will be sent`
      );
      // Return empty array if no settings found - no fallback email
      return [];
    }

    const activeEmails = notificationEmail.emails
      .filter((email) => email.isActive)
      .map((email) => email.email);

    console.log(`✅ Active emails for ${type}:`, activeEmails);
    return activeEmails;
  } catch (error) {
    console.error("Error getting notification emails:", error);
    // Return empty array on error - no fallback email
    return [];
  }
};

// Send notification to multiple emails
const sendNotificationToEmails = async (emails, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send individual email to each recipient to ensure delivery
    const emailPromises = emails.map(async (email) => {
      const mailOptions = {
        from: '"PRAKESH ENTERPRISES" <' + process.env.EMAIL_USER + ">",
        to: email,
        subject: subject,
        html: htmlContent,
      };

      try {
        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ Notification sent successfully to: ${email}`);
        return { email, success: true };
      } catch (error) {
        console.error(
          `❌ Failed to send notification to ${email}:`,
          error.message
        );
        return { email, success: false, error: error.message };
      }
    });

    const results = await Promise.allSettled(emailPromises);
    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value.success
    ).length;
    const failed = results.filter(
      (r) =>
        r.status === "rejected" ||
        (r.status === "fulfilled" && !r.value.success)
    ).length;

    console.log(
      `📧 Notification email results: ${successful} successful, ${failed} failed`
    );
    return { successful, failed, total: emails.length };
  } catch (error) {
    console.error("Error in sendNotificationToEmails:", error);
    throw error;
  }
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send contact form notification
const sendContactNotification = async (contactData) => {
  try {
    const notificationEmails = await getNotificationEmails("contact");

    // If no notification emails are configured, log and return
    if (!notificationEmails || notificationEmails.length === 0) {
      console.log(
        "⚠️ No notification emails configured for contact form - skipping notification"
      );
      return { successful: 0, failed: 0, total: 0 };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">🚨 NEW CONTACT FORM SUBMISSION</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES - Website Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #007bff; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📋 Customer Details</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 8px 0;"><strong>👤 Name:</strong> <span style="color: #007bff; font-weight: 600;">${
              contactData.name
            }</span></p>
            <p style="margin: 8px 0;"><strong>📧 Email:</strong> <span style="color: #007bff; font-weight: 600;">${
              contactData.email
            }</span></p>
            <p style="margin: 8px 0;"><strong>📞 Phone:</strong> <span style="color: #007bff; font-weight: 600;">${
              contactData.phone || "Not provided"
            }</span></p>
            <p style="margin: 8px 0;"><strong>⏰ Submitted:</strong> <span style="color: #007bff; font-weight: 600;">${new Date().toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            )}</span></p>
          </div>
          
          <h3 style="color: #333;">💬 Customer Message</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 15px 0;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${
              contactData.message
            }</p>
          </div>
        </div>
        
        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
          <h4 style="margin: 0 0 10px 0; color: #17a2b8;">🎯 Quick Actions</h4>
          <p style="margin: 5px 0; color: #666;">
            • Reply directly to: <a href="mailto:${
              contactData.email
            }" style="color: #007bff;">${contactData.email}</a><br>
            • Call customer: <a href="tel:${
              contactData.phone
            }" style="color: #007bff;">${contactData.phone || "N/A"}</a><br>
            • View in admin dashboard
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This notification was automatically sent from the Prakash Enterprises website contact form.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `;

    return await sendNotificationToEmails(
      notificationEmails,
      `🚨 NEW CONTACT FORM SUBMISSION - ${contactData.name}`,
      htmlContent
    );
  } catch (error) {
    console.error("Error sending contact notification:", error);
    throw error;
  }
};

// Send loan application notification
const sendLoanApplicationNotification = async (applicationData) => {
  try {
    const notificationEmails = await getNotificationEmails("loan-application");

    // If no notification emails are configured, log and return
    if (!notificationEmails || notificationEmails.length === 0) {
      console.log(
        "⚠️ No notification emails configured for loan application - skipping notification"
      );
      return { successful: 0, failed: 0, total: 0 };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">📋 NEW LOAN APPLICATION</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES - Website Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #28a745; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📋 Applicant Details</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 8px 0;"><strong>👤 Name:</strong> <span style="color: #28a745; font-weight: 600;">${
              applicationData.name
            }</span></p>
            <p style="margin: 8px 0;"><strong>📧 Email:</strong> <span style="color: #28a745; font-weight: 600;">${
              applicationData.email
            }</span></p>
            <p style="margin: 8px 0;"><strong>📞 Phone:</strong> <span style="color: #28a745; font-weight: 600;">${
              applicationData.phone
            }</span></p>
            <p style="margin: 8px 0;"><strong>💰 Service:</strong> <span style="color: #28a745; font-weight: 600;">${
              applicationData.service
            }</span></p>
            <p style="margin: 8px 0;"><strong>⏰ Submitted:</strong> <span style="color: #28a745; font-weight: 600;">${new Date().toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            )}</span></p>
          </div>
          
          <h3 style="color: #333;">💬 Additional Details</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745; margin: 15px 0;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${
              applicationData.message || "No additional details provided"
            }</p>
          </div>
        </div>
        
        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
          <h4 style="margin: 0 0 10px 0; color: #17a2b8;">🎯 Quick Actions</h4>
          <p style="margin: 5px 0; color: #666;">
            • Reply directly to: <a href="mailto:${
              applicationData.email
            }" style="color: #007bff;">${applicationData.email}</a><br>
            • Call applicant: <a href="tel:${
              applicationData.phone
            }" style="color: #007bff;">${applicationData.phone}</a><br>
            • View in admin dashboard
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This notification was automatically sent from the Prakash Enterprises website loan application form.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `;

    return await sendNotificationToEmails(
      notificationEmails,
      `📋 NEW LOAN APPLICATION - ${applicationData.name}`,
      htmlContent
    );
  } catch (error) {
    console.error("Error sending loan application notification:", error);
    throw error;
  }
};

// Send quote request notification
const sendQuoteRequestNotification = async (quoteData) => {
  try {
    const notificationEmails = await getNotificationEmails("quote-request");

    // If no notification emails are configured, log and return
    if (!notificationEmails || notificationEmails.length === 0) {
      console.log(
        "⚠️ No notification emails configured for quote request - skipping notification"
      );
      return { successful: 0, failed: 0, total: 0 };
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: white; padding: 25px; border-radius: 15px; text-align: center; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">💰 NEW QUOTE REQUEST</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES - Website Notification</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #ffc107; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">📋 Customer Details</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 15px 0;">
            <p style="margin: 8px 0;"><strong>👤 Name:</strong> <span style="color: #ffc107; font-weight: 600;">${
              quoteData.name
            }</span></p>
            <p style="margin: 8px 0;"><strong>📧 Email:</strong> <span style="color: #ffc107; font-weight: 600;">${
              quoteData.email
            }</span></p>
            <p style="margin: 8px 0;"><strong>📞 Phone:</strong> <span style="color: #ffc107; font-weight: 600;">${
              quoteData.phone
            }</span></p>
            <p style="margin: 8px 0;"><strong>💰 Service:</strong> <span style="color: #ffc107; font-weight: 600;">${
              quoteData.service
            }</span></p>
            <p style="margin: 8px 0;"><strong>💵 Amount:</strong> <span style="color: #ffc107; font-weight: 600;">₹${
              quoteData.amount || "Not specified"
            }</span></p>
            <p style="margin: 8px 0;"><strong>⏰ Submitted:</strong> <span style="color: #ffc107; font-weight: 600;">${new Date().toLocaleString(
              "en-IN",
              { timeZone: "Asia/Kolkata" }
            )}</span></p>
          </div>
          
          <h3 style="color: #333;">💬 Additional Details</h3>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 15px 0;">
            <p style="margin: 0; line-height: 1.6; color: #333;">${
              quoteData.message || "No additional details provided"
            }</p>
          </div>
        </div>
        
        <div style="background: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
          <h4 style="margin: 0 0 10px 0; color: #17a2b8;">🎯 Quick Actions</h4>
          <p style="margin: 5px 0; color: #666;">
            • Reply directly to: <a href="mailto:${
              quoteData.email
            }" style="color: #007bff;">${quoteData.email}</a><br>
            • Call customer: <a href="tel:${
              quoteData.phone
            }" style="color: #007bff;">${quoteData.phone}</a><br>
            • View in admin dashboard
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This notification was automatically sent from the Prakash Enterprises website quote request form.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `;

    return await sendNotificationToEmails(
      notificationEmails,
      `💰 NEW QUOTE REQUEST - ${quoteData.name}`,
      htmlContent
    );
  } catch (error) {
    console.error("Error sending quote request notification:", error);
    throw error;
  }
};

// Send OTP for password reset
const sendOTPEmail = async (email, otp) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: '"PRAKESH ENTERPRISES" <' + process.env.EMAIL_USER + ">",
    to: email,
    subject: "🔐 Password Reset OTP - Prakash Enterprises Admin",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">🔐 Password Reset</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES - Admin Dashboard</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0; text-align: center;">Security Verification</h2>
          
          <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #28a745;">
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #333; font-size: 16px;">
              You have requested to reset your password for the <strong>Prakash Enterprises Admin Dashboard</strong>. 
              Please use the OTP code below to complete the verification process.
            </p>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin: 25px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 15px 0; font-size: 20px; opacity: 0.9;">🔐 Your OTP Code</h3>
              <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin: 15px 0; border: 3px dashed rgba(255,255,255,0.4); box-shadow: inset 0 0 20px rgba(255,255,255,0.1);">
                <h1 style="margin: 0; font-size: 48px; letter-spacing: 12px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3); color: #fff; background: rgba(255,255,255,0.2); padding: 15px; border-radius: 10px;">${otp}</h1>
              </div>
              <p style="margin: 15px 0 0 0; opacity: 0.9; font-size: 16px; font-weight: 600;">📋 Copy this code to complete your password reset</p>
              <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; margin: 15px 0; border: 1px solid rgba(255,255,255,0.2);">
                <p style="margin: 5px 0; font-size: 14px; opacity: 0.9;">⏰ Valid for 10 minutes only</p>
                <p style="margin: 5px 0; font-size: 14px; opacity: 0.9;">🔒 Use only once for security</p>
              </div>
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h4 style="margin: 0 0 10px 0; color: #856404;">⚠️ Important Security Notes</h4>
              <ul style="margin: 10px 0; color: #856404; padding-left: 20px;">
                <li>This OTP will expire in <strong>10 minutes</strong></li>
                <li>Do not share this code with anyone</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>For security, this code can only be used once</li>
              </ul>
            </div>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
              <h4 style="margin: 0 0 10px 0; color: #17a2b8;">📋 Quick Copy Instructions</h4>
              <p style="margin: 5px 0; color: #17a2b8;">
                • Select the OTP code above and copy it (Ctrl+C)<br>
                • Paste it into the verification field in your browser<br>
                • Complete the password reset process within 10 minutes
              </p>
            </div>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h4 style="color: #333; margin-top: 0;">🔒 Security Reminder</h4>
          <p style="margin: 10px 0; color: #666;">
            Always use a strong password and never share your login credentials with anyone.
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This is an automated security email from Prakash Enterprises Admin Dashboard.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send reply to customer
const sendReplyToCustomer = async (
  customerEmail,
  customerName,
  replyMessage,
  adminName
) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: '"PRAKESH ENTERPRISES" <' + process.env.EMAIL_USER + ">",
    to: customerEmail,
    subject: "Re: Your Inquiry - Prakash Enterprises",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">📧 Response to Your Inquiry</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0; text-align: center;">Thank You for Contacting Us</h2>
          
          <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #28a745;">
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #333; font-size: 16px;">
              Dear <strong>${customerName}</strong>,
            </p>
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #333; font-size: 16px;">
              Thank you for reaching out to Prakash Enterprises. We have received your inquiry and our team is working on it.
            </p>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
              <h4 style="margin: 0 0 15px 0; color: #17a2b8;">💬 Our Response</h4>
              <p style="margin: 0; line-height: 1.6; color: #333; font-size: 16px;">${replyMessage}</p>
            </div>
            
            <p style="margin: 20px 0 0 0; line-height: 1.6; color: #333; font-size: 16px;">
              If you have any further questions or need additional assistance, please don't hesitate to contact us.
            </p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h4 style="color: #333; margin-top: 0;">📞 Contact Information</h4>
          <p style="margin: 10px 0; color: #666;">
            <strong>Phone:</strong> +91-7383948447, +91-9712729535<br>
            <strong>Email:</strong> prakashenterprise051@gmail.com<br>
            <strong>Address:</strong> Star Chambers 229, Doctor Rajendra Prasad Road, Panchnath Plot, Sadar, Rajkot, Gujarat, India
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This is an automated response from Prakash Enterprises.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send contact confirmation to customer
const sendContactConfirmation = async (contactData) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: '"PRAKESH ENTERPRISES" <' + process.env.EMAIL_USER + ">",
    to: contactData.email,
    subject: "✅ Query Received - Thank You for Contacting Prakash Enterprises",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">✅ Query Received Successfully</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES - Financial Services</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; margin: 20px 0;">
          <h2 style="color: #333; margin-top: 0; text-align: center;">Thank You for Contacting Us!</h2>
          
          <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #28a745;">
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #333; font-size: 16px;">
              Dear <strong>${contactData.name}</strong>,
            </p>
            <p style="margin: 0 0 20px 0; line-height: 1.6; color: #333; font-size: 16px;">
              We have successfully received your inquiry and our dedicated team will review your request and get back to you within <strong>24 hours</strong> with a detailed response.
            </p>
            
            <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
              <h4 style="margin: 0 0 15px 0; color: #17a2b8;">📋 Your Message Details</h4>
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="margin: 0; line-height: 1.6; color: #333; font-size: 16px; font-style: italic;">"${
                  contactData.message
                }"</p>
              </div>
            </div>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h4 style="margin: 0 0 10px 0; color: #856404;">⏰ What Happens Next?</h4>
              <ul style="margin: 0; padding-left: 20px; color: #856404;">
                <li>Our team will review your inquiry within 2-4 hours</li>
                <li>You'll receive a detailed response within 24 hours</li>
                <li>We may contact you for additional information if needed</li>
                <li>Rest assured, your information is secure and confidential</li>
              </ul>
            </div>
            
            <p style="margin: 20px 0 0 0; line-height: 1.6; color: #333; font-size: 16px;">
              We appreciate your trust in Prakash Enterprises and look forward to assisting you with your financial needs. Your satisfaction is our top priority.
            </p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0; text-align: center;">📞 Our Contact Information</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #28a745;">
              <h4 style="margin: 0 0 10px 0; color: #28a745;">📞 Phone Numbers</h4>
              <p style="margin: 5px 0; color: #666;">
                <strong>Primary:</strong> +91-7383948447<br>
                <strong>Secondary:</strong> +91-9712729535
              </p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 10px; text-align: center; border-left: 4px solid #17a2b8;">
              <h4 style="margin: 0 0 10px 0; color: #17a2b8;">📧 Email Address</h4>
              <p style="margin: 5px 0; color: #666;">
                <strong>Business:</strong> prakashenterprise051@gmail.com
              </p>
            </div>
          </div>
          <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; border-left: 4px solid #6f42c1;">
            <h4 style="margin: 0 0 10px 0; color: #6f42c1;">📍 Office Address</h4>
            <p style="margin: 5px 0; color: #666; line-height: 1.6;">
              Star Chambers 229, Doctor Rajendra Prasad Road,<br>
              Panchnath Plot, Sadar, Rajkot, Gujarat, India
            </p>
          </div>
        </div>
        
        <div style="background: #d4edda; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #28a745;">
          <h4 style="margin: 0 0 15px 0; color: #155724;">💼 Our Services</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <h5 style="margin: 0 0 8px 0; color: #28a745;">💰 Loan Services</h5>
              <ul style="margin: 0; padding-left: 15px; font-size: 14px; color: #666;">
                <li>Personal Loans</li>
                <li>Business Loans</li>
                <li>Home Loans</li>
                <li>Vehicle Loans</li>
              </ul>
            </div>
            <div style="background: white; padding: 15px; border-radius: 8px;">
              <h5 style="margin: 0 0 8px 0; color: #17a2b8;">🛡️ Insurance Services</h5>
              <ul style="margin: 0; padding-left: 15px; font-size: 14px; color: #666;">
                <li>Life Insurance</li>
                <li>Health Insurance</li>
                <li>Vehicle Insurance</li>
                <li>Property Insurance</li>
              </ul>
            </div>
          </div>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This is an automated confirmation email from Prakash Enterprises.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })} | Reference ID: ${contactData.email.split("@")[0]}-${Date.now()
      .toString()
      .slice(-6)}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

// Send promotional email
const sendPromotionalEmail = async (recipientEmail, subject, message) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: '"PRAKESH ENTERPRISES" <' + process.env.EMAIL_USER + ">",
    to: recipientEmail,
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 15px; text-align: center; margin-bottom: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
          <h1 style="margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">💰 Special Offer</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">PRAKESH ENTERPRISES</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 15px; margin: 20px 0;">
          <div style="background: white; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 5px solid #28a745;">
            <div style="background: #e8f4fd; padding: 20px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #17a2b8;">
              <h4 style="margin: 0 0 15px 0; color: #17a2b8;">💬 Message</h4>
              <p style="margin: 0; line-height: 1.6; color: #333; font-size: 16px;">${message}</p>
            </div>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center;">
          <h4 style="color: #333; margin-top: 0;">📞 Contact Information</h4>
          <p style="margin: 10px 0; color: #666;">
            <strong>Phone:</strong> +91-7383948447, +91-9712729535<br>
            <strong>Email:</strong> prakashenterprise051@gmail.com<br>
            <strong>Address:</strong> Star Chambers 229, Doctor Rajendra Prasad Road, Panchnath Plot, Sadar, Rajkot, Gujarat, India
          </p>
        </div>
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          🔔 This is a promotional email from Prakash Enterprises.<br>
          📅 ${new Date().toLocaleDateString(
            "en-IN"
          )} at ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    })}
        </p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendContactNotification,
  sendLoanApplicationNotification,
  sendQuoteRequestNotification,
  sendOTPEmail,
  sendReplyToCustomer,
  sendContactConfirmation,
  sendPromotionalEmail,
  getNotificationEmails,
  sendNotificationToEmails,
};
