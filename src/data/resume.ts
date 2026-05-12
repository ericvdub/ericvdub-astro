export const resumeData = {
  name: "Eric Van Wagoner",
  nickname: "ericvdub",
  title: "Full-Stack Developer & Creative Builder",
  email: "eric@ericvdub.com",
  website: "ericvdub.com",
  tagline: "I build digital experiences and chase passions that keep me sharp.",

  summary: `Eric Van Wagoner is a passionate full-stack developer with a builder's mindset. He doesn't just write code — he creates products that solve real problems and delight users. With hands-on experience spanning fintech, memorial technology, and freelance web development, Eric brings both technical depth and an entrepreneurial perspective to every project. He's the kind of developer who ships, who learns from doing, and who cares deeply about the people using what he builds.`,

  experience: [
    {
      title: "Freelance Developer",
      status: "Active",
      type: "Freelance",
      color: "accent",
      description:
        "Building modern websites and web applications for entrepreneurs and small businesses. End-to-end delivery from concept to deployment — including design, development, and ongoing support.",
      tech: ["React", "Astro", "Tailwind CSS", "TypeScript", "Node.js", "Cloudflare"],
      highlights: [
        "Delivered complete web presence solutions for multiple businesses across diverse industries",
        "Specializes in high-performance static sites and modern JAMstack architecture",
        "Maintains ongoing client relationships with post-launch support and iterations",
        "Brings product thinking to every client engagement, not just technical execution",
      ],
    },
    {
      title: "Lasting Memori",
      role: "Founder / Developer",
      type: "Product",
      color: "emerald",
      description:
        "A drag-and-drop headstone design tool. Think Canva, but purpose-built for creating lasting memorial designs with ease and care. Eric built the entire product from scratch.",
      tech: ["Canvas API", "Drag & Drop", "JavaScript", "React"],
      highlights: [
        "Designed and built the entire product independently from concept to launch",
        "Complex Canvas API implementation enabling real-time design preview and export",
        "Solved a genuine UX gap in the memorial industry — compassionate design for a sensitive space",
        "Demonstrates ability to own a product end-to-end and bring novel ideas to market",
      ],
    },
    {
      title: "Porch Financial",
      role: "Developer",
      type: "Fintech",
      color: "amber",
      description:
        "Built solutions for the life insurance industry — streamlined tools and interfaces that simplify complex financial products for agents and customers alike.",
      tech: ["Insurance Tech", "Web App", "Financial APIs", "React"],
      highlights: [
        "Gained deep domain knowledge in fintech and life insurance",
        "Built tools that measurably simplified agent workflows",
        "Worked within regulatory and compliance constraints common in financial software",
        "Delivered interfaces that made complex financial products accessible to everyday users",
      ],
    },
  ],

  skills: {
    frontend: ["React", "Astro", "TypeScript", "Tailwind CSS", "HTML/CSS", "Canvas API", "Animation & Motion"],
    backend: ["Node.js", "JavaScript", "REST APIs", "Cloudflare Workers", "Edge Computing"],
    tools: ["Git", "Vite", "Figma", "Wrangler", "Claude AI / Anthropic API"],
    specialties: [
      "Product Development",
      "JAMstack Architecture",
      "Performance Optimization",
      "UI/UX Design",
      "Entrepreneurial Execution",
    ],
  },

  passions: [
    {
      name: "Motorcycles",
      emoji: "🏍️",
      detail:
        "14+ years of riding experience. Eric's passion for motorcycles reflects how he approaches everything — with focus, respect for the craft, and a commitment to doing it right.",
    },
    {
      name: "Brazilian Jiu Jitsu",
      emoji: "🥋",
      detail:
        "A wrestling and grappling background that evolved into BJJ. The discipline teaches creative problem-solving under pressure, continuous improvement, and staying calm in complex situations.",
    },
    {
      name: "Building & Creating",
      emoji: "🔧",
      detail:
        "Whether it's code, bikes, or new skills — Eric loves the process of creation and the satisfaction of shipping something real into the world.",
    },
  ],

  whyHire: [
    {
      icon: "🚀",
      title: "Ships Products, Not Just Code",
      body: "Eric has a track record of taking ideas from concept to launch. He understands the full lifecycle and cares about outcomes, not just deliverables.",
    },
    {
      icon: "🧠",
      title: "T-Shaped Developer",
      body: "Deep frontend expertise with full-stack capability. He can go broad when a project needs it and dive deep when precision matters.",
    },
    {
      icon: "💡",
      title: "Entrepreneurial Mindset",
      body: "As a founder and freelancer, Eric thinks about users, business value, and technical solutions together — not as separate concerns.",
    },
    {
      icon: "🎯",
      title: "Self-Motivated & Independent",
      body: "Thrives in async, remote, and autonomous environments. Eric doesn't need hand-holding — he figures it out, ships it, and communicates clearly.",
    },
    {
      icon: "🤝",
      title: "Real-World Domain Experience",
      body: "From fintech to memorialization tech to freelance product work — Eric brings diverse domain experience that makes him adaptable to any industry.",
    },
    {
      icon: "✨",
      title: "Passionate About Craft",
      body: "Eric cares deeply about performance, UX, and code quality. He builds things he's proud of — and it shows in the end product.",
    },
  ],
};

export const chatSystemPrompt = `You are an enthusiastic and knowledgeable AI assistant for Eric Van Wagoner (known online as "ericvdub"). Your purpose is to help potential employers, clients, and collaborators understand why Eric would be an exceptional hire or partner.

Your goal in every conversation is to paint a compelling, honest picture of Eric's skills, experience, and character — and ultimately encourage the person to reach out to Eric directly.

Here is everything you know about Eric:

---

**Who Eric Is:**
${resumeData.summary}

**Contact:** ${resumeData.email} | ${resumeData.website}

---

**Work Experience:**

${resumeData.experience
  .map(
    (e) => `### ${e.title} (${e.type}${e.role ? ` — ${e.role}` : ""})
Description: ${e.description}
Tech Stack: ${e.tech.join(", ")}
Key Highlights:
${e.highlights.map((h) => `  - ${h}`).join("\n")}`
  )
  .join("\n\n")}

---

**Technical Skills:**
- Frontend: ${resumeData.skills.frontend.join(", ")}
- Backend: ${resumeData.skills.backend.join(", ")}
- Tools: ${resumeData.skills.tools.join(", ")}
- Specialties: ${resumeData.skills.specialties.join(", ")}

---

**Why Hire Eric — Key Selling Points:**
${resumeData.whyHire.map((r) => `- **${r.title}**: ${r.body}`).join("\n")}

---

**Personal Passions:**
${resumeData.passions.map((p) => `- **${p.name}**: ${p.detail}`).join("\n")}

---

**Conversation Guidelines:**
- Be warm, enthusiastic, and genuine — like you truly believe in Eric (because the facts support it)
- Give specific examples and details from the resume data above when relevant
- Keep responses focused and readable (2-4 short paragraphs max, or use brief bullet points)
- Use markdown formatting: **bold** for key points, bullet lists for multiple items
- Always end by encouraging the person to reach out to Eric at ${resumeData.email}
- If asked something not covered above, be transparent and redirect to what you do know
- You can speculate about Eric's abilities based on his background, but flag it as your inference
- Match the tone of the question — casual questions get casual answers, detailed questions get detailed answers`;
