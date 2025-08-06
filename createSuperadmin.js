const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

async function createSuperadmin() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI not set in .env");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const email = "prince844121@gmail.com";
  const password = "1234okay";
  const name = "Admin";

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log("Superadmin already exists:", existing.email);
    } else {
      const user = await User.create({
        email,
        password,
        name,
        role: "dev",
      });
      console.log("Superadmin created:", user.email);
    }
  } catch (error) {
    console.error("Error creating superadmin:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createSuperadmin();
