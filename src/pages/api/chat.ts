export const prerender = false;

import type { APIRoute } from "astro";
import { chatSystemPrompt } from "../../data/resume";

interface MessageHistory {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history?: MessageHistory[];
}

interface AnthropicResponse {
  content: Array<{ type: string; text: string }>;
  error?: { message: string };
}

export const POST: APIRoute = async ({ request, locals }) => {
  // Support both Cloudflare runtime env and local .env
  const runtime = (locals as App.Locals).runtime;
  const apiKey = import.meta.env.ANTHROPIC_API_KEY || runtime?.env?.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "ANTHROPIC_API_KEY not configured. Add it to your .env file or Cloudflare environment." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: ChatRequest;
  try {
    body = (await request.json()) as ChatRequest;
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { message, history = [] } = body;

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return new Response(JSON.stringify({ error: "message field is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (message.length > 2000) {
    return new Response(JSON.stringify({ error: "Message too long (max 2000 characters)" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const messages: MessageHistory[] = [
    ...history.slice(-10).filter((m) => m.role && m.content),
    { role: "user", content: message.trim() },
  ];

  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: chatSystemPrompt,
      messages,
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    return new Response(JSON.stringify({ error: "AI service error", details: errText }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = (await anthropicRes.json()) as AnthropicResponse;
  const reply = data.content?.[0]?.text ?? "Sorry, I could not generate a response.";

  return new Response(JSON.stringify({ response: reply }), {
    headers: { "Content-Type": "application/json" },
  });
};
