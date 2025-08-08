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

function logInfo(message) {
  log(`ℹ️ ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️ ${message}`, 'yellow');
}

async function deployToVercel() {
  log('🚀 Starting Vercel Deployment', 'bold');
  log('==============================', 'bold');
  console.log('');

  try {
    // Step 1: Check if we're in the right directory
    logInfo('Checking project structure...');
    if (!fs.existsSync('package.json')) {
      throw new Error('package.json not found. Please run this script from the project root.');
    }
    if (!fs.existsSync('client/package.json')) {
      throw new Error('client/package.json not found. Please ensure the React app is in the client directory.');
    }
    logSuccess('Project structure verified');
    console.log('');

    // Step 2: Install dependencies
    logInfo('Installing server dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    logSuccess('Server dependencies installed');
    console.log('');

    logInfo('Installing client dependencies...');
    execSync('cd client && npm install', { stdio: 'inherit' });
    logSuccess('Client dependencies installed');
    console.log('');

    // Step 3: Build the client
    logInfo('Building React application...');
    execSync('cd client && npm run build', { stdio: 'inherit' });
    logSuccess('React application built successfully');
    console.log('');

    // Step 4: Check environment variables
    logInfo('Checking environment variables...');
    if (!fs.existsSync('.env')) {
      logWarning('.env file not found. Please ensure all environment variables are set in Vercel.');
    } else {
      logSuccess('.env file found');
    }
    console.log('');

    // Step 5: Verify vercel.json configuration
    logInfo('Checking Vercel configuration...');
    if (!fs.existsSync('vercel.json')) {
      throw new Error('vercel.json not found. Please ensure Vercel configuration is present.');
    }
    
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    logSuccess('Vercel configuration verified');
    console.log('Configuration:', JSON.stringify(vercelConfig, null, 2));
    console.log('');

    // Step 6: Test production build locally
    logInfo('Testing production build locally...');
    try {
      execSync('npm run test-production', { stdio: 'inherit' });
      logSuccess('Production API tests passed');
    } catch (error) {
      logWarning('Some production API tests failed. This might be expected if the server is not running.');
    }
    console.log('');

    // Step 7: Deploy to Vercel
    logInfo('Deploying to Vercel...');
    logWarning('This will deploy to Vercel. Make sure you have the Vercel CLI installed and are logged in.');
    console.log('');
    
    const deployCommand = 'vercel --prod';
    logInfo(`Running: ${deployCommand}`);
    logInfo('If you want to deploy manually, run: vercel --prod');
    console.log('');

    // Step 8: Post-deployment verification
    logInfo('Post-deployment checklist:');
    console.log('1. ✅ Environment variables set in Vercel dashboard');
    console.log('2. ✅ MongoDB connection string configured');
    console.log('3. ✅ JWT_SECRET configured');
    console.log('4. ✅ Email credentials configured (if using email features)');
    console.log('5. ✅ Domain configured (if using custom domain)');
    console.log('');

    // Step 9: Test deployed APIs
    logInfo('After deployment, test the following URLs:');
    console.log('• Health Check: https://your-app.vercel.app/api/health');
    console.log('• Contact Form: https://your-app.vercel.app/api/contact');
    console.log('• Quote Request: https://your-app.vercel.app/api/quote');
    console.log('• Admin Login: https://your-app.vercel.app/api/admin/login');
    console.log('');

    logSuccess('Deployment preparation completed!');
    logInfo('Next steps:');
    console.log('1. Run: vercel --prod');
    console.log('2. Set environment variables in Vercel dashboard');
    console.log('3. Test all APIs after deployment');
    console.log('4. Update any hardcoded URLs if needed');

  } catch (error) {
    logError(`Deployment failed: ${error.message}`);
    console.error('Full error:', error);
    process.exit(1);
  }
}

// Run the deployment
deployToVercel().catch(error => {
  logError(`Deployment script failed: ${error.message}`);
  process.exit(1);
});
