const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/prakash_enterprises",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "superadmin"], default: "superadmin" },
  isDev: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

async function testDevAccount() {
  try {
    console.log("Testing dev account creation...");

    // Check if dev account exists
    const existingDev = await User.findOne({ email: "prince844121@gmail.com" });

    if (existingDev) {
      console.log("✅ Dev account already exists");
      console.log("Email:", existingDev.email);
      console.log("Role:", existingDev.role);
      console.log("isDev:", existingDev.isDev);

      // Test password
      const testPassword = "1234okay";
      const isPasswordValid = await bcrypt.compare(
        testPassword,
        existingDev.password
      );

      if (isPasswordValid) {
        console.log("✅ Password is correct");
      } else {
        console.log("❌ Password is incorrect, updating...");
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        existingDev.password = hashedPassword;
        await existingDev.save();
        console.log("✅ Password updated successfully");
      }
    } else {
      console.log("Creating new dev account...");
      const hashedPassword = await bcrypt.hash("1234okay", 10);
      const devAccount = new User({
        email: "prince844121@gmail.com",
        password: hashedPassword,
        role: "superadmin",
        isDev: true,
      });

      await devAccount.save();
      console.log("✅ Dev account created successfully");
    }

    console.log("\n📋 Dev Account Details:");
    console.log("Email: prince844121@gmail.com");
    console.log("Password: 1234okay");
    console.log("Role: superadmin");
    console.log("isDev: true");

    console.log("\n🎯 You can now:");
    console.log("1. Login to admin dashboard at /admin");
    console.log('2. Use "Forgot Password" to reset password');
    console.log('3. Use "Change Password" in the dashboard');
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

testDevAccount();
