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

async function createDevAccount() {
  try {
    // Check if dev account already exists
    const existingDev = await User.findOne({ email: "prince844121@gmail.com" });

    if (existingDev) {
      console.log("Dev account already exists. Updating password...");
      const hashedPassword = await bcrypt.hash("1234okay", 10);
      existingDev.password = hashedPassword;
      existingDev.isDev = true;
      existingDev.role = "superadmin";
      await existingDev.save();
      console.log("Dev account updated successfully!");
    } else {
      // Create new dev account
      const hashedPassword = await bcrypt.hash("1234okay", 10);
      const devAccount = new User({
        email: "prince844121@gmail.com",
        password: hashedPassword,
        role: "superadmin",
        isDev: true,
      });

      await devAccount.save();
      console.log("Dev account created successfully!");
    }

    console.log("Dev Account Details:");
    console.log("Email: prince844121@gmail.com");
    console.log("Password: 1234okay");
    console.log("Role: superadmin");
    console.log("isDev: true");
  } catch (error) {
    console.error("Error creating dev account:", error);
  } finally {
    mongoose.connection.close();
  }
}

createDevAccount();
