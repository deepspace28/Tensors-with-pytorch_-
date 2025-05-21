# Environment Variables Setup Guide

This guide explains how to set up environment variables for both server-side and client-side access in the Synaptiq application.

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`
# Server-side API keys (SECURE - not exposed to client)
GROQ_API_KEY=your_groq_api_key_here

# Client-side accessible API keys (prefixed with NEXT_PUBLIC_)
# IMPORTANT: Never put sensitive API keys as NEXT_PUBLIC_ variables!

# API URLs
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
\`\`\`

## Important Security Considerations

- **NEVER** commit your `.env.local` file to version control
- **NEVER** prefix sensitive API keys with `NEXT_PUBLIC_` as they will be exposed to the browser
- Be aware that any environment variable prefixed with `NEXT_PUBLIC_` will be exposed to the browser
- For production, use a secure environment variable management system
- Always use server-side API routes to make requests that require API keys

## How Environment Variables Work in Next.js

1. **Server-side only variables**: Regular environment variables in `.env.local` are only available on the server
2. **Client-side accessible variables**: Variables prefixed with `NEXT_PUBLIC_` are available in both client and server code

## Security Best Practices

1. Keep all API keys as server-side only variables (without the NEXT_PUBLIC_ prefix)
2. Create server-side API routes that use these keys to make external API calls
3. Have your client-side code call these server routes instead of making direct external API calls

## Verifying Your Setup

1. Start your development server: `npm run dev`
2. Visit the API demo page: [http://localhost:3000/api-demo](http://localhost:3000/api-demo)
3. Check the API health endpoint: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## Troubleshooting

If you encounter issues with environment variables:

1. Make sure you've created the `.env.local` file in the root directory
2. Ensure you've restarted your development server after adding environment variables
3. Check the API health endpoint for detailed diagnostics
4. Verify that you're using the correct variable names in your code
\`\`\`

\`\`\`plaintext file=".env.local"
# API Keys (SECURE - server-side only)
GROQ_API_KEY=${process.env.GROQ_API_KEY}

# Python API Configuration
PYTHON_API_URL=${process.env.PYTHON_API_URL}
PYTHON_API_KEY=${process.env.PYTHON_API_KEY}
NEXT_PUBLIC_PYTHON_API_URL=${process.env.NEXT_PUBLIC_PYTHON_API_URL}

# Database Configuration
MONGODB_URI=${process.env.MONGODB_URI}

# Redis for rate limiting
REDIS_URL=${process.env.REDIS_URL}

# Rate limiting settings
RATE_LIMIT_ANONYMOUS=10
RATE_LIMIT_FREE=50
RATE_LIMIT_PREMIUM=200
RATE_LIMIT_WINDOW=3600

# Email credentials for contact form
ZOHO_USER=${process.env.ZOHO_USER}
ZOHO_APP_PASSWORD=${process.env.ZOHO_APP_PASSWORD}

# Google API
GOOGLE_API_KEY=${process.env.GOOGLE_API_KEY}
SEARCH_ENGINE_ID=${process.env.SEARCH_ENGINE_ID}
GOOGLE_CLIENT_ID=${process.env.GOOGLE_CLIENT_ID}

# Application Settings
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_BASE_URL=${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}
NEXT_PUBLIC_API_BASE_URL=${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'}
NEXT_PUBLIC_FEATURE_FLAG=${process.env.NEXT_PUBLIC_FEATURE_FLAG || 'true'}
NEXT_PUBLIC_API_URL=${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'}

# Authentication
JWT_SECRET=${process.env.JWT_SECRET || 'your-secret-key-here'}

# Synaptiq API
SYNAPTIQ_API_KEY=${process.env.SYNAPTIQ_API_KEY}

# Scalar API
SCALAR_API_KEY=${process.env.SCALAR_API_KEY}

# Application Settings
NEXT_PUBLIC_DEMO_MODE=false

DDG_API_URL=https://api.duckduckgo.com/
