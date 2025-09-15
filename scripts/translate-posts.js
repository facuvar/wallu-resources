#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

// Function to parse frontmatter
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid frontmatter format');
  }
  
  const frontmatter = {};
  const frontmatterLines = match[1].split('\n');
  
  frontmatterLines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      } else if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(item => item.trim().replace(/['"]/g, ''));
      }
      
      frontmatter[key] = value;
    }
  });
  
  return {
    frontmatter,
    content: match[2]
  };
}

// Function to create frontmatter string
function createFrontmatter(data) {
  let result = '---\n';
  
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value)) {
      result += `${key}: [${value.map(v => `'${v}'`).join(', ')}]\n`;
    } else {
      result += `${key}: '${value}'\n`;
    }
  }
  
  result += '---\n';
  return result;
}

// Function to translate content using OpenAI
async function translateContent(content, targetLanguage) {
  const languageNames = {
    en: 'English',
    pt: 'Portuguese'
  };
  
  const prompt = `Translate the following Markdown blog post to ${languageNames[targetLanguage]}. 
Keep the same Markdown formatting, structure, and style. 
Translate the content naturally while maintaining the technical terms related to ebooks and AI.
Do not translate URLs, code blocks, or markdown syntax.

Content to translate:
${content}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional translator specializing in technical and marketing content about ebooks and artificial intelligence. Maintain the same tone and style while translating."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(`Error translating to ${targetLanguage}:`, error);
    throw error;
  }
}

// Function to translate frontmatter
async function translateFrontmatter(frontmatter, targetLanguage) {
  const translatedFrontmatter = { ...frontmatter };
  
  // Translate title and description
  if (frontmatter.title) {
    const titleResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system", 
          content: "You are a professional translator. Translate only the text provided, maintaining the same tone and style."
        },
        {
          role: "user",
          content: `Translate this blog post title to ${targetLanguage === 'en' ? 'English' : 'Portuguese'}: "${frontmatter.title}"`
        }
      ],
      temperature: 0.3,
    });
    translatedFrontmatter.title = titleResponse.choices[0].message.content.replace(/['"]/g, '');
  }
  
  if (frontmatter.description) {
    const descResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional translator. Translate only the text provided, maintaining the same tone and style."
        },
        {
          role: "user", 
          content: `Translate this blog post description to ${targetLanguage === 'en' ? 'English' : 'Portuguese'}: "${frontmatter.description}"`
        }
      ],
      temperature: 0.3,
    });
    translatedFrontmatter.description = descResponse.choices[0].message.content.replace(/['"]/g, '');
  }
  
  // Set language
  translatedFrontmatter.language = targetLanguage;
  
  return translatedFrontmatter;
}

// Function to get filename suffix for language
function getLanguageSuffix(language) {
  return language === 'es' ? '' : `-${language}`;
}

// Main function to translate posts
async function translatePosts() {
  console.log('🌍 Starting post translation process...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not found in environment variables');
    process.exit(1);
  }
  
  try {
    const files = fs.readdirSync(BLOG_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    for (const file of markdownFiles) {
      const filePath = path.join(BLOG_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        const { frontmatter, content: postContent } = parseFrontmatter(content);
        
        // Skip if not Spanish or already has language suffix
        if (frontmatter.language !== 'es' || file.includes('-en') || file.includes('-pt')) {
          continue;
        }
        
        const baseName = file.replace('.md', '');
        
        // Check if translations already exist
        const enFile = `${baseName}-en.md`;
        const ptFile = `${baseName}-pt.md`;
        
        const enExists = fs.existsSync(path.join(BLOG_DIR, enFile));
        const ptExists = fs.existsSync(path.join(BLOG_DIR, ptFile));
        
        // Translate to English if not exists
        if (!enExists) {
          console.log(`📝 Translating ${file} to English...`);
          
          const [translatedFrontmatter, translatedContent] = await Promise.all([
            translateFrontmatter(frontmatter, 'en'),
            translateContent(postContent, 'en')
          ]);
          
          const translatedPost = createFrontmatter(translatedFrontmatter) + translatedContent;
          fs.writeFileSync(path.join(BLOG_DIR, enFile), translatedPost);
          console.log(`✅ Created ${enFile}`);
        }
        
        // Translate to Portuguese if not exists
        if (!ptExists) {
          console.log(`📝 Translating ${file} to Portuguese...`);
          
          const [translatedFrontmatter, translatedContent] = await Promise.all([
            translateFrontmatter(frontmatter, 'pt'),
            translateContent(postContent, 'pt')
          ]);
          
          const translatedPost = createFrontmatter(translatedFrontmatter) + translatedContent;
          fs.writeFileSync(path.join(BLOG_DIR, ptFile), translatedPost);
          console.log(`✅ Created ${ptFile}`);
        }
        
        if (enExists && ptExists) {
          console.log(`⏭️  Skipping ${file} - translations already exist`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        if (error.message.includes('exceeded your current quota')) {
          console.log('💳 OpenAI quota exceeded - skipping remaining translations');
          break; // Stop trying to translate more files
        }
      }
    }
    
    console.log('🎉 Translation process completed!');
    
  } catch (error) {
    console.error('❌ Error in translation process:', error.message);
    console.log('⚠️  Continuing with build - translations will be skipped');
    // Don't exit with error code to allow build to continue
  }
}

// Run the translation
translatePosts();
