import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/textarea";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  Search,
  Reply,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Settings,
  UserPlus,
  Bell,
  Calendar,
  TrendingUp,
  BarChart3,
  RefreshCw,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  FileSpreadsheet,
  File,
  Send,
  Upload,
  Activity,
  Zap,
  Users2,
  MailCheck,
  MailX,
  Shield,
  Crown,
  Globe,
  PieChart,
  LineChart,
  Repeat,
} from "lucide-react";

// Admin Login Form Styles
const adminLoginStyles = `
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .form input::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form button {
    align-self: flex-end;
  }

  .flex-column > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 85%;
    height: 100%;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .flex-row > div > label {
    font-size: 14px;
    color: black;
    font-weight: 400;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }

  .button-submit {
    margin: 20px 0 10px 0;
    background-color: #151717;
    border: none;
    color: white;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    height: 50px;
    width: 100%;
    cursor: pointer;
  }

  .button-submit:hover {
    background-color: #252727;
  }

  .p {
    text-align: center;
    color: black;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }

  .fancy-button {
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 24px;
    overflow: hidden;
    font-weight: 500;
    transition: all 0.5s ease-in-out;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    text-decoration: none;
  }

  .fancy-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  .fancy-button span {
    position: absolute;
    top: 0;
    right: 0;
    width: 16px;
    height: 16px;
    transition: all 0.5s ease-in-out;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  .fancy-button:hover span {
    transform: translate(-4px, -4px);
  }

  .fancy-button span::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: white;
    transform: rotate(45deg) translate(50%, -50%);
  }

  .fancy-button .bottom-span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 16px;
    height: 16px;
    transition: all 0.5s ease-in-out;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: rotate(180deg);
  }

  .fancy-button:hover .bottom-span {
    transform: translate(4px, 4px) rotate(180deg);
  }

  .fancy-button .bottom-span::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: white;
    transform: rotate(45deg) translate(50%, -50%);
  }

  .fancy-button .slide-bg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(-100%);
    border-radius: 8px;
  }

  .fancy-button:hover .slide-bg {
    transform: translateX(0);
  }

  .fancy-button .button-text {
    position: relative;
    width: 100%;
    text-align: left;
    transition: all 0.2s ease-in-out;
  }

  .fancy-button:hover .button-text {
    color: white;
  }

  .otp-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin: 20px 0;
  }

  .otp-input {
    width: 35px;
    height: 35px;
    text-align: center;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
  }

  .otp-input:focus {
    border-color: #2d79f3;
    outline: none;
    box-shadow: 0 0 0 3px rgba(45, 121, 243, 0.1);
  }

  .otp-paste-section {
    margin: 15px 0;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .toast {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    min-width: 300px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(0);
    opacity: 1;
    transition: all 0.3s ease;
  }

  .toast.removing {
    transform: translateX(100%);
    opacity: 0;
  }

  .toast.success {
    background: linear-gradient(135deg, #10b981, #059669);
  }

  .toast.error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }

  .toast.info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
  }

  .toast.warning {
    background: linear-gradient(135deg, #f59e0b, #d97706);
  }
`;

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Notification and promotion states
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [promotionForm, setPromotionForm] = useState({
    subject: "",
    message: "",
    template: "",
    recipients: [],
    customRecipients: "",
  });
  const [promotionTemplates] = useState([
    {
      id: 1,
      name: "Welcome Offer",
      subject: "Welcome to Prakash Enterprises!",
      message:
        "Dear valued customer,\n\nWelcome to Prakash Enterprises! We're excited to have you on board.\n\nAs a special welcome offer, we're providing you with exclusive benefits on our loan and insurance services.\n\nBest regards,\nPrakash Enterprises Team",
    },
    {
      id: 2,
      name: "Loan Promotion",
      subject: "Special Loan Offers Available Now!",
      message:
        "Dear customer,\n\nWe have exciting loan offers with competitive interest rates and flexible repayment options.\n\nContact us today to learn more about our special deals!\n\nBest regards,\nPrakash Enterprises Team",
    },
    {
      id: 3,
      name: "Insurance Update",
      subject: "Protect Your Future with Our Insurance Plans",
      message:
        "Dear customer,\n\nSecure your future with our comprehensive insurance plans. We offer the best coverage at affordable rates.\n\nGet a free consultation today!\n\nBest regards,\nPrakash Enterprises Team",
    },
  ]);
  const [promotionHistory, setPromotionHistory] = useState([]);
  const [sendingPromotion, setSendingPromotion] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Login state
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Forgot password state
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const otpInputRefs = useRef([]);

  // New user form
  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // Contact editing state
  const [editingContact, setEditingContact] = useState(null);
  const [contactEditForm, setContactEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  });

  // Visitor analytics state
  const [visitorStats, setVisitorStats] = useState(null);
  const [lastContactCount, setLastContactCount] = useState(0);
  const [newContactNotification, setNewContactNotification] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [notificationEmails, setNotificationEmails] = useState([]);
  const [editingNotificationType, setEditingNotificationType] = useState(null);
  const [notificationEmailForm, setNotificationEmailForm] = useState({
    emails: [],
    isEnabled: true,
  });
  const [adminLogs, setAdminLogs] = useState([]);
  const [logsPagination, setLogsPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });
  const [logsFilters, setLogsFilters] = useState({
    action: "",
    performedBy: "",
  });

  // Change Password State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [changePasswordData, setChangePasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Helper function to check if contact is new (within 24 hours)
  const isContactNew = (contact) => {
    const contactDate = new Date(contact.createdAt);
    const now = new Date();
    const hoursDiff = (now - contactDate) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  // Helper function to check if contact is urgent
  const isContactUrgent = (contact) => {
    const urgentKeywords = [
      "urgent",
      "emergency",
      "asap",
      "immediate",
      "critical",
      "help",
      "sos",
    ];
    const message = contact.message.toLowerCase();
    return urgentKeywords.some((keyword) => message.includes(keyword));
  };

  // Filter contacts based on search term and status
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      searchTerm === "" ||
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "new" && isContactNew(contact)) ||
      (filterStatus === "urgent" && isContactUrgent(contact)) ||
      (filterStatus === "unreplied" &&
        (contact.status === "new" || !contact.status)) ||
      (filterStatus === "replied" && contact.status === "replied") ||
      (filterStatus === "closed" && contact.status === "closed");

    return matchesSearch && matchesFilter;
  });

  const API_BASE =
    process.env.NODE_ENV === "production"
      ? "https://prakash-enterprises.vercel.app/api/admin"
      : "http://localhost:5000/api/admin";
  const notificationRef = useRef(null);

  // Click outside notification handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toast notification functions
  const showToast = (message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, removing: true } : toast
        )
      );
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 300);
    }, 4000);
  };

  const showConfirm = (message, action) => {
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmMessage("");
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
    setConfirmMessage("");
  };

  const handleOtpInput = (index, value) => {
    if (value.length <= 1) {
      const newOtpInputs = [...otpInputs];
      newOtpInputs[index] = value;
      setOtpInputs(newOtpInputs);

      // Auto-focus next input
      if (value && index < 5) {
        otpInputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpInputs[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const startOtpCountdown = () => {
    setOtpCountdown(60);
    const interval = setInterval(() => {
      setOtpCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOtp = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: forgotPasswordForm.email }),
      });

      const data = await response.json();
      if (data.success) {
        showToast("OTP resent successfully", "success");
        setOtpInputs(["", "", "", "", "", ""]);
        startOtpCountdown();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      showToast("Failed to resend OTP", "error");
    }
  };

  const handleOtpPaste = (pastedOtp) => {
    const otpDigits = pastedOtp.replace(/\D/g, "").slice(0, 6).split("");
    const newOtpInputs = [...otpInputs];
    otpDigits.forEach((digit, index) => {
      if (index < 6) {
        newOtpInputs[index] = digit;
      }
    });
    setOtpInputs(newOtpInputs);
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleOtpPaste(text);
      showToast("OTP pasted from clipboard", "success");
    } catch (error) {
      showToast("Failed to read clipboard", "error");
    }
  };

  const exportToCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${filename}.csv exported successfully`, "success");
  };

  const exportToExcel = (data, filename) => {
    // Simulate Excel export (in real implementation, use a library like xlsx)
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(data[0]).join(",") +
      "\n" +
      data.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`${filename}.xlsx exported successfully`, "success");
  };

  const exportToPDF = (data, filename) => {
    // Simulate PDF export (in real implementation, use a library like jsPDF)
    showToast("PDF export feature coming soon", "info");
  };

  const fetchNotifications = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setNotifications(data.data);
        setUnreadNotifications(data.data.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [API_BASE]);

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE}/notifications/${notificationId}/read`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleTemplateSelect = (templateId) => {
    const template = promotionTemplates.find((t) => t.id === templateId);
    if (template) {
      setPromotionForm({
        ...promotionForm,
        subject: template.subject,
        message: template.message,
        template: template.name,
      });
      showToast(`Template "${template.name}" selected`, "success");
    }
  };

  const sendPromotion = async (e) => {
    e.preventDefault();
    if (promotionForm.recipients.length === 0) {
      showToast("Please add at least one recipient", "error");
      return;
    }

    setSendingPromotion(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/promotions/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subject: promotionForm.subject,
          message: promotionForm.message,
          recipients: promotionForm.recipients,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showToast(data.message, "success");
        setPromotionForm({
          subject: "",
          message: "",
          template: "",
          recipients: [],
          customRecipients: "",
        });
        fetchPromotionHistory();
      } else {
        showToast(data.message || "Failed to send promotion", "error");
      }
    } catch (error) {
      console.error("Error sending promotion:", error);
      showToast(`Failed to send promotion: ${error.message}`, "error");
    } finally {
      setSendingPromotion(false);
    }
  };

  const testPromotionalEmail = async () => {
    const testEmail = prompt("Enter test email address:");
    if (!testEmail) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/test-promotional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          testEmail: testEmail,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showToast(
          "Test promotional email sent successfully! Check your inbox.",
          "success"
        );
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error sending test promotional email:", error);
      showToast("Failed to send test promotional email", "error");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvContent = event.target.result;
        const lines = csvContent.split("\n");
        const emails = lines
          .map((line) => line.split(",")[0]?.trim())
          .filter((email) => email && email.includes("@"));

        setPromotionForm((prev) => ({
          ...prev,
          recipients: [...new Set([...prev.recipients, ...emails])],
        }));
        showToast(`${emails.length} emails imported from file`, "success");
      } catch (error) {
        showToast("Error reading file", "error");
      }
    };
    reader.readAsText(file);
  };

  const fetchPromotionHistory = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/promotions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setPromotionHistory(data.data);
      }
    } catch (error) {
      console.error("Error fetching promotion history:", error);
    }
  }, [API_BASE]);

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setDashboardStats(data.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [API_BASE]);

  const fetchVisitorStats = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/visitor-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setVisitorStats(data.data);
      } else {
        showToast("Failed to fetch visitor stats", "error");
      }
    } catch (error) {
      console.error("Error fetching visitor stats:", error);
      showToast("Failed to fetch visitor stats", "error");
    }
  }, [API_BASE]);

  const fetchNotificationEmails = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/notification-emails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setNotificationEmails(data.data);
      } else {
        showToast("Failed to fetch notification email settings", "error");
      }
    } catch (error) {
      console.error("Error fetching notification emails:", error);
      showToast("Failed to fetch notification email settings", "error");
    }
  }, [API_BASE]);

  const updateNotificationEmails = async (type) => {
    try {
      const token = localStorage.getItem("adminToken");
      console.log(`🔧 Updating notification emails for type: ${type}`);
      console.log(`📧 Sending data:`, notificationEmailForm);

      const response = await fetch(`${API_BASE}/notification-emails/${type}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(notificationEmailForm),
      });

      const data = await response.json();
      if (data.success) {
        showToast(
          "Notification email settings updated successfully",
          "success"
        );
        setEditingNotificationType(null);
        setNotificationEmailForm({ emails: [], isEnabled: true });
        fetchNotificationEmails();
      } else {
        showToast(
          data.message || "Failed to update notification email settings",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating notification emails:", error);
      showToast("Failed to update notification email settings", "error");
    }
  };

  const addNotificationEmail = () => {
    setNotificationEmailForm((prev) => ({
      ...prev,
      emails: [...prev.emails, { email: "", name: "", isActive: true }],
    }));
  };

  const removeNotificationEmail = (index) => {
    setNotificationEmailForm((prev) => ({
      ...prev,
      emails: prev.emails.filter((_, i) => i !== index),
    }));
  };

  const updateNotificationEmail = (index, field, value) => {
    setNotificationEmailForm((prev) => ({
      ...prev,
      emails: prev.emails.map((email, i) =>
        i === index ? { ...email, [field]: value } : email
      ),
    }));
  };

  const fetchAdminLogs = useCallback(
    async (page = 1) => {
      try {
        const token = localStorage.getItem("adminToken");
        const params = new URLSearchParams({
          page: page.toString(),
          limit: logsPagination.limit.toString(),
          ...(logsFilters.action && { action: logsFilters.action }),
          ...(logsFilters.performedBy && {
            performedBy: logsFilters.performedBy,
          }),
        });

        const response = await fetch(`${API_BASE}/logs?${params}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setAdminLogs(data.data);
          setLogsPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching admin logs:", error);
        showToast("Failed to fetch admin logs", "error");
      }
    },
    [
      API_BASE,
      logsPagination.limit,
      logsFilters.action,
      logsFilters.performedBy,
    ]
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        showToast("Login successful", "success");
        fetchDashboardData();
        fetchVisitorStats();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      showToast("Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setUser(null);
    showToast("Logged out successfully", "info");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!otpSent) {
      // Send OTP
      try {
        const response = await fetch(`${API_BASE}/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: forgotPasswordForm.email }),
        });

        const data = await response.json();
        if (data.success) {
          setOtpSent(true);
          startOtpCountdown();
          showToast("OTP sent to your email", "success");
        } else {
          showToast(data.message, "error");
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
        showToast("Failed to send OTP", "error");
      }
    } else {
      // Verify OTP and reset password
      const otp = otpInputs.join("");
      if (otp.length !== 6) {
        showToast("Please enter 6-digit OTP", "error");
        return;
      }

      if (
        forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword
      ) {
        showToast("Passwords do not match", "error");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: forgotPasswordForm.email,
            otp,
            newPassword: forgotPasswordForm.newPassword,
          }),
        });

        const data = await response.json();
        if (data.success) {
          showToast("Password reset successfully", "success");
          setShowForgotPassword(false);
          setOtpSent(false);
          setOtpInputs(["", "", "", "", "", ""]);
          setForgotPasswordForm({
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          showToast(data.message, "error");
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        showToast("Failed to reset password", "error");
      }
    }
  };

  // Change Password Function
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }

    if (changePasswordData.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }

    setIsChangingPassword(true);

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: changePasswordData.currentPassword,
          newPassword: changePasswordData.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        showToast("Password changed successfully", "success");
        setShowChangePassword(false);
        setChangePasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      showToast("Failed to change password", "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const fetchContacts = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        const newContactCount = data.data.length;

        // Check for new contacts
        if (lastContactCount > 0 && newContactCount > lastContactCount) {
          const newContacts = newContactCount - lastContactCount;
          showToast(
            `${newContacts} new contact${newContacts > 1 ? "s" : ""} received!`,
            "success"
          );
          setNewContactNotification(true);

          // Auto-hide notification after 5 seconds
          setTimeout(() => setNewContactNotification(false), 5000);
        }

        setContacts(data.data);
        setLastContactCount(newContactCount);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }, [API_BASE, lastContactCount]);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [API_BASE]);

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      showToast("Please enter a reply message", "error");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE}/contacts/${selectedContact._id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: replyMessage }),
        }
      );

      const data = await response.json();
      if (data.success) {
        showToast("Reply sent successfully", "success");
        setShowReplyModal(false);
        setReplyMessage("");
        setSelectedContact(null);
        fetchContacts();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
      showToast("Failed to send reply", "error");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();

    if (user?.role !== "dev" && user?.role !== "superadmin") {
      showToast("Only dev and superadmin can create accounts", "error");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUserForm),
      });

      const data = await response.json();
      if (data.success) {
        showToast("User created successfully", "success");
        setNewUserForm({ name: "", email: "", password: "", role: "user" });
        fetchUsers();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showToast("Failed to create user", "error");
    }
  };

  const deleteUser = async (userId) => {
    if (user?.role !== "dev" && user?.role !== "superadmin") {
      showToast("Only dev and superadmin can delete accounts", "error");
      return;
    }

    showConfirm("Are you sure you want to delete this user?", () =>
      deleteUserConfirmed(userId)
    );
  };

  const deleteUserConfirmed = async (userId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        showToast("User deleted successfully", "success");
        fetchUsers();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showToast("Failed to delete user", "error");
    }
  };

  const editContact = async (contactId) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`${API_BASE}/contacts/${contactId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactEditForm),
      });

      const data = await response.json();
      if (data.success) {
        showToast("Contact updated successfully", "success");
        setEditingContact(null);
        setContactEditForm({
          name: "",
          email: "",
          phone: "",
          message: "",
          status: "new",
        });
        fetchContacts();
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      showToast("Failed to update contact", "error");
    }
  };

  const startEditingContact = (contact) => {
    setEditingContact(contact._id);
    setContactEditForm({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || "",
      message: contact.message,
      status: contact.status || "new",
    });
  };

  const cancelEditingContact = () => {
    setEditingContact(null);
    setContactEditForm({
      name: "",
      email: "",
      phone: "",
      message: "",
      status: "new",
    });
  };

  const sendEmailToContact = async (contact) => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `${API_BASE}/contacts/${contact._id}/email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject: "Follow up from Prakash Enterprises",
            message:
              "Thank you for contacting us. We will get back to you soon.",
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        showToast("Email sent successfully", "success");
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      showToast("Failed to send email", "error");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (currentView === "contacts") {
        fetchContacts();
        // Set up automatic refresh for contacts every 30 seconds
        const contactsInterval = setInterval(fetchContacts, 30000);
        return () => clearInterval(contactsInterval);
      } else if (currentView === "users") {
        fetchUsers();
      } else if (currentView === "promotionHistory") {
        fetchPromotionHistory();
      } else if (currentView === "dashboard") {
        fetchDashboardData();
        fetchVisitorStats();
      } else if (currentView === "visitorStats") {
        fetchVisitorStats();
      } else if (currentView === "notificationEmails") {
        fetchNotificationEmails();
      } else if (currentView === "adminLogs") {
        fetchAdminLogs();
      }
      // Fetch notifications periodically
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000); // Every 30 seconds
      return () => clearInterval(interval);
    }
  }, [
    currentView,
    isAuthenticated,
    fetchContacts,
    fetchUsers,
    fetchPromotionHistory,
    fetchDashboardData,
    fetchVisitorStats,
    fetchNotificationEmails,
    fetchAdminLogs,
    fetchNotifications,
  ]);

  if (!isAuthenticated) {
    return (
      <>
        <style>{adminLoginStyles}</style>

        {/* Toast Container */}
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast ${toast.type} ${
                toast.removing ? "removing" : ""
              }`}
            >
              {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
              {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
              {toast.type === "info" && <Bell className="w-5 h-5" />}
              {toast.type === "warning" && <AlertCircle className="w-5 h-5" />}
              <span>{toast.message}</span>
              <button
                onClick={() => {
                  setToasts((prev) =>
                    prev.map((t) =>
                      t.id === toast.id ? { ...t, removing: true } : t
                    )
                  );
                  setTimeout(() => {
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                  }, 300);
                }}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center p-4 transition-colors duration-300">
          <div className="form">
            {!showForgotPassword ? (
              <>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                  Admin Login
                </h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="flex-column">
                    <label>Email</label>
                    <div className="inputForm">
                      <input
                        type="email"
                        className="input"
                        placeholder="Enter your email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-column">
                    <label>Password</label>
                    <div className="inputForm">
                      <input
                        type="password"
                        className="input"
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex-row">
                    <div></div>
                    <span
                      className="span"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot password?
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="button-submit"
                    disabled={loading}
                  >
                    {loading ? "Signing In..." : "Sign In"}
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
                  Forgot Password
                </h2>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  {!otpSent ? (
                    <div className="flex-column">
                      <label>Email</label>
                      <div className="inputForm">
                        <input
                          type="email"
                          className="input"
                          placeholder="Enter your email"
                          value={forgotPasswordForm.email}
                          onChange={(e) =>
                            setForgotPasswordForm({
                              ...forgotPasswordForm,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <button type="submit" className="fancy-button">
                        <span></span>
                        <span className="bottom-span"></span>
                        <span className="slide-bg"></span>
                        <span className="button-text">Send OTP</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex-column">
                        <label>OTP Verification</label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          Please enter the 6-digits one time password (OTP)
                        </p>
                        <div className="otp-grid">
                          {otpInputs.map((value, index) => (
                            <input
                              key={index}
                              ref={(el) => (otpInputRefs.current[index] = el)}
                              type="text"
                              className="otp-input"
                              value={value}
                              onChange={(e) =>
                                handleOtpInput(index, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(index, e)}
                              maxLength={1}
                              placeholder="○"
                            />
                          ))}
                        </div>
                        <div className="otp-paste-section">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Paste OTP from clipboard:
                          </p>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={handlePasteFromClipboard}
                              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                            >
                              Paste from Clipboard
                            </button>
                            <input
                              type="text"
                              placeholder="Or paste manually here"
                              className="flex-1 px-2 py-1 border rounded text-sm"
                              onPaste={(e) => {
                                e.preventDefault();
                                const pastedText =
                                  e.clipboardData.getData("text");
                                handleOtpPaste(pastedText);
                              }}
                            />
                          </div>
                        </div>
                        {otpCountdown > 0 ? (
                          <p className="text-sm text-gray-500">
                            Resend OTP in {otpCountdown}s
                          </p>
                        ) : (
                          <button
                            type="button"
                            onClick={resendOtp}
                            className="text-blue-500 text-sm hover:underline"
                          >
                            Resend OTP
                          </button>
                        )}
                      </div>
                      <div className="flex-column">
                        <label>New Password</label>
                        <div className="inputForm">
                          <input
                            type="password"
                            className="input"
                            placeholder="Enter new password"
                            value={forgotPasswordForm.newPassword}
                            onChange={(e) =>
                              setForgotPasswordForm({
                                ...forgotPasswordForm,
                                newPassword: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="flex-column">
                        <label>Confirm Password</label>
                        <div className="inputForm">
                          <input
                            type="password"
                            className="input"
                            placeholder="Confirm new password"
                            value={forgotPasswordForm.confirmPassword}
                            onChange={(e) =>
                              setForgotPasswordForm({
                                ...forgotPasswordForm,
                                confirmPassword: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="fancy-button">
                        <span></span>
                        <span className="bottom-span"></span>
                        <span className="slide-bg"></span>
                        <span className="button-text">Reset Password</span>
                      </button>
                    </>
                  )}
                  <div className="flex-row">
                    <div></div>
                    <span
                      className="span"
                      onClick={() => {
                        setShowForgotPassword(false);
                        setOtpSent(false);
                        setOtpInputs(["", "", "", "", "", ""]);
                        setForgotPasswordForm({
                          email: "",
                          otp: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Back to Login
                    </span>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{adminLoginStyles}</style>

      {/* Toast Container */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast ${toast.type} ${
              toast.removing ? "removing" : ""
            }`}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5" />}
            {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
            {toast.type === "info" && <Bell className="w-5 h-5" />}
            {toast.type === "warning" && <AlertCircle className="w-5 h-5" />}
            <span>{toast.message}</span>
            <button
              onClick={() => {
                setToasts((prev) =>
                  prev.map((t) =>
                    t.id === toast.id ? { ...t, removing: true } : t
                  )
                );
                setTimeout(() => {
                  setToasts((prev) => prev.filter((t) => t.id !== toast.id));
                }, 300);
              }}
              className="ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300">
        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-600 p-4 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
              Prakash Enterprises Admin
            </h1>
            <div className="flex items-center space-x-4">
              {/* Notification Icon */}
              <div className="relative" ref={notificationRef}>
                <Button
                  onClick={() => setShowNotifications(!showNotifications)}
                  variant="outline"
                  size="sm"
                  className="relative"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Notifications
                      </h3>
                    </div>
                    <div className="p-2">
                      {notifications.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          No notifications
                        </p>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                              notification.read
                                ? "bg-gray-50 dark:bg-gray-700"
                                : "bg-blue-50 dark:bg-blue-900/20"
                            }`}
                            onClick={() =>
                              markNotificationAsRead(notification._id)
                            }
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {new Date(
                                    notification.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-gray-900 dark:text-white transition-colors duration-300">
                  Welcome, {user?.name}
                </span>
                {user?.role === "dev" && (
                  <Crown className="w-4 h-4 text-red-500" title="Dev" />
                )}
                {user?.role === "superadmin" && (
                  <Crown
                    className="w-4 h-4 text-yellow-500"
                    title="Superadmin"
                  />
                )}
                {user?.role === "admin" && (
                  <Shield className="w-4 h-4 text-blue-500" title="Admin" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowChangePassword(true)}
                  variant="outline"
                  size="sm"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Change Password
                </Button>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white/90 dark:bg-gray-900/90 border-r border-gray-200 dark:border-gray-600 min-h-screen p-4 transition-colors duration-300">
            <nav className="space-y-2">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                  currentView === "dashboard"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView("contacts")}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                  currentView === "contacts"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Contact Data</span>
              </button>
              {(user?.role === "dev" || user?.role === "superadmin") && (
                <button
                  onClick={() => setCurrentView("users")}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                    currentView === "users"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span>Admin Users</span>
                </button>
              )}
              <button
                onClick={() => setCurrentView("promotions")}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                  currentView === "promotions"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Send className="w-5 h-5" />
                <span>Promotions</span>
              </button>
              <button
                onClick={() => setCurrentView("promotionHistory")}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                  currentView === "promotionHistory"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Activity className="w-5 h-5" />
                <span>Promotion History</span>
              </button>
              <button
                onClick={() => setCurrentView("visitorStats")}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                  currentView === "visitorStats"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Globe className="w-5 h-5" />
                <span>Visitor Analytics</span>
              </button>
              {(user?.role === "superadmin" || user?.role === "dev") && (
                <button
                  onClick={() => setCurrentView("notificationEmails")}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                    currentView === "notificationEmails"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <Mail className="w-5 h-5" />
                  <span>Notification Emails</span>
                </button>
              )}
              {(user?.role === "superadmin" || user?.role === "dev") && (
                <button
                  onClick={() => setCurrentView("adminLogs")}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left transition-colors ${
                    currentView === "adminLogs"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Admin Logs</span>
                </button>
              )}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">
            {currentView === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
                  Dashboard Overview
                </h2>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-500 rounded-lg">
                          <MessageSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                            Total Contacts
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {dashboardStats.totalContacts || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-500 rounded-lg">
                          <Bell className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                            New Contacts
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {dashboardStats.newContacts || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-purple-500 rounded-lg">
                          <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                            Today's Visitors
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {visitorStats?.todayVisitors || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-orange-500 rounded-lg">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">
                            Total Visitors
                          </p>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                            {visitorStats?.totalVisitors || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Visitor Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Visitor Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            This Week
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.thisWeekVisitors || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            This Month
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.thisMonthVisitors || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Peak Hours
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.hourlyData?.length > 0
                              ? `${
                                  visitorStats.hourlyData[0]?.hour || "N/A"
                                }:00`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Device Statistics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Desktop
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.deviceStats?.desktop || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Mobile
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.deviceStats?.mobile || 0}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Tablet
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {visitorStats?.deviceStats?.tablet || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Daily Visitor Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <LineChart className="w-12 h-12 mx-auto mb-2" />
                          <p>Visitor trend chart will be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Top Pages
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        <div className="text-center">
                          <PieChart className="w-12 h-12 mx-auto mb-2" />
                          <p>Page analytics chart will be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentView === "contacts" && (
              <div className="space-y-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">
                        Contact Management
                      </h2>
                      <p className="text-blue-100">
                        Manage and respond to customer inquiries efficiently
                      </p>
                      {newContactNotification && (
                        <div className="mt-2 flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-200 text-sm font-medium">
                            New contacts received!
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        onClick={fetchContacts}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-white/30"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                      <Button
                        onClick={() =>
                          exportToCSV(
                            contacts.map((c) => ({
                              Name: c.name,
                              Email: c.email,
                              Phone: c.phone || "N/A",
                              Message: c.message,
                              Status: c.status || "new",
                              "Created Date": new Date(
                                c.createdAt
                              ).toLocaleString(),
                            })),
                            "contacts"
                          )
                        }
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button
                        onClick={() =>
                          exportToExcel(
                            contacts.map((c) => ({
                              Name: c.name,
                              Email: c.email,
                              Phone: c.phone || "N/A",
                              Message: c.message,
                              Status: c.status || "new",
                              "Created Date": new Date(
                                c.createdAt
                              ).toLocaleString(),
                            })),
                            "contacts"
                          )
                        }
                        variant="outline"
                        className="bg-white/10 hover:bg-white/20 border-white/30 text-white"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">
                            Total Contacts
                          </p>
                          <p className="text-2xl font-bold">
                            {contacts.length}
                          </p>
                        </div>
                        <MessageSquare className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">New (24h)</p>
                          <p className="text-2xl font-bold">
                            {contacts.filter((c) => isContactNew(c)).length}
                          </p>
                        </div>
                        <Bell className="w-8 h-8 text-yellow-200" />
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Replied</p>
                          <p className="text-2xl font-bold">
                            {
                              contacts.filter((c) => c.status === "replied")
                                .length
                            }
                          </p>
                        </div>
                        <Reply className="w-8 h-8 text-green-200" />
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Today</p>
                          <p className="text-2xl font-bold">
                            {
                              contacts.filter((c) => {
                                const today = new Date();
                                const contactDate = new Date(c.createdAt);
                                return (
                                  contactDate.toDateString() ===
                                  today.toDateString()
                                );
                              }).length
                            }
                          </p>
                        </div>
                        <Calendar className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Contact Management
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {filteredContacts.length} of {contacts.length}{" "}
                      contacts
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search contacts by name, email, or message..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="all">All Contacts</option>
                        <option value="new">New (24h)</option>
                        <option value="urgent">Urgent</option>
                        <option value="unreplied">Unreplied</option>
                        <option value="replied">Replied</option>
                        <option value="closed">Closed</option>
                      </select>
                      <Button
                        onClick={() => {
                          setSearchTerm("");
                          setFilterStatus("all");
                        }}
                        variant="outline"
                        size="sm"
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bulk Actions */}
                {filteredContacts.length > 0 && (
                  <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {
                            filteredContacts.filter((c) => isContactNew(c))
                              .length
                          }{" "}
                          new contacts
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {
                            filteredContacts.filter((c) => isContactUrgent(c))
                              .length
                          }{" "}
                          urgent
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {
                            filteredContacts.filter(
                              (c) => c.status === "replied"
                            ).length
                          }{" "}
                          replied
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newContacts = filteredContacts.filter((c) =>
                              isContactNew(c)
                            );
                            if (newContacts.length > 0) {
                              showToast(
                                `Marked ${newContacts.length} contacts as read`,
                                "success"
                              );
                              // In a real implementation, you would update all contacts at once
                            }
                          }}
                          disabled={
                            filteredContacts.filter((c) => isContactNew(c))
                              .length === 0
                          }
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark All New as Read
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const unrepliedContacts = filteredContacts.filter(
                              (c) => c.status !== "replied"
                            );
                            if (unrepliedContacts.length > 0) {
                              showToast(
                                `Found ${unrepliedContacts.length} unreplied contacts`,
                                "info"
                              );
                            }
                          }}
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          Show Unreplied
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contacts Grid */}
                <div className="grid gap-6">
                  {filteredContacts.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        {contacts.length === 0
                          ? "No contacts yet"
                          : "No contacts match your filters"}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-500">
                        {contacts.length === 0
                          ? "When customers submit contact forms, they will appear here."
                          : "Try adjusting your search terms or filter criteria."}
                      </p>
                    </div>
                  ) : (
                    filteredContacts.map((contact) => (
                      <Card
                        key={contact._id}
                        className={`bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 overflow-hidden ${
                          isContactNew(contact)
                            ? "border-l-4 border-l-red-500 shadow-lg shadow-red-100 dark:shadow-red-900/20"
                            : ""
                        }`}
                      >
                        {editingContact === contact._id ? (
                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                Edit Contact
                              </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                  Name
                                </label>
                                <Input
                                  value={contactEditForm.name}
                                  onChange={(e) =>
                                    setContactEditForm({
                                      ...contactEditForm,
                                      name: e.target.value,
                                    })
                                  }
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                  Email
                                </label>
                                <Input
                                  value={contactEditForm.email}
                                  onChange={(e) =>
                                    setContactEditForm({
                                      ...contactEditForm,
                                      email: e.target.value,
                                    })
                                  }
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                  Phone
                                </label>
                                <Input
                                  value={contactEditForm.phone}
                                  onChange={(e) =>
                                    setContactEditForm({
                                      ...contactEditForm,
                                      phone: e.target.value,
                                    })
                                  }
                                  className="w-full"
                                />
                              </div>
                              <div>
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                  Status
                                </label>
                                <select
                                  value={contactEditForm.status}
                                  onChange={(e) =>
                                    setContactEditForm({
                                      ...contactEditForm,
                                      status: e.target.value,
                                    })
                                  }
                                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                >
                                  <option value="new">New</option>
                                  <option value="replied">Replied</option>
                                  <option value="closed">Closed</option>
                                </select>
                              </div>
                            </div>
                            <div className="mt-4">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                                Message
                              </label>
                              <Textarea
                                value={contactEditForm.message}
                                onChange={(e) =>
                                  setContactEditForm({
                                    ...contactEditForm,
                                    message: e.target.value,
                                  })
                                }
                                className="w-full"
                                rows={4}
                              />
                            </div>
                            <div className="flex space-x-3 mt-4">
                              <Button
                                onClick={() => editContact(contact._id)}
                                className="flex-1"
                              >
                                Save Changes
                              </Button>
                              <Button
                                variant="outline"
                                onClick={cancelEditingContact}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6">
                            {/* Contact Header */}
                            <div className="flex justify-between items-start mb-4">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-12 h-12 rounded-full flex items-center justify-center relative ${
                                    isContactNew(contact)
                                      ? "bg-gradient-to-r from-red-500 to-pink-500 ring-2 ring-red-300 dark:ring-red-600"
                                      : "bg-gradient-to-r from-blue-500 to-purple-500"
                                  }`}
                                >
                                  <span className="text-white font-semibold text-lg">
                                    {contact.name.charAt(0).toUpperCase()}
                                  </span>
                                  {isContactNew(contact) && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                                  )}
                                </div>
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {contact.name}
                                  </h3>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span
                                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        contact.status === "new" ||
                                        !contact.status
                                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                          : contact.status === "replied"
                                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                      }`}
                                    >
                                      {contact.status || "new"}
                                    </span>
                                    {isContactNew(contact) && (
                                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 animate-pulse">
                                        NEW
                                      </span>
                                    )}
                                    {isContactUrgent(contact) && (
                                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                        URGENT
                                      </span>
                                    )}
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                      {new Date(
                                        contact.createdAt
                                      ).toLocaleDateString()}{" "}
                                      at{" "}
                                      {new Date(
                                        contact.createdAt
                                      ).toLocaleTimeString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startEditingContact(contact)}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                >
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setSelectedContact(contact);
                                    setShowReplyModal(true);
                                  }}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Reply className="w-4 h-4 mr-2" />
                                  Reply
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => sendEmailToContact(contact)}
                                  className="hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                >
                                  <Mail className="w-4 h-4 mr-2" />
                                  Email
                                </Button>
                                {isContactNew(contact) && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      startEditingContact(contact);
                                      setContactEditForm({
                                        ...contactEditForm,
                                        status: "read",
                                      });
                                      editContact(contact._id);
                                      showToast(
                                        "Contact marked as read",
                                        "success"
                                      );
                                    }}
                                    className="hover:bg-green-50 dark:hover:bg-green-900/20"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Mark Read
                                  </Button>
                                )}
                              </div>
                            </div>

                            {/* Contact Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3">
                                  <Mail className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Email
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                      {contact.email}
                                    </p>
                                  </div>
                                </div>
                                {contact.phone && (
                                  <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <div>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Phone
                                      </p>
                                      <p className="text-gray-900 dark:text-white font-medium">
                                        {contact.phone}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center space-x-3">
                                  <Clock className="w-5 h-5 text-gray-400" />
                                  <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                      Received
                                    </p>
                                    <p className="text-gray-900 dark:text-white font-medium">
                                      {new Date(
                                        contact.createdAt
                                      ).toLocaleDateString()}{" "}
                                      at{" "}
                                      {new Date(
                                        contact.createdAt
                                      ).toLocaleTimeString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                  Message
                                </h4>
                                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                  {contact.message}
                                </p>
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
                              <div className="flex items-center justify-between">
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      navigator.clipboard.writeText(
                                        contact.email
                                      );
                                      showToast(
                                        "Email copied to clipboard",
                                        "success"
                                      );
                                    }}
                                  >
                                    Copy Email
                                  </Button>
                                  {contact.phone && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        navigator.clipboard.writeText(
                                          contact.phone
                                        );
                                        showToast(
                                          "Phone copied to clipboard",
                                          "success"
                                        );
                                      }}
                                    >
                                      Copy Phone
                                    </Button>
                                  )}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  ID: {contact._id}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </div>
            )}

            {currentView === "users" &&
              (user?.role === "dev" || user?.role === "superadmin") && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      Admin User Management
                    </h2>
                    <div className="flex space-x-2">
                      <Button onClick={() => setCurrentView("createUser")}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Admin
                      </Button>
                      <Button
                        onClick={() =>
                          exportToCSV(
                            users.map((u) => ({
                              Name: u.name,
                              Email: u.email,
                              Role: u.role,
                              "Created Date": new Date(
                                u.createdAt
                              ).toLocaleDateString(),
                            })),
                            "admin-users"
                          )
                        }
                        variant="outline"
                      >
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Export CSV
                      </Button>
                      <Button
                        onClick={() =>
                          exportToExcel(
                            users.map((u) => ({
                              Name: u.name,
                              Email: u.email,
                              Role: u.role,
                              "Created Date": new Date(
                                u.createdAt
                              ).toLocaleDateString(),
                            })),
                            "admin-users"
                          )
                        }
                        variant="outline"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Export Excel
                      </Button>
                      <Button
                        onClick={() =>
                          exportToPDF(
                            users.map((u) => ({
                              Name: u.name,
                              Email: u.email,
                              Role: u.role,
                              "Created Date": new Date(
                                u.createdAt
                              ).toLocaleDateString(),
                            })),
                            "admin-users"
                          )
                        }
                        variant="outline"
                      >
                        <File className="w-4 h-4 mr-2" />
                        Export PDF
                      </Button>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search users..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md"
                    >
                      <option value="all">All Roles</option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="dev">Dev</option>
                      <option value="superadmin">Superadmin</option>
                    </select>
                  </div>

                  {/* Scrollable Table */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Created Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600 max-h-96 overflow-y-auto">
                          {users
                            .filter(
                              (user) =>
                                user.name
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase()) ||
                                user.email
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                            )
                            .filter(
                              (user) =>
                                filterStatus === "all" ||
                                user.role === filterStatus
                            )
                            .map((user) => (
                              <tr
                                key={user._id}
                                className="hover:bg-gray-50 dark:hover:bg-gray-700"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {user.name}
                                    </div>
                                    {user.role === "dev" && (
                                      <Crown className="w-4 h-4 text-red-500 ml-2" />
                                    )}
                                    {user.role === "superadmin" && (
                                      <Crown className="w-4 h-4 text-yellow-500 ml-2" />
                                    )}
                                    {user.role === "admin" && (
                                      <Shield className="w-4 h-4 text-blue-500 ml-2" />
                                    )}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500 dark:text-gray-300">
                                    {user.email}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span
                                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                                      user.role === "dev"
                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                        : user.role === "superadmin"
                                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                        : user.role === "admin"
                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                        : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                    }`}
                                  >
                                    {user.role}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {new Date(
                                    user.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                  <div className="flex space-x-2">
                                    <Button size="sm" variant="outline">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      className="text-red-600 hover:text-red-700"
                                      onClick={() => deleteUser(user._id)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

            {currentView === "createUser" &&
              (user?.role === "dev" || user?.role === "superadmin") && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                      Create New Admin User
                    </h2>
                    <Button
                      onClick={() => setCurrentView("users")}
                      variant="outline"
                    >
                      Back to Users
                    </Button>
                  </div>

                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600 max-w-md">
                    <CardContent className="p-6">
                      <form onSubmit={createUser} className="space-y-4">
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Name
                          </label>
                          <Input
                            value={newUserForm.name}
                            onChange={(e) =>
                              setNewUserForm({
                                ...newUserForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="Enter name"
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Email
                          </label>
                          <Input
                            type="email"
                            value={newUserForm.email}
                            onChange={(e) =>
                              setNewUserForm({
                                ...newUserForm,
                                email: e.target.value,
                              })
                            }
                            placeholder="Enter email"
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Password
                          </label>
                          <Input
                            type="password"
                            value={newUserForm.password}
                            onChange={(e) =>
                              setNewUserForm({
                                ...newUserForm,
                                password: e.target.value,
                              })
                            }
                            placeholder="Enter password"
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Role
                          </label>
                          <select
                            value={newUserForm.role}
                            onChange={(e) =>
                              setNewUserForm({
                                ...newUserForm,
                                role: e.target.value,
                              })
                            }
                            className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md transition-colors duration-300"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="dev">Dev</option>
                            <option value="superadmin">Superadmin</option>
                          </select>
                        </div>
                        <Button type="submit" className="w-full">
                          Create User
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}

            {currentView === "promotions" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Send Promotions
                  </h2>
                  <Button
                    onClick={() => setCurrentView("promotionHistory")}
                    variant="outline"
                  >
                    View History
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Create Promotion
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={sendPromotion} className="space-y-4">
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Subject
                          </label>
                          <Input
                            value={promotionForm.subject}
                            onChange={(e) =>
                              setPromotionForm({
                                ...promotionForm,
                                subject: e.target.value,
                              })
                            }
                            placeholder="Enter email subject"
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-gray-900 dark:text-white mb-1 block text-sm transition-colors duration-300">
                            Message
                          </label>
                          <Textarea
                            value={promotionForm.message}
                            onChange={(e) =>
                              setPromotionForm({
                                ...promotionForm,
                                message: e.target.value,
                              })
                            }
                            placeholder="Enter email message"
                            className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-colors duration-300"
                            rows={6}
                            required
                          />
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-gray-900 dark:text-white font-medium">
                            Recipients
                          </h4>
                          <div className="space-y-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const allEmails = contacts
                                  .map((c) => c.email)
                                  .filter(Boolean);
                                setPromotionForm((prev) => ({
                                  ...prev,
                                  recipients: [
                                    ...new Set([
                                      ...prev.recipients,
                                      ...allEmails,
                                    ]),
                                  ],
                                }));
                                showToast(
                                  `${allEmails.length} contact emails added!`,
                                  "success"
                                );
                              }}
                            >
                              <Users2 className="w-4 h-4 mr-2" />
                              Add All Contacts
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const allEmails = users
                                  .map((u) => u.email)
                                  .filter(Boolean);
                                setPromotionForm((prev) => ({
                                  ...prev,
                                  recipients: [
                                    ...new Set([
                                      ...prev.recipients,
                                      ...allEmails,
                                    ]),
                                  ],
                                }));
                                showToast(
                                  `${allEmails.length} user emails added!`,
                                  "success"
                                );
                              }}
                            >
                              <Users className="w-4 h-4 mr-2" />
                              Add All Users
                            </Button>
                          </div>

                          {/* File Upload */}
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept=".csv,.xlsx,.xls"
                              onChange={handleFileUpload}
                              className="hidden"
                              id="file-upload"
                            />
                            <label
                              htmlFor="file-upload"
                              className="cursor-pointer inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload CSV/Excel
                            </label>
                          </div>

                          {/* Custom Recipients */}
                          <div>
                            <Input
                              value={promotionForm.customRecipients}
                              onChange={(e) =>
                                setPromotionForm({
                                  ...promotionForm,
                                  customRecipients: e.target.value,
                                })
                              }
                              placeholder="Add custom emails (comma-separated)"
                              className="bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                              onBlur={(e) => {
                                const emails = e.target.value
                                  .split(",")
                                  .map((email) => email.trim())
                                  .filter((email) => email.includes("@"));
                                if (emails.length > 0) {
                                  setPromotionForm((prev) => ({
                                    ...prev,
                                    recipients: [
                                      ...new Set([
                                        ...prev.recipients,
                                        ...emails,
                                      ]),
                                    ],
                                    customRecipients: "",
                                  }));
                                  showToast(
                                    `${emails.length} custom emails added!`,
                                    "success"
                                  );
                                }
                              }}
                            />
                          </div>

                          {/* Recipients List */}
                          {promotionForm.recipients.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Recipients ({promotionForm.recipients.length}):
                              </p>
                              <div className="max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-2 rounded border">
                                {promotionForm.recipients.map(
                                  (email, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between text-sm"
                                    >
                                      <span className="text-gray-700 dark:text-gray-300">
                                        {email}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setPromotionForm((prev) => ({
                                            ...prev,
                                            recipients: prev.recipients.filter(
                                              (_, i) => i !== index
                                            ),
                                          }));
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        <Button
                          type="submit"
                          disabled={
                            sendingPromotion ||
                            promotionForm.recipients.length === 0
                          }
                          className="w-full"
                        >
                          {sendingPromotion ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Send Promotion
                            </>
                          )}
                        </Button>

                        <Button
                          onClick={testPromotionalEmail}
                          variant="outline"
                          className="w-full"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Test Email Service
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Templates */}
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Promotion Templates
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {promotionTemplates.map((template) => (
                          <div
                            key={template.id}
                            className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                            onClick={() => handleTemplateSelect(template.id)}
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                              {template.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {template.subject}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 line-clamp-3">
                              {template.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {currentView === "promotionHistory" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Promotion History
                  </h2>
                  <Button
                    onClick={() => setCurrentView("promotions")}
                    variant="outline"
                  >
                    Send New Promotion
                  </Button>
                </div>

                <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Subject
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Total Recipients
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Sent
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Failed
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
                          {promotionHistory.map((promotion) => (
                            <tr
                              key={promotion._id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {promotion.subject}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-300">
                                  {promotion.totalRecipients}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <MailCheck className="w-4 h-4 text-green-500 mr-1" />
                                  <span className="text-sm text-green-600 dark:text-green-400">
                                    {promotion.sentCount}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <MailX className="w-4 h-4 text-red-500 mr-1" />
                                  <span className="text-sm text-red-600 dark:text-red-400">
                                    {promotion.failedCount}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    promotion.status === "completed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : promotion.status === "sending"
                                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                  }`}
                                >
                                  {promotion.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                {new Date(
                                  promotion.createdAt
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === "visitorStats" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Visitor Analytics
                  </h2>
                  <Button
                    onClick={() => setCurrentView("dashboard")}
                    variant="outline"
                  >
                    Back to Dashboard
                  </Button>
                </div>

                {visitorStats ? (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Today's Visitors
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.todayVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                This Week
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.thisWeekVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                This Month
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.thisMonthVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                              <Globe className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Total Visitors
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.totalVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Device & Browser Stats */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                            Device Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {Object.entries(visitorStats.deviceStats).map(
                              ([device, count]) => (
                                <div
                                  key={device}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                                    <span className="text-gray-700 dark:text-gray-300 capitalize">
                                      {device}
                                    </span>
                                  </div>
                                  <span className="font-semibold text-gray-900 dark:text-white">
                                    {count}
                                  </span>
                                </div>
                              )
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardHeader>
                          <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                            Browser Statistics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {visitorStats.browserStats.map((browser, index) => (
                              <div
                                key={browser.browser}
                                className="flex items-center justify-between"
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-3 h-3 rounded-full mr-3 ${
                                      index === 0
                                        ? "bg-blue-500"
                                        : index === 1
                                        ? "bg-green-500"
                                        : index === 2
                                        ? "bg-purple-500"
                                        : index === 3
                                        ? "bg-orange-500"
                                        : "bg-gray-500"
                                    }`}
                                  ></div>
                                  <span className="text-gray-700 dark:text-gray-300">
                                    {browser.browser}
                                  </span>
                                </div>
                                <span className="font-semibold text-gray-900 dark:text-white">
                                  {browser.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Page Statistics */}
                    <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                          Most Visited Pages
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {visitorStats.pageStats.map((page, index) => (
                            <div
                              key={page.page}
                              className="flex items-center justify-between"
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-3 h-3 rounded-full mr-3 ${
                                    index === 0
                                      ? "bg-blue-500"
                                      : index === 1
                                      ? "bg-green-500"
                                      : index === 2
                                      ? "bg-purple-500"
                                      : index === 3
                                      ? "bg-orange-500"
                                      : "bg-gray-500"
                                  }`}
                                ></div>
                                <span className="text-gray-700 dark:text-gray-300 capitalize">
                                  {page.page === "home"
                                    ? "Home Page"
                                    : page.page}
                                </span>
                              </div>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {page.count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Visitor Type */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                              <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                New Visitors
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.newVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                        <CardContent className="p-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                              <Repeat className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                Returning Visitors
                              </p>
                              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {visitorStats.returningVisitors}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Loading visitor statistics...
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentView === "notificationEmails" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Notification Email Settings
                  </h2>
                  <Button
                    onClick={() => setCurrentView("dashboard")}
                    variant="outline"
                  >
                    Back to Dashboard
                  </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Contact Notifications */}
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Contact Form Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status
                          </span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                notificationEmails.find(
                                  (n) => n.type === "contact"
                                )?.isEnabled
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {notificationEmails.find(
                                (n) => n.type === "contact"
                              )?.isEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => {
                                const contactSettings = notificationEmails.find(
                                  (n) => n.type === "contact"
                                );
                                setEditingNotificationType("contact");
                                setNotificationEmailForm({
                                  emails: contactSettings?.emails || [],
                                  isEnabled: contactSettings?.isEnabled ?? true,
                                });
                              }}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Emails that will receive notifications when someone
                          submits the contact form.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Loan Application Notifications */}
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Loan Application Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status
                          </span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                notificationEmails.find(
                                  (n) => n.type === "loan-application"
                                )?.isEnabled
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {notificationEmails.find(
                                (n) => n.type === "loan-application"
                              )?.isEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => {
                                const loanSettings = notificationEmails.find(
                                  (n) => n.type === "loan-application"
                                );
                                setEditingNotificationType("loan-application");
                                setNotificationEmailForm({
                                  emails: loanSettings?.emails || [],
                                  isEnabled: loanSettings?.isEnabled ?? true,
                                });
                              }}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Emails that will receive notifications when someone
                          applies for a loan.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quote Request Notifications */}
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Quote Request Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status
                          </span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                notificationEmails.find(
                                  (n) => n.type === "quote-request"
                                )?.isEnabled
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {notificationEmails.find(
                                (n) => n.type === "quote-request"
                              )?.isEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => {
                                const quoteSettings = notificationEmails.find(
                                  (n) => n.type === "quote-request"
                                );
                                setEditingNotificationType("quote-request");
                                setNotificationEmailForm({
                                  emails: quoteSettings?.emails || [],
                                  isEnabled: quoteSettings?.isEnabled ?? true,
                                });
                              }}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Emails that will receive notifications when someone
                          requests a quote.
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Promotion Notifications */}
                  <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white transition-colors duration-300">
                        Promotion Notifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">
                            Status
                          </span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                notificationEmails.find(
                                  (n) => n.type === "promotion"
                                )?.isEnabled
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                  : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                              }`}
                            >
                              {notificationEmails.find(
                                (n) => n.type === "promotion"
                              )?.isEnabled
                                ? "Enabled"
                                : "Disabled"}
                            </span>
                            <Button
                              size="sm"
                              onClick={() => {
                                const promotionSettings =
                                  notificationEmails.find(
                                    (n) => n.type === "promotion"
                                  );
                                setEditingNotificationType("promotion");
                                setNotificationEmailForm({
                                  emails: promotionSettings?.emails || [],
                                  isEnabled:
                                    promotionSettings?.isEnabled ?? true,
                                });
                              }}
                            >
                              Configure
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Emails that will receive notifications about
                          promotional campaigns.
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Reply Modal */}
            {showReplyModal && selectedContact && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Reply to {selectedContact.name}
                  </h3>
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="Enter your reply message..."
                    className="w-full mb-4 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                    rows={4}
                  />
                  <div className="flex space-x-2">
                    <Button onClick={handleReply} className="flex-1">
                      Send Reply
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowReplyModal(false);
                        setReplyMessage("");
                        setSelectedContact(null);
                      }}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Confirmation Modal */}
            {showConfirmModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Confirm Action
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {confirmMessage}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleConfirm}
                      className="flex-1 bg-red-600 hover:bg-red-700"
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Email Configuration Modal */}
            {editingNotificationType && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Configure{" "}
                      {editingNotificationType === "contact"
                        ? "Contact Form"
                        : editingNotificationType === "loan-application"
                        ? "Loan Application"
                        : editingNotificationType === "quote-request"
                        ? "Quote Request"
                        : editingNotificationType === "promotion"
                        ? "Promotion"
                        : "Notification"}{" "}
                      Emails
                    </h3>
                    <button
                      onClick={() => {
                        setEditingNotificationType(null);
                        setNotificationEmailForm({
                          emails: [],
                          isEnabled: true,
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Enable/Disable Toggle */}
                    <div className="flex items-center justify-between">
                      <label className="text-gray-900 dark:text-white font-semibold">
                        Enable Notifications
                      </label>
                      <input
                        type="checkbox"
                        checked={notificationEmailForm.isEnabled}
                        onChange={(e) =>
                          setNotificationEmailForm((prev) => ({
                            ...prev,
                            isEnabled: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>

                    {/* Email List */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Notification Emails
                        </h4>
                        <Button
                          onClick={addNotificationEmail}
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add Email
                        </Button>
                      </div>

                      {notificationEmailForm.emails.map((email, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
                        >
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Email address"
                              value={email.email}
                              onChange={(e) =>
                                updateNotificationEmail(
                                  index,
                                  "email",
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                            <Input
                              placeholder="Name (optional)"
                              value={email.name}
                              onChange={(e) =>
                                updateNotificationEmail(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={email.isActive}
                              onChange={(e) =>
                                updateNotificationEmail(
                                  index,
                                  "isActive",
                                  e.target.checked
                                )
                              }
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Active
                            </span>
                            <Button
                              onClick={() => removeNotificationEmail(index)}
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}

                      {notificationEmailForm.emails.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          No emails configured. Click "Add Email" to add
                          notification recipients.
                        </div>
                      )}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        onClick={() => {
                          setEditingNotificationType(null);
                          setNotificationEmailForm({
                            emails: [],
                            isEnabled: true,
                          });
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() =>
                          updateNotificationEmails(editingNotificationType)
                        }
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Settings
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentView === "adminLogs" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                    Admin Activity Logs
                  </h2>
                  <Button
                    onClick={() => setCurrentView("dashboard")}
                    variant="outline"
                  >
                    Back to Dashboard
                  </Button>
                </div>

                {/* Filters */}
                <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Action Type
                        </label>
                        <select
                          value={logsFilters.action}
                          onChange={(e) => {
                            setLogsFilters({
                              ...logsFilters,
                              action: e.target.value,
                            });
                            fetchAdminLogs(1);
                          }}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        >
                          <option value="">All Actions</option>
                          <option value="user_created">User Created</option>
                          <option value="user_deleted">User Deleted</option>
                          <option value="user_updated">User Updated</option>
                          <option value="contact_replied">
                            Contact Replied
                          </option>
                          <option value="contact_updated">
                            Contact Updated
                          </option>
                          <option value="promotion_sent">Promotion Sent</option>
                          <option value="notification_email_updated">
                            Notification Email Updated
                          </option>
                          <option value="login">Login</option>
                          <option value="logout">Logout</option>
                          <option value="password_reset">Password Reset</option>
                          <option value="role_changed">Role Changed</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Performed By
                        </label>
                        <Input
                          placeholder="Search by email or name"
                          value={logsFilters.performedBy}
                          onChange={(e) => {
                            setLogsFilters({
                              ...logsFilters,
                              performedBy: e.target.value,
                            });
                            fetchAdminLogs(1);
                          }}
                          className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button
                          onClick={() => {
                            setLogsFilters({ action: "", performedBy: "" });
                            fetchAdminLogs(1);
                          }}
                          variant="outline"
                          className="w-full"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logs Table */}
                <Card className="bg-white/90 dark:bg-gray-900/90 border-gray-200 dark:border-gray-600">
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-600">
                            <th className="text-left p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Action
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Performed By
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Details
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Target
                            </th>
                            <th className="text-left p-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {adminLogs.map((log) => (
                            <tr
                              key={log._id}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                            >
                              <td className="p-3">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                                    log.action === "user_created" ||
                                    log.action === "user_updated" ||
                                    log.action === "role_changed"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                      : log.action === "user_deleted"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                      : log.action === "login" ||
                                        log.action === "logout"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                                  }`}
                                >
                                  {log.action.replace(/_/g, " ").toUpperCase()}
                                </span>
                              </td>
                              <td className="p-3">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">
                                      {log.performedBy?.name?.charAt(0) || "U"}
                                    </span>
                                  </div>
                                  <div>
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {log.performedBy?.name || "Unknown"}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                      {log.performedBy?.email || "Unknown"}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                  {log.details}
                                </div>
                              </td>
                              <td className="p-3">
                                {log.targetUser && (
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    User: {log.targetUser?.email || "Unknown"}
                                  </div>
                                )}
                                {log.targetContact && (
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    Contact:{" "}
                                    {log.targetContact?.email || "Unknown"}
                                  </div>
                                )}
                                {!log.targetUser && !log.targetContact && (
                                  <div className="text-sm text-gray-400 dark:text-gray-500">
                                    System
                                  </div>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {new Date(log.createdAt).toLocaleDateString()}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-500">
                                  {new Date(log.createdAt).toLocaleTimeString()}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    {logsPagination.pages > 1 && (
                      <div className="flex justify-between items-center mt-6">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Showing{" "}
                          {(logsPagination.page - 1) * logsPagination.limit + 1}{" "}
                          to{" "}
                          {Math.min(
                            logsPagination.page * logsPagination.limit,
                            logsPagination.total
                          )}{" "}
                          of {logsPagination.total} logs
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() =>
                              fetchAdminLogs(logsPagination.page - 1)
                            }
                            disabled={logsPagination.page === 1}
                            variant="outline"
                            size="sm"
                          >
                            Previous
                          </Button>
                          <span className="flex items-center px-3 text-sm text-gray-600 dark:text-gray-400">
                            Page {logsPagination.page} of {logsPagination.pages}
                          </span>
                          <Button
                            onClick={() =>
                              fetchAdminLogs(logsPagination.page + 1)
                            }
                            disabled={
                              logsPagination.page === logsPagination.pages
                            }
                            variant="outline"
                            size="sm"
                          >
                            Next
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Change Password Modal */}
            {showChangePassword && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      Change Password
                    </h3>
                    <button
                      onClick={() => {
                        setShowChangePassword(false);
                        setChangePasswordData({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <Input
                        type="password"
                        value={changePasswordData.currentPassword}
                        onChange={(e) =>
                          setChangePasswordData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter current password"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={changePasswordData.newPassword}
                        onChange={(e) =>
                          setChangePasswordData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                        required
                        minLength={6}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                      </label>
                      <Input
                        type="password"
                        value={changePasswordData.confirmPassword}
                        onChange={(e) =>
                          setChangePasswordData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button
                        type="button"
                        onClick={() => {
                          setShowChangePassword(false);
                          setChangePasswordData({
                            currentPassword: "",
                            newPassword: "",
                            confirmPassword: "",
                          });
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isChangingPassword}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {isChangingPassword ? "Changing..." : "Change Password"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
