import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const beveragesFolder = path.join(__dirname, 'src/assets/beverages/');

async function convertImagesToWebP() {
  console.log('🎯 Converting PNG to WebP in beverages folder...');
  
  try {
    const files = fs.readdirSync(beveragesFolder);
    const pngFiles = files.filter(file => file.endsWith('.png'));
    
    console.log(`📁 Found ${pngFiles.length} PNG files to convert:`);
    pngFiles.forEach(file => console.log(`   - ${file}`));
    
    for (const file of pngFiles) {
      const inputPath = path.join(beveragesFolder, file);
      const outputPath = path.join(beveragesFolder, file.replace('.png', '.webp'));
      
      try {
        await sharp(inputPath)
          .webp({ 
            quality: 85,
            effort: 6 // Good balance between speed and quality
          })
          .toFile(outputPath);
          
        console.log(`✅ Converted: ${file} → ${file.replace('.png', '.webp')}`);
        
        // Get file sizes to show compression
        const originalStats = fs.statSync(inputPath);
        const webpStats = fs.statSync(outputPath);
        const compression = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
        
        console.log(`   📊 Original: ${(originalStats.size / 1024).toFixed(1)}KB → WebP: ${(webpStats.size / 1024).toFixed(1)}KB (${compression}% smaller)`);
        
      } catch (error) {
        console.error(`❌ Error converting ${file}:`, error.message);
      }
    }
    
    console.log('\n🎉 Conversion complete!');
    console.log('📝 Next steps:');
    console.log('   1. Update the imports in productImages.js to use .webp files');
    console.log('   2. Test that images load correctly');
    console.log('   3. Optionally delete the original PNG files');
    
  } catch (error) {
    console.error('❌ Error reading beverages folder:', error.message);
  }
}

// Run the conversion
convertImagesToWebP();
