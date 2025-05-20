# Environment Variables Setup Guide

This guide explains how to set up environment variables for both server-side and client-side access in the Synaptiq application.

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`
# Server-side API keys
GROQ_API_KEY=your_groq_api_key_here

# Client-side accessible API keys (prefixed with NEXT_PUBLIC_)
NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here

# API URLs
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
\`\`\`

## Important Security Considerations

- **NEVER** commit your `.env.local` file to version control
- Be aware that any environment variable prefixed with `NEXT_PUBLIC_` will be exposed to the browser
- For production, use a secure environment variable management system

## How Environment Variables Work in Next.js

1. **Server-side only variables**: Regular environment variables in `.env.local` are only available on the server
2. **Client-side accessible variables**: Variables prefixed with `NEXT_PUBLIC_` are available in both client and server code

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
