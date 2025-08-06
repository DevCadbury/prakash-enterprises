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

// User model with correct enum
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ["superadmin", "admin", "user", "dev"],
    default: "user",
  },
  isDev: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  // Check if password is already hashed (starts with $2a$ or $2b$)
  if (this.password.startsWith("$2a$") || this.password.startsWith("$2b$")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

async function fixLogin() {
  try {
    console.log("🔧 Fixing login issue...");

    // Find the existing dev account
    const devAccount = await User.findOne({ email: "prince844121@gmail.com" });

    if (devAccount) {
      console.log("✅ Found existing dev account");
      console.log("📧 Email:", devAccount.email);
      console.log("👤 Name:", devAccount.name);
      console.log("🔑 Current Role:", devAccount.role);
      console.log("⚙️ isDev:", devAccount.isDev);
      console.log("✅ isActive:", devAccount.isActive);

      // Update the role to dev
      devAccount.role = "dev";
      devAccount.isDev = true;
      devAccount.isActive = true;

      await devAccount.save();
      console.log("✅ Updated role to dev");

      // Test password
      const testPassword = "1234okay";
      const isPasswordValid = await devAccount.comparePassword(testPassword);
      console.log("🔐 Password validation result:", isPasswordValid);

      if (!isPasswordValid) {
        console.log("❌ Password is incorrect, updating...");
        const hashedPassword = await bcrypt.hash(testPassword, 10);
        devAccount.password = hashedPassword;
        await devAccount.save();
        console.log("✅ Password updated successfully");
      }
    } else {
      console.log("❌ Dev account not found. Creating one...");
      const hashedPassword = await bcrypt.hash("1234okay", 10);
      const newDevAccount = new User({
        email: "prince844121@gmail.com",
        password: hashedPassword,
        name: "Prince",
        role: "dev",
        isDev: true,
        isActive: true,
      });

      await newDevAccount.save();
      console.log("✅ Dev account created successfully");
    }

    console.log("\n📋 Final Dev Account Details:");
    console.log("📧 Email: prince844121@gmail.com");
    console.log("🔑 Password: 1234okay");
    console.log("👤 Name: Prince");
    console.log("🔑 Role: dev");
    console.log("⚙️ isDev: true");
    console.log("✅ isActive: true");

    console.log("\n🎯 Login should now work:");
    console.log("1. Start the server: npm run dev");
    console.log("2. Try logging in at /admin");
    console.log("3. Use email: prince844121@gmail.com");
    console.log("4. Use password: 1234okay");
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    mongoose.connection.close();
  }
}

fixLogin();
