const mongoose = require("mongoose");
require("dotenv").config();

// Import the Visitor model
const Visitor = require("./models/Visitor");

// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/prakash-enterprises",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const addTestVisitors = async () => {
  try {
    console.log("🔄 Adding test visitor data...");

    // Clear existing test data (optional)
    // await Visitor.deleteMany({});

    const pages = ["home", "contact", "services", "about", "admin"];
    const devices = ["desktop", "mobile", "tablet"];
    const browsers = ["Chrome", "Firefox", "Safari", "Edge"];
    const os = ["Windows", "macOS", "Linux", "Android", "iOS"];

    // Generate visitors for the last 7 days
    const visitors = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Generate 5-15 visitors per day
      const visitorsPerDay = Math.floor(Math.random() * 11) + 5;

      for (let j = 0; j < visitorsPerDay; j++) {
        const visitorTime = new Date(date);
        visitorTime.setHours(Math.floor(Math.random() * 24));
        visitorTime.setMinutes(Math.floor(Math.random() * 60));

        visitors.push({
          ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
          userAgent: "Mozilla/5.0 (Test Browser)",
          page: pages[Math.floor(Math.random() * pages.length)],
          referrer: Math.random() > 0.5 ? "google.com" : "",
          device: devices[Math.floor(Math.random() * devices.length)],
          browser: browsers[Math.floor(Math.random() * browsers.length)],
          os: os[Math.floor(Math.random() * os.length)],
          sessionId: `session_${Date.now()}_${Math.random()}`,
          isReturning: Math.random() > 0.7,
          createdAt: visitorTime,
        });
      }
    }

    // Insert all visitors
    await Visitor.insertMany(visitors);

    console.log(`✅ Added ${visitors.length} test visitors`);
    console.log("📊 Test data includes:");
    console.log("   - 7 days of visitor data");
    console.log("   - Multiple pages, devices, browsers, and OS");
    console.log("   - Random visitor counts per day (5-15)");
    console.log("   - Mix of new and returning visitors");

    // Show some stats
    const totalVisitors = await Visitor.countDocuments();
    const todayVisitors = await Visitor.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    console.log(`📈 Total visitors in database: ${totalVisitors}`);
    console.log(`📈 Today's visitors: ${todayVisitors}`);
  } catch (error) {
    console.error("❌ Error adding test visitors:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
};

// Run the script
addTestVisitors();
