// Debug Vercel Deployment
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'https://prakash-enterprises.vercel.app';

async function debugDeployment() {
  console.log('🔍 Debugging Vercel Deployment');
  console.log('===============================');
  console.log('');

  const testUrls = [
    '/',
    '/admin',
    '/contact',
    '/api/health',
    '/static/js/main.2b2fa132.js',
    '/favicon.ico'
  ];

  for (const path of testUrls) {
    const url = `${BASE_URL}${path}`;
    console.log(`Testing: ${url}`);
    
    try {
      const response = await fetch(url);
      console.log(`  Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        console.log(`  Content-Type: ${contentType}`);
        
        if (contentType && contentType.includes('text/html')) {
          const text = await response.text();
          console.log(`  HTML Length: ${text.length} characters`);
          console.log(`  Contains React: ${text.includes('root') ? '✅' : '❌'}`);
        }
      } else {
        const text = await response.text();
        console.log(`  Error: ${text.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`  Error: ${error.message}`);
    }
    
    console.log('');
  }

  console.log('🎯 Debug Complete!');
  console.log('');
  console.log('💡 Analysis:');
  console.log('- If /api/health works but / doesn\'t: Vercel routing issue');
  console.log('- If static files work but / doesn\'t: React Router issue');
  console.log('- If nothing works: Build or deployment issue');
}

debugDeployment();
