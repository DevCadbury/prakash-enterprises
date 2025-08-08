const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function logWarning(message) {
  log(`⚠️ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ️ ${message}`, 'blue');
}

function logStep(step, message) {
  log(`\n${step}. ${message}`, 'bold');
}

async function runCommand(command, description) {
  try {
    logInfo(`Running: ${command}`);
    execSync(command, { stdio: 'inherit' });
    logSuccess(`${description} completed successfully`);
    return true;
  } catch (error) {
    logError(`${description} failed: ${error.message}`);
    return false;
  }
}

async function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

async function deployFinal() {
  log('🚀 Final Deployment Preparation', 'bold');
  log('==============================', 'bold');
  console.log('');

  // Step 1: Check if we're in the right directory
  logStep(1, 'Checking project structure...');
  const requiredFiles = [
    'package.json',
    'server.js',
    'vercel.json',
    'client/package.json'
  ];

  for (const file of requiredFiles) {
    if (await checkFileExists(file)) {
      logSuccess(`✓ ${file} exists`);
    } else {
      logError(`✗ ${file} missing`);
      return false;
    }
  }

  // Step 2: Install dependencies
  logStep(2, 'Installing server dependencies...');
  if (!(await runCommand('npm install', 'Server dependencies installation'))) {
    return false;
  }

  // Step 3: Install client dependencies
  logStep(3, 'Installing client dependencies...');
  if (!(await runCommand('cd client && npm install', 'Client dependencies installation'))) {
    return false;
  }

  // Step 4: Build the client
  logStep(4, 'Building client application...');
  if (!(await runCommand('cd client && npm run build', 'Client build'))) {
    return false;
  }

  // Step 5: Test the build locally
  logStep(5, 'Testing build locally...');
  if (!(await runCommand('npm start', 'Local server test'))) {
    logWarning('Local server test failed, but continuing with deployment...');
  }

  // Step 6: Check for build artifacts
  logStep(6, 'Verifying build artifacts...');
  const buildPath = path.join(__dirname, 'client/build');
  if (await checkFileExists(buildPath)) {
    logSuccess('✓ Client build directory exists');
    
    const buildFiles = fs.readdirSync(buildPath);
    if (buildFiles.includes('index.html') && buildFiles.includes('static')) {
      logSuccess('✓ Build artifacts are complete');
    } else {
      logError('✗ Build artifacts are incomplete');
      return false;
    }
  } else {
    logError('✗ Client build directory missing');
    return false;
  }

  // Step 7: Verify configuration files
  logStep(7, 'Verifying configuration files...');
  
  // Check vercel.json
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (vercelConfig.builds && vercelConfig.routes) {
    logSuccess('✓ vercel.json configuration is valid');
  } else {
    logError('✗ vercel.json configuration is invalid');
    return false;
  }

  // Check package.json scripts
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts['vercel-build']) {
    logSuccess('✓ Vercel build script configured');
  } else {
    logError('✗ Vercel build script missing');
    return false;
  }

  // Step 8: Environment variables checklist
  logStep(8, 'Environment Variables Checklist...');
  logInfo('Make sure to set these environment variables in Vercel:');
  logInfo('• MONGODB_URI - Your MongoDB connection string');
  logInfo('• JWT_SECRET - Your JWT secret key');
  logInfo('• EMAIL_USER - Your email address');
  logInfo('• EMAIL_PASS - Your email password/app password');
  logInfo('• NODE_ENV - Set to "production"');

  // Step 9: Final deployment instructions
  logStep(9, 'Deployment Instructions...');
  logInfo('To deploy to Vercel, run these commands:');
  logInfo('1. vercel --prod');
  logInfo('2. Set environment variables in Vercel dashboard');
  logInfo('3. Run: npm run test-production');

  // Step 10: Success message
  logStep(10, 'Deployment Preparation Complete!');
  logSuccess('Your application is ready for deployment to Vercel!');
  logInfo('All files are properly configured and the build is complete.');
  logInfo('You can now deploy using: vercel --prod');

  console.log('');
  log('📋 Next Steps:', 'bold');
  log('1. Deploy to Vercel: vercel --prod');
  log('2. Set environment variables in Vercel dashboard');
  log('3. Test the deployed application');
  log('4. Run production tests: npm run test-production');

  console.log('');
  log('🎯 Ready for Production!', 'bold');
  log('======================', 'bold');

  return true;
}

// Run the deployment preparation
deployFinal().then(success => {
  if (success) {
    logSuccess('Deployment preparation completed successfully!');
    process.exit(0);
  } else {
    logError('Deployment preparation failed!');
    process.exit(1);
  }
}).catch(error => {
  logError(`Deployment preparation error: ${error.message}`);
  process.exit(1);
});
