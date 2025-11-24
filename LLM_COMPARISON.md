# 🆚 LLM Provider Comparison

## Quick Recommendation

**For Development & Personal Use:** ✅ Google Gemini  
**For Production at Scale:** ✅ OpenAI GPT-4

## Detailed Comparison

### Pricing & Limits

| Feature | Google Gemini 1.5 Pro | OpenAI GPT-4 Turbo |
|---------|----------------------|-------------------|
| **Free Tier** | ✅ 1,500 requests/day | ❌ $5 trial credit only |
| **Free RPM** | 15 requests/min | N/A |
| **Paid Input Cost** | $7 / 1M tokens | $10 / 1M tokens |
| **Paid Output Cost** | $21 / 1M tokens | $30 / 1M tokens |
| **Context Window** | 2M tokens | 128K tokens |
| **Credit Card Required** | ❌ No (for free tier) | ✅ Yes |

### Performance & Quality

| Aspect | Google Gemini | OpenAI GPT-4 |
|--------|--------------|--------------|
| **Response Speed** | ⚡ Fast (2-5s) | ⚡ Fast (2-4s) |
| **UML Quality** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent |
| **Accuracy** | ⭐⭐⭐⭐ Very Good | ⭐⭐⭐⭐⭐ Excellent |
| **JSON Output** | ✅ Native support | ✅ Native support |
| **Reliability** | ⭐⭐⭐⭐⭐ Very Stable | ⭐⭐⭐⭐⭐ Very Stable |

### Use Case Recommendations

#### ✅ Use Google Gemini When:
- 🎓 Learning & Development
- 🧪 Testing & Experimentation  
- 💰 Budget-conscious projects
- 🚀 Getting started quickly
- 📊 Need high context window (2M tokens)
- 🌍 No credit card available

#### ✅ Use OpenAI GPT-4 When:
- 🏢 Production applications
- 💼 Enterprise deployments
- 🎯 Need absolute best quality
- 📈 High-volume usage (>1,500/day)
- 🔒 Established billing relationship

## Feature Comparison

### Supported Diagram Types

Both providers support all diagram types:

| Diagram Type | Google Gemini | OpenAI GPT-4 |
|--------------|--------------|--------------|
| Class Diagrams | ✅ Excellent | ✅ Excellent |
| Sequence Diagrams | ✅ Excellent | ✅ Excellent |
| Activity Diagrams | ✅ Very Good | ✅ Excellent |
| Use Case Diagrams | ✅ Very Good | ✅ Excellent |
| State Diagrams | ✅ Good | ✅ Very Good |
| Component Diagrams | ✅ Good | ✅ Very Good |

### API Features

| Feature | Google Gemini | OpenAI GPT-4 |
|---------|--------------|--------------|
| JSON Mode | ✅ Built-in | ✅ Built-in |
| Streaming | ✅ Yes | ✅ Yes |
| Function Calling | ✅ Yes | ✅ Yes |
| Vision | ✅ Yes | ✅ Yes |
| Long Context | ✅ 2M tokens | ⚠️ 128K tokens |

## Real-World Costs

### Example: 100 Diagrams per Month

**Assumptions:**
- Each request: ~2,000 input tokens + 1,000 output tokens
- 100 projects × 3 diagrams = 300 diagram generations

#### Google Gemini (Free Tier)
```
Cost: $0 (within 1,500 requests/day limit)
```

#### Google Gemini (Paid)
```
Input:  300 × 2,000 tokens = 600K tokens
Output: 300 × 1,000 tokens = 300K tokens

Input Cost:  (600K / 1M) × $7   = $4.20
Output Cost: (300K / 1M) × $21  = $6.30
Total: $10.50/month
```

#### OpenAI GPT-4
```
Input:  300 × 2,000 tokens = 600K tokens
Output: 300 × 1,000 tokens = 300K tokens

Input Cost:  (600K / 1M) × $10  = $6.00
Output Cost: (300K / 1M) × $30  = $9.00
Total: $15.00/month
```

**Savings with Gemini:** ~30% cheaper + FREE tier!

## Setup Difficulty

| Step | Google Gemini | OpenAI |
|------|--------------|--------|
| Account Creation | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐⭐ Easy |
| Credit Card | ❌ Not required | ✅ Required (after trial) |
| API Key Generation | ⭐⭐⭐⭐⭐ Instant | ⭐⭐⭐⭐⭐ Instant |
| Integration | ⭐⭐⭐⭐⭐ Simple | ⭐⭐⭐⭐⭐ Simple |
| Overall | ⭐⭐⭐⭐⭐ Easier | ⭐⭐⭐⭐ Easy |

## Migration Guide

### Switching from OpenAI to Google Gemini

1. **Get Google API Key:**
   ```
   Visit: https://aistudio.google.com/app/apikey
   ```

2. **Update .env:**
   ```env
   LLM_PROVIDER="google"
   GOOGLE_API_KEY="AIzaSyXXXXXXXXXXXX"
   ```

3. **Restart backend:**
   ```powershell
   npm run dev
   ```

**That's it!** No code changes needed.

### Switching from Google to OpenAI

1. **Get OpenAI API Key:**
   ```
   Visit: https://platform.openai.com/api-keys
   ```

2. **Update .env:**
   ```env
   LLM_PROVIDER="openai"
   OPENAI_API_KEY="sk-XXXXXXXXXXXX"
   ```

3. **Restart backend:**
   ```powershell
   npm run dev
   ```

## Rate Limits

### Google Gemini Free Tier
- **Requests per Minute (RPM):** 15
- **Requests per Day (RPD):** 1,500
- **Tokens per Minute:** 1 million

### OpenAI GPT-4 (Tier 1)
- **Requests per Minute (RPM):** 500
- **Tokens per Minute (TPM):** 30,000
- **Requires:** Credit card & usage history

## Conclusion

### 🏆 Winner for This Project: Google Gemini

**Why?**
- ✅ FREE for development (1,500 requests/day)
- ✅ No credit card needed
- ✅ Excellent quality for UML generation
- ✅ Huge context window (2M tokens)
- ✅ 30% cheaper when you scale
- ✅ Easy to switch to OpenAI later if needed

### When to Consider OpenAI?
- You're already using OpenAI elsewhere
- You need the absolute best quality
- You're generating >1,500 diagrams/day
- Enterprise support requirements

## Quick Setup Commands

### Using Google Gemini (Recommended)
```powershell
# 1. Get API key: https://aistudio.google.com/app/apikey

# 2. Update .env
cd backend
notepad .env

# 3. Set:
LLM_PROVIDER="google"
GOOGLE_API_KEY="your-key"

# 4. Restart
npm run dev
```

### Using OpenAI
```powershell
# 1. Get API key: https://platform.openai.com/api-keys

# 2. Update .env
cd backend
notepad .env

# 3. Set:
LLM_PROVIDER="openai"
OPENAI_API_KEY="your-key"

# 4. Restart
npm run dev
```

---

## Additional Resources

- **Google Gemini Setup:** [GOOGLE_GEMINI_SETUP.md](GOOGLE_GEMINI_SETUP.md)
- **Google AI Studio:** https://aistudio.google.com/
- **OpenAI Platform:** https://platform.openai.com/
- **Pricing Calculator:** Compare at https://ai.google.dev/pricing

**Need help choosing?** Start with Google Gemini - it's free and you can always switch! 🚀
