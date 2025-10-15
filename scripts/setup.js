#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Setting up Portfolio Project...\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
const envExamplePath = path.join(process.cwd(), 'env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Created .env file from template');
    console.log('⚠️  Please update .env with your Supabase credentials\n');
  } else {
    console.log('❌ env.example file not found');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('📋 Next steps:');
console.log('1. Update .env with your Supabase URL and anon key');
console.log('2. Set up your Supabase database tables (see README.md)');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('\n🎉 Setup complete! Happy coding!');
