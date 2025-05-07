import { streamText } from 'ai';
import { google } from '@ai-sdk/google';

// Set up API key
const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_GENERATIVE_AI_API_KEY is not set in environment variables');
}

// Use the Vercel Edge runtime
export const runtime = 'edge';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages, chatbotType, systemPrompt } = await req.json();
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Processing chat request with messages:', 
      messages.map((m: any) => ({ role: m.role, content: m.content.substring(0, 50) + (m.content.length > 50 ? '...' : '') }))
    );
    
    console.log('Chatbot type:', chatbotType);
    
    // Add Markdown formatting instructions to the system prompt
    const markdownInstructions = `
      Format your responses using Markdown syntax:
      - Use **bold** for emphasis
      - Use *italic* for light emphasis
      - Use \`code\` for inline code
      - Use \`\`\`language\n...\n\`\`\` for code blocks
      - Use > for blockquotes
      - Use - or * for bullet points
      - Use 1. 2. etc. for numbered lists
      - Use [text](URL) for links
      - Use # ## ### for headings
      
      When sharing code examples, always use proper Markdown code blocks with language specification.
    `;
    
    // Use the provided system prompt or fall back to a default one
    const finalSystemPrompt = `${systemPrompt || `
      You are a helpful assistant that can answer questions and help with tasks. Please respond in Indonesian. 
      Please be friendly and engaging and use slang/informal language.
    `}
    
    ${markdownInstructions}`;
    
    console.log('Using system prompt:', finalSystemPrompt.substring(0, 100) + (finalSystemPrompt.length > 100 ? '...' : ''));
    
    // Call streamText from the AI SDK
    const result = await streamText({
      model: google('gemini-2.0-flash'),
      system: finalSystemPrompt,
      messages,
      temperature: 0.1,
      maxTokens: 1000,
    });
    
    // Return the streaming response using the toDataStreamResponse method
    return result.toDataStreamResponse();
    
  } catch (error: any) {
    console.error('Error processing chat request:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An error occurred while processing your request',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
} 
