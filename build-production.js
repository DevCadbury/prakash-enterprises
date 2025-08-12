const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building for production...\n');

try {
  // Step 1: Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Step 2: Build client
  console.log('🏗️  Building client...');
  execSync('cd client && npm install', { stdio: 'inherit' });
  execSync('cd client && npm run build', { stdio: 'inherit' });
  
  // Step 3: Verify build
  const buildPath = path.join(__dirname, 'client/build');
  if (fs.existsSync(buildPath)) {
    const stats = fs.statSync(buildPath);
    console.log(`✅ Client build completed successfully`);
    console.log(`📁 Build directory: ${buildPath}`);
    console.log(`📊 Build size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  } else {
    throw new Error('Client build failed - build directory not found');
  }
  
  // Step 4: Test MongoDB connection
  console.log('\n🧪 Testing MongoDB connection...');
  execSync('npm run test-mongodb', { stdio: 'inherit' });
  
  // Step 5: Test CORS
  console.log('\n🧪 Testing CORS...');
  execSync('npm run test-cors', { stdio: 'inherit' });
  
  console.log('\n🎉 Production build completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('   1. Deploy to Vercel: vercel --prod');
  console.log('   2. Or start production server: npm start');
  console.log('   3. Test production APIs: npm run test-apis:vercel');
  
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}
