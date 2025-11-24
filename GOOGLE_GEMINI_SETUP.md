# 🔑 Google Gemini API Setup Guide

Use Google's Gemini API instead of OpenAI - it offers a **generous free tier**!

## Why Google Gemini?

✅ **Free Tier**: 15 requests per minute, 1500 requests per day  
✅ **No Credit Card Required**: Start using immediately  
✅ **Powerful**: Gemini 1.5 Pro supports long context  
✅ **Fast**: Quick response times  
✅ **Reliable**: Google's infrastructure  

## Step-by-Step Setup

### 1️⃣ Get Your Google API Key (FREE!)

1. **Visit Google AI Studio:**
   - Go to: https://aistudio.google.com/app/apikey

2. **Sign in with Google Account:**
   - Use your Gmail account
   - Accept terms of service

3. **Create API Key:**
   - Click "Get API Key" or "Create API Key"
   - Click "Create API key in new project" (recommended)
   - Your API key will be generated instantly

4. **Copy Your API Key:**
   - It looks like: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`
   - **Save it securely!**

### 2️⃣ Configure Your Backend

1. **Open your backend `.env` file:**
   ```powershell
   cd c:\Users\aades\OneDrive\Desktop\diagra\backend
   notepad .env
   ```

2. **Update these lines:**
   ```env
   # Set provider to google
   LLM_PROVIDER="google"

   # Add your Google API key
   GOOGLE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   GOOGLE_MODEL="gemini-1.5-pro"

   # You can leave OpenAI key empty or keep it for fallback
   OPENAI_API_KEY=""
   ```

3. **Save and close the file**

### 3️⃣ Install Google AI SDK

```powershell
cd backend
npm install
```

The `@google/generative-ai` package is already in package.json!

### 4️⃣ Restart Your Backend

```powershell
# Stop the current backend (Ctrl+C)
# Then restart:
npm run dev
```

You should see:
```
✅ Database connected
🚀 Server running on port 3000
📝 Environment: development
🎨 PlantUML Server: http://localhost:8080
```

### 5️⃣ Test It Out!

Open http://localhost:5173 and generate a diagram!

## Google Gemini Free Tier Limits

| Limit Type | Free Tier |
|------------|-----------|
| Requests per minute | 15 RPM |
| Requests per day | 1,500 RPD |
| Tokens per minute | 1 million TPM |
| Cost | **FREE** |

**This is plenty for development and testing!**

## Switching Between Providers

### Use Google Gemini (Recommended for Free Tier)
```env
LLM_PROVIDER="google"
GOOGLE_API_KEY="your-google-api-key"
```

### Use OpenAI (If you have credits)
```env
LLM_PROVIDER="openai"
OPENAI_API_KEY="sk-your-openai-key"
```

Just change `LLM_PROVIDER` and restart the backend!

## Available Models

### Google Gemini Models
| Model | Description | Context Window |
|-------|-------------|----------------|
| `gemini-1.5-pro` | Most capable (Recommended) | 2M tokens |
| `gemini-1.5-flash` | Faster, cheaper | 1M tokens |
| `gemini-pro` | Previous generation | 32K tokens |

**Recommendation**: Use `gemini-1.5-pro` for best diagram quality.

### OpenAI Models (for comparison)
| Model | Description | Cost |
|-------|-------------|------|
| `gpt-4-turbo-preview` | Most capable | $0.01/1K tokens |
| `gpt-3.5-turbo` | Faster, cheaper | $0.0005/1K tokens |

## Troubleshooting

### ❌ "Google AI not initialized"
**Fix:** Check `GOOGLE_API_KEY` is set in `.env`
```powershell
cd backend
notepad .env
# Verify GOOGLE_API_KEY is present
```

### ❌ "Invalid API key"
**Fix:** 
1. Go to https://aistudio.google.com/app/apikey
2. Check if key is enabled
3. Regenerate if needed
4. Update `.env` with new key

### ❌ "Rate limit exceeded"
**Fix:** You've hit the free tier limit (15 requests/minute)
- Wait 1 minute and try again
- Consider upgrading to paid tier if needed

### ❌ Cannot find module '@google/generative-ai'
**Fix:** Install dependencies
```powershell
cd backend
npm install
```

## Comparing OpenAI vs Google Gemini

| Feature | OpenAI GPT-4 | Google Gemini 1.5 Pro |
|---------|--------------|----------------------|
| Free Tier | $5 credit (limited) | 1,500 requests/day |
| Quality | Excellent | Excellent |
| Speed | Fast | Fast |
| Context | 128K tokens | 2M tokens |
| Cost | Paid after trial | Free for development |
| Best For | Production | Development & Testing |

## Getting More Quota

If you need more than the free tier:

1. **Enable Billing** in Google Cloud Console
2. **Pricing** (Pay-as-you-go):
   - Gemini 1.5 Pro: $7/million tokens input
   - Gemini 1.5 Flash: $0.35/million tokens input
   - Still very affordable!

## Example .env Configuration

```env
# Database
DATABASE_URL="postgresql://uml_user:uml_password@localhost:5432/uml_generator"

# LLM Provider Selection
LLM_PROVIDER="google"

# Google Gemini (Primary)
GOOGLE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
GOOGLE_MODEL="gemini-1.5-pro"

# OpenAI (Backup/Optional)
OPENAI_API_KEY=""
OPENAI_MODEL="gpt-4-turbo-preview"

# Other settings
PLANTUML_SERVER_URL="http://localhost:8080"
PORT=3000
JWT_SECRET="your-secret-key"
NODE_ENV="development"
ALLOWED_ORIGINS="http://localhost:5173"
```

## Testing Your Setup

### 1. Check Backend Logs
When you start the backend, you should see successful startup:
```
✅ Database connected
🚀 Server running on port 3000
```

### 2. Create a Test Project
Try this simple prompt:
```
Title: User Management System
Prompt: Design a simple user management system with user registration, login, and profile management.
Diagram Types: Class
```

### 3. Verify Success
- Diagram should generate in 10-20 seconds
- Check backend terminal for any errors
- Download SVG to verify quality

## Tips for Best Results

1. **Be Detailed**: Provide comprehensive system descriptions
2. **Use Examples**: Include specific features and requirements
3. **Select Appropriate Diagrams**: Choose relevant diagram types
4. **Regenerate if Needed**: Use the regenerate button to improve quality

## Need Help?

- **Google AI Studio**: https://aistudio.google.com/
- **Documentation**: https://ai.google.dev/docs
- **API Reference**: https://ai.google.dev/api/rest
- **Community**: https://discuss.ai.google.dev/

## Quick Checklist

- [ ] Got Google API key from https://aistudio.google.com/app/apikey
- [ ] Set `LLM_PROVIDER="google"` in backend/.env
- [ ] Set `GOOGLE_API_KEY="your-key"` in backend/.env
- [ ] Ran `npm install` in backend
- [ ] Restarted backend server
- [ ] Tested diagram generation
- [ ] It works! 🎉

---

**Congratulations! You're now using Google Gemini for FREE UML generation!** 🚀

No more worrying about OpenAI credits running out!
