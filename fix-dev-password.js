const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️ ${message}`, 'blue');
}

// User Schema (simplified for testing)
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, default: 'admin' },
  isDev: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function fixDevPassword() {
  log('🔧 Fixing Dev Account Password', 'bold');
  log('==============================', 'bold');
  console.log('');

  try {
    // Connect to MongoDB
    logInfo('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/prakash-enterprises');
    
    if (mongoose.connection.readyState === 1) {
      logSuccess('MongoDB connected successfully');
    } else {
      logError('MongoDB connection failed');
      return;
    }
    console.log('');

    // Find the dev account
    logInfo('Finding dev account...');
    const devAccount = await User.findOne({ email: 'prince844121@gmail.com' });
    
    if (!devAccount) {
      logError('Dev account not found');
      return;
    }
    
    logSuccess('Dev account found');
    console.log('Current account details:', {
      email: devAccount.email,
      name: devAccount.name,
      role: devAccount.role,
      isDev: devAccount.isDev
    });
    console.log('');

    // Hash the new password
    logInfo('Hashing new password...');
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('1234okay', saltRounds);
    
    // Update the password
    logInfo('Updating password...');
    devAccount.password = hashedPassword;
    await devAccount.save();
    
    logSuccess('Password updated successfully');
    console.log('');

    // Test the new password
    logInfo('Testing new password...');
    const isPasswordValid = await bcrypt.compare('1234okay', devAccount.password);
    if (isPasswordValid) {
      logSuccess('Password test passed');
    } else {
      logError('Password test failed');
    }

  } catch (error) {
    logError(`Password fix failed: ${error.message}`);
    console.error('Full error:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    logInfo('Database connection closed');
  }
}

// Run the fix
fixDevPassword().catch(error => {
  logError(`Fix execution failed: ${error.message}`);
  process.exit(1);
});
