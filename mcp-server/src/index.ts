#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// ── Resume data ──────────────────────────────────────────────
const resumeData = {
  name: "Eric Van Wagoner",
  nickname: "ericvdub",
  title: "Full-Stack Developer & Creative Builder",
  email: "eric@ericvdub.com",
  website: "https://ericvdub.com",
  tagline: "I build digital experiences and chase passions that keep me sharp.",
  available: true,

  summary:
    "Eric Van Wagoner is a passionate full-stack developer with a builder's mindset. He creates products that solve real problems and delight users. With hands-on experience spanning fintech, memorial technology, and freelance web development, Eric brings both technical depth and entrepreneurial perspective to every project.",

  experience: [
    {
      title: "Freelance Developer",
      status: "Active",
      type: "Freelance",
      description:
        "Building modern websites and web applications for entrepreneurs and small businesses. End-to-end delivery from concept to deployment.",
      tech: ["React", "Astro", "Tailwind CSS", "TypeScript", "Node.js", "Cloudflare"],
      highlights: [
        "Delivered complete web presence solutions for multiple businesses",
        "Specializes in high-performance static sites and JAMstack architecture",
        "Maintains ongoing client relationships with post-launch support",
      ],
    },
    {
      title: "Lasting Memori",
      role: "Founder / Developer",
      type: "Product",
      description:
        "A drag-and-drop headstone design tool. Think Canva, but purpose-built for memorial designs. Eric built the entire product from scratch.",
      tech: ["Canvas API", "Drag & Drop", "JavaScript", "React"],
      highlights: [
        "Designed and built the entire product independently from concept to launch",
        "Complex Canvas API implementation enabling real-time design preview",
        "Solved a genuine UX gap in the memorial industry",
      ],
    },
    {
      title: "Porch Financial",
      role: "Developer",
      type: "Fintech",
      description:
        "Built solutions for the life insurance industry — streamlined tools and interfaces that simplify complex financial products.",
      tech: ["Insurance Tech", "Web App", "Financial APIs", "React"],
      highlights: [
        "Deep domain knowledge in fintech and life insurance",
        "Built tools that measurably simplified agent workflows",
        "Delivered interfaces that made complex financial products accessible",
      ],
    },
  ],

  skills: {
    frontend: ["React", "Astro", "TypeScript", "Tailwind CSS", "HTML/CSS", "Canvas API", "Animation & Motion"],
    backend: ["Node.js", "JavaScript", "REST APIs", "Cloudflare Workers", "Edge Computing"],
    tools: ["Git", "Vite", "Figma", "Wrangler", "Claude AI / Anthropic API"],
    specialties: ["Product Development", "JAMstack Architecture", "Performance Optimization", "UI/UX Design"],
  },

  passions: [
    { name: "Motorcycles", years: 14, detail: "14+ years of riding. Reflects how Eric approaches everything — with focus and respect for craft." },
    { name: "Brazilian Jiu Jitsu", detail: "Wrestling/grappling background evolved into BJJ. Teaches creative problem-solving under pressure." },
    { name: "Building Things", detail: "Whether code, bikes, or skills — Eric loves creation and the satisfaction of shipping." },
  ],

  whyHire: [
    "Ships products, not just code — track record of concept-to-launch execution",
    "T-shaped developer with deep frontend expertise and full-stack capability",
    "Entrepreneurial mindset: thinks about users, business value, and technical solutions together",
    "Self-motivated and independent: thrives in async, remote, autonomous environments",
    "Diverse domain experience: fintech, memorial tech, freelance product work",
    "Passionate about craft: cares about performance, UX, and code quality",
  ],
};

// ── MCP Server ───────────────────────────────────────────────
const server = new Server(
  { name: "ericvdub-resume", version: "1.0.0" },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Resources
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: "resume://eric/full",
      name: "Eric Van Wagoner — Full Resume",
      description: "Complete professional profile including experience, skills, and background",
      mimeType: "application/json",
    },
    {
      uri: "resume://eric/summary",
      name: "Eric Van Wagoner — Summary",
      description: "Brief professional summary",
      mimeType: "text/plain",
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  if (uri === "resume://eric/full") {
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(resumeData, null, 2),
        },
      ],
    };
  }

  if (uri === "resume://eric/summary") {
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: `${resumeData.name} (${resumeData.nickname})\n${resumeData.title}\n\n${resumeData.summary}\n\nContact: ${resumeData.email} | ${resumeData.website}`,
        },
      ],
    };
  }

  throw new Error(`Unknown resource: ${uri}`);
});

// Tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_resume_section",
      description: "Get a specific section of Eric's resume (experience, skills, passions, why_hire, contact)",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["experience", "skills", "passions", "why_hire", "contact", "summary"],
            description: "Which section to retrieve",
          },
        },
        required: ["section"],
      },
    },
    {
      name: "search_resume",
      description: "Search Eric's resume for a keyword or topic",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search term (e.g. 'React', 'fintech', 'available')",
          },
        },
        required: ["query"],
      },
    },
    {
      name: "get_full_resume",
      description: "Get Eric's complete resume as structured JSON",
      inputSchema: {
        type: "object",
        properties: {},
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_full_resume") {
    return {
      content: [{ type: "text", text: JSON.stringify(resumeData, null, 2) }],
    };
  }

  if (name === "get_resume_section") {
    const section = (args as { section: string }).section;
    const sectionMap: Record<string, unknown> = {
      experience: resumeData.experience,
      skills: resumeData.skills,
      passions: resumeData.passions,
      why_hire: resumeData.whyHire,
      contact: { name: resumeData.name, email: resumeData.email, website: resumeData.website, available: resumeData.available },
      summary: { summary: resumeData.summary, title: resumeData.title, tagline: resumeData.tagline },
    };

    const data = sectionMap[section];
    if (!data) {
      return { content: [{ type: "text", text: `Unknown section: ${section}` }], isError: true };
    }

    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }

  if (name === "search_resume") {
    const query = ((args as { query: string }).query ?? "").toLowerCase();
    const resumeText = JSON.stringify(resumeData).toLowerCase();
    const found = resumeText.includes(query);

    if (!found) {
      return {
        content: [{ type: "text", text: `No results found for "${query}" in Eric's resume.` }],
      };
    }

    // Find matching sections
    const matches: string[] = [];

    if (JSON.stringify(resumeData.skills).toLowerCase().includes(query)) {
      matches.push(`Skills: ${JSON.stringify(resumeData.skills)}`);
    }
    resumeData.experience.forEach((exp) => {
      if (JSON.stringify(exp).toLowerCase().includes(query)) {
        matches.push(`Experience — ${exp.title}: ${JSON.stringify(exp)}`);
      }
    });
    if (JSON.stringify(resumeData.passions).toLowerCase().includes(query)) {
      matches.push(`Passions: ${JSON.stringify(resumeData.passions)}`);
    }
    if (resumeData.summary.toLowerCase().includes(query)) {
      matches.push(`Summary: ${resumeData.summary}`);
    }
    if (resumeData.whyHire.some((w) => w.toLowerCase().includes(query))) {
      matches.push(`Why Hire: ${JSON.stringify(resumeData.whyHire)}`);
    }

    return {
      content: [
        {
          type: "text",
          text: matches.length > 0 ? matches.join("\n\n---\n\n") : `Found "${query}" in resume but couldn't identify specific section.`,
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${name}`);
});

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("ericvdub-resume MCP server running on stdio");
