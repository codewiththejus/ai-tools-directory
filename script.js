/* ============================================
   Elegir AI — script.js
   Handles: theme toggle, search, category filter,
   card rendering, news, scroll animations, navbar
   ============================================ */

// ============================================
// SECURITY — HTML Escape Utility
// ============================================
function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================
// DATA — AI Tools
// ============================================
const tools = [
  {
    id: 1,
    name: "ChatGPT",
    emoji: "🤖",
    category: "chatbot",
    description: "The world's most popular AI chatbot by OpenAI. Great for writing, brainstorming, coding help, and answering complex questions.",
    pricing: "Free / $20 per month (Plus)",
    plan: "freemium",
    credits: "Unlimited on free (GPT-3.5)",
    bestFor: "General use",
    url: "https://chat.openai.com",
    tags: ["writing", "chatbot", "coding", "brainstorm"]
  },
  {
    id: 2,
    name: "Claude",
    emoji: "✦",
    category: "chatbot",
    description: "Anthropic's thoughtful AI assistant. Excellent for long-form analysis, nuanced conversations, coding, and document summarization.",
    pricing: "Free / $20 per month (Pro)",
    plan: "freemium",
    credits: "Generous daily free usage",
    bestFor: "Analysis & writing",
    url: "https://claude.ai",
    tags: ["writing", "chatbot", "coding", "analysis"]
  },
  {
    id: 3,
    name: "GitHub Copilot",
    emoji: "💻",
    category: "coding",
    description: "AI pair programmer that suggests code completions inline inside VS Code and other IDEs. Massive productivity boost for developers.",
    pricing: "Free for students / $10 per month",
    plan: "freemium",
    credits: "Free for verified students",
    bestFor: "Developers",
    url: "https://github.com/features/copilot",
    tags: ["coding", "developer", "vscode", "programming"]
  },
  {
    id: 4,
    name: "Midjourney",
    emoji: "🎨",
    category: "image",
    description: "Leading AI image generator known for stunning artistic quality. Create breathtaking visuals from text prompts in minutes.",
    pricing: "From $10 per month",
    plan: "paid",
    credits: null,
    bestFor: "Artists & designers",
    url: "https://midjourney.com",
    tags: ["image", "art", "design", "creative", "visual"]
  },
  {
    id: 5,
    name: "Runway ML",
    emoji: "🎬",
    category: "video",
    description: "Gen-3 AI video generation and editing platform. Turn text prompts or images into cinematic video clips with high quality.",
    pricing: "Free / From $15 per month",
    plan: "freemium",
    credits: "125 free credits on signup",
    bestFor: "Video creators",
    url: "https://runwayml.com",
    tags: ["video", "creative", "film", "editing"]
  },
  {
    id: 6,
    name: "Notion AI",
    emoji: "📝",
    category: "productivity",
    description: "AI writing and organization assistant built directly into Notion. Summarize pages, generate drafts, and manage projects smarter.",
    pricing: "$8 per month (add-on)",
    plan: "paid",
    credits: null,
    bestFor: "Teams & individuals",
    url: "https://notion.so/product/ai",
    tags: ["productivity", "writing", "notes", "organization"]
  },
  {
    id: 7,
    name: "Perplexity AI",
    emoji: "🔬",
    category: "research",
    description: "AI-powered search engine that answers questions with cited sources. Perfect for research, fact-checking, and exploring topics fast.",
    pricing: "Free / $20 per month (Pro)",
    plan: "freemium",
    credits: "5 Pro searches per day free",
    bestFor: "Researchers & students",
    url: "https://perplexity.ai",
    tags: ["research", "search", "student", "studying", "facts"]
  },
  {
    id: 8,
    name: "DALL·E 3",
    emoji: "🖼",
    category: "image",
    description: "OpenAI's advanced image generation model, integrated into ChatGPT. Create detailed, accurate illustrations from natural language prompts.",
    pricing: "Free with ChatGPT Plus",
    plan: "freemium",
    credits: "Free via ChatGPT (limited)",
    bestFor: "Content creators",
    url: "https://openai.com/dall-e-3",
    tags: ["image", "art", "design", "creative", "illustration"]
  },
  {
    id: 9,
    name: "Cursor",
    emoji: "⌨",
    category: "vibecoding",
    description: "AI-first code editor built on VS Code. Chat with your codebase, get intelligent completions, and fix bugs with natural language.",
    pricing: "Free / $20 per month (Pro)",
    plan: "freemium",
    credits: "2000 free completions/month",
    bestFor: "Software developers",
    url: "https://cursor.sh",
    tags: ["coding", "developer", "programming", "vscode"]
  },
  {
    id: 10,
    name: "ElevenLabs",
    emoji: "🎙",
    category: "productivity",
    description: "Hyper-realistic AI voice generation and cloning. Used by podcasters, YouTubers, game developers, and content studios worldwide.",
    pricing: "Free / From $5 per month",
    plan: "freemium",
    credits: "10,000 free characters/month",
    bestFor: "Podcasters & creators",
    url: "https://elevenlabs.io",
    tags: ["voice", "audio", "podcast", "content", "productivity"]
  },
  {
    id: 11,
    name: "Gemini",
    emoji: "♊",
    category: "chatbot",
    description: "Google's multimodal AI assistant. Seamlessly integrated with Google Workspace for Gmail, Docs, and Sheets automation.",
    pricing: "Free / $20 per month (Advanced)",
    plan: "freemium",
    credits: "Generous free tier",
    bestFor: "Google users",
    url: "https://gemini.google.com",
    tags: ["chatbot", "google", "productivity", "multimodal"]
  },
  {
    id: 12,
    name: "Otter.ai",
    emoji: "📋",
    category: "productivity",
    description: "AI meeting transcription and notes. Automatically captures, transcribes, and summarizes meetings from Zoom, Teams, or in-person.",
    pricing: "Free / $10 per month",
    plan: "freemium",
    credits: "300 minutes/month free",
    bestFor: "Remote teams",
    url: "https://otter.ai",
    tags: ["productivity", "meetings", "transcription", "notes", "teams"]
  },
  {
    id: 13,
    name: "Stable Diffusion",
    emoji: "🌀",
    category: "image",
    description: "Open-source AI image generation model you can run locally or via APIs. Unlimited creative freedom with no usage restrictions.",
    pricing: "Free (open-source)",
    plan: "free",
    credits: "Unlimited (run locally)",
    bestFor: "Tech-savvy creators",
    url: "https://stability.ai",
    tags: ["image", "open-source", "art", "design", "free"]
  },
  {
    id: 14,
    name: "Grammarly",
    emoji: "✍",
    category: "writing",
    description: "AI-powered writing assistant that checks grammar, clarity, tone, and style. Integrates everywhere you write across the web.",
    pricing: "Free / $12 per month (Premium)",
    plan: "freemium",
    credits: "Basic features free forever",
    bestFor: "Writers & students",
    url: "https://grammarly.com",
    tags: ["writing", "grammar", "student", "editing", "productivity"]
  },
  {
    id: 15,
    name: "Sora",
    emoji: "🎥",
    category: "video",
    description: "OpenAI's groundbreaking text-to-video model capable of generating realistic, high-quality videos up to a minute long from prompts.",
    pricing: "Included in ChatGPT Plus",
    plan: "paid",
    credits: null,
    bestFor: "Filmmakers & marketers",
    url: "https://openai.com/sora",
    tags: ["video", "creative", "film", "openai"]
  },
  {
    id: 16,
    name: "Elicit",
    emoji: "📚",
    category: "research",
    description: "AI research assistant that searches academic papers and extracts key findings. Perfect for literature reviews and evidence synthesis.",
    pricing: "Free / $10 per month",
    plan: "freemium",
    credits: "1000 free credits/month",
    bestFor: "Students & academics",
    url: "https://elicit.org",
    tags: ["research", "academic", "student", "studying", "papers"]
  },
  // New AI tools
  {
    id: 17,
    name: "Claude 3.5",
    emoji: "🧠",
    category: "chatbot",
    description: "Claude 3.5 offers higher reasoning capabilities and lower latency, ideal for research and content generation.",
    pricing: "Free / $15 per month",
    plan: "freemium",
    credits: "Generous free tier",
    limit: "5,000 tokens/day",
    costPerUse: "$0.0001 per token",
    bestFor: "Research & Writing",
    url: "https://claude.ai",
    tags: ["chatbot", "research", "writing"]
  },
  {
    id: 18,
    name: "Stable Diffusion XL",
    emoji: "🌀",
    category: "image",
    description: "Stable Diffusion XL provides high‑resolution image generation with fine‑tuned control over style.",
    pricing: "Free / $12 per month",
    plan: "freemium",
    credits: null,
    limit: "Unlimited locally, API limited",
    costPerUse: "$0.0002 per image",
    bestFor: "Artists & Designers",
    url: "https://stability.ai",
    tags: ["image", "open-source", "art", "design"]
  },
  {
    id: 19,
    name: "LLaMA 2 Chat",
    emoji: "🦙",
    category: "chatbot",
    description: "Meta's LLaMA 2 Chat model excels at instruction following and code assistance.",
    pricing: "Free",
    plan: "free",
    credits: "Unlimited",
    limit: "Unlimited",
    costPerUse: "None",
    bestFor: "Developers & Researchers",
    url: "https://ai.facebook.com/llama",
    tags: ["chatbot", "coding", "research"]
  },
  {
    id: 20,
    name: "Gemini Pro",
    emoji: "♊",
    category: "chatbot",
    description: "Gemini Pro adds multimodal capabilities with higher context windows for complex tasks.",
    pricing: "Free / $20 per month",
    plan: "freemium",
    credits: "Generous free tier",
    limit: "10,000 tokens/day",
    costPerUse: "$0.00015 per token",
    bestFor: "Google Workspace automation",
    url: "https://gemini.google.com",
    tags: ["chatbot", "google", "productivity", "multimodal"]
  },
  {
    id: 21,
    name: "Whisper API",
    emoji: "🎙",
    category: "productivity",
    description: "OpenAI Whisper API provides high‑accuracy speech‑to‑text transcription.",
    pricing: "Pay‑as‑you‑go",
    plan: "paid",
    credits: null,
    limit: "120 minutes per request",
    costPerUse: "$0.006 per minute",
    bestFor: "Transcriptions & Podcasts",
    url: "https://openai.com/whisper",
    tags: ["audio", "transcription", "speech", "productivity"]
  },
  {
    id: 22,
    name: "v0.dev",
    emoji: "⚡",
    category: "vibecoding",
    description: "Generates copy-pasteable React, Tailwind CSS, and HTML code from simple UI descriptions or screenshots.",
    pricing: "Free / $20 per month",
    plan: "freemium",
    credits: "200 free credits monthly",
    bestFor: "Web developers & designers",
    url: "https://v0.dev",
    tags: ["coding", "frontend", "vercel", "react", "design"]
  },
  {
    id: 23,
    name: "Suno AI",
    emoji: "🎵",
    category: "productivity",
    description: "Create complete songs with vocals, instruments, and custom lyrics in seconds from simple text prompts.",
    pricing: "Free / $10 per month",
    plan: "freemium",
    credits: "50 free credits daily",
    bestFor: "Musicians & content creators",
    url: "https://suno.com",
    tags: ["audio", "music", "songwriting", "creative"]
  },
  {
    id: 24,
    name: "Luma Dream Machine",
    emoji: "🔮",
    category: "video",
    description: "Next-generation video generation model producing highly realistic, cinematic video clips from text or image prompts.",
    pricing: "Free / $30 per month",
    plan: "freemium",
    credits: "30 free generations monthly",
    bestFor: "Video creators & animators",
    url: "https://lumalabs.ai/dream-machine",
    tags: ["video", "animation", "rendering", "luma"]
  },
  {
    id: 25,
    name: "Phind",
    emoji: "🔍",
    category: "coding",
    description: "Intelligent search engine specifically optimized to help developers find code snippets and technical solutions instantly.",
    pricing: "Free / $20 per month",
    plan: "freemium",
    credits: "Unlimited basic searches",
    bestFor: "Developers & programmers",
    url: "https://phind.com",
    tags: ["coding", "research", "search", "developer"]
  },
  {
    id: 26,
    name: "Julius AI",
    emoji: "📊",
    category: "research",
    description: "AI data scientist that cleans, analyzes, and visualizes complex datasets, generating full graphs and code on demand.",
    pricing: "Free / $20 per month",
    plan: "freemium",
    credits: "15 free messages monthly",
    bestFor: "Data analysts & researchers",
    url: "https://julius.ai",
    tags: ["research", "data", "analysis", "python", "charts"]
  },
  {
    id: 27,
    name: "Consensus",
    emoji: "🎓",
    category: "research",
    description: "Search engine powered by AI that extracts and synthesizes evidence-based findings directly from peer-reviewed scientific papers.",
    pricing: "Free / $10 per month",
    plan: "freemium",
    credits: "Unlimited basic searches",
    bestFor: "Students & scientists",
    url: "https://consensus.app",
    tags: ["research", "academic", "search", "papers", "science"]
  },
  {
    id: 28,
    name: "Krea AI",
    emoji: "✨",
    category: "image",
    description: "Real-time AI canvas that generates images instantly as you draw or write, complete with high-quality upscaling tools.",
    pricing: "Free / $30 per month",
    plan: "freemium",
    credits: "50 free runs daily",
    bestFor: "Digital artists & designers",
    url: "https://krea.ai",
    tags: ["image", "design", "art", "real-time", "upscale"]
  },
  {
    id: 29,
    name: "Jasper AI",
    emoji: "✍",
    category: "writing",
    description: "Enterprise copywriting assistant for blog posts, social media updates, and email campaigns tailored to brand voice.",
    pricing: "From $39 per month",
    plan: "paid",
    credits: "7-day free trial",
    bestFor: "Marketing teams & copywriters",
    url: "https://jasper.ai",
    tags: ["writing", "marketing", "copywriting", "blogging"]
  },
  {
    id: 30,
    name: "Leonardo.ai",
    emoji: "🎨",
    category: "image",
    description: "High-quality image generation platform with extensive fine-tuning capabilities, prompt helper tools, and AI canvas features.",
    pricing: "Free / $10 per month",
    plan: "freemium",
    credits: "150 tokens daily",
    bestFor: "Game developers & digital artists",
    url: "https://leonardo.ai",
    tags: ["image", "art", "design", "assets", "generator"]
  },
  {
    id: 31,
    name: "Adobe Firefly",
    emoji: "🔥",
    category: "image",
    description: "Adobe's commercial-safe generative AI suite, fully integrated inside Photoshop and Illustrator for editing and textures.",
    pricing: "Free / $5 per month",
    plan: "freemium",
    credits: "25 credits monthly",
    bestFor: "Graphic designers & photo editors",
    url: "https://www.adobe.com/products/firefly.html",
    tags: ["image", "design", "photoshop", "edit", "creative"]
  },
  {
    id: 32,
    name: "Canva Magic Studio",
    emoji: "✨",
    category: "productivity",
    description: "All-in-one AI suite in Canva featuring Magic Write, background removal, template generation, and graphic conversions.",
    pricing: "Free / $15 per month",
    plan: "freemium",
    credits: "Limited free access",
    bestFor: "Social media managers & brand designers",
    url: "https://www.canva.com/magic-studio/",
    tags: ["productivity", "design", "layout", "editing", "social"]
  },
  {
    id: 33,
    name: "HeyGen",
    emoji: "👤",
    category: "video",
    description: "Create professional business videos with realistic AI avatars, lip-syncing, templates, and high-fidelity voice cloning.",
    pricing: "Free / $24 per month",
    plan: "freemium",
    credits: "1 free credit monthly",
    bestFor: "Sales teams & corporate presenters",
    url: "https://www.heygen.com",
    tags: ["video", "avatar", "translation", "business"]
  },
  {
    id: 34,
    name: "Pika Labs",
    emoji: "🎬",
    category: "video",
    description: "Text-to-video AI animation platform capable of generating cinematic 3D effects, camera movements, and video edits.",
    pricing: "Free / $8 per month",
    plan: "freemium",
    credits: "30 free credits daily",
    bestFor: "Content creators & video editors",
    url: "https://pika.art",
    tags: ["video", "creative", "animation", "prompts"]
  },
  {
    id: 35,
    name: "Synthesia",
    emoji: "🎭",
    category: "video",
    description: "Leading enterprise platform for generating instructional and marketing videos using customized photorealistic human avatars.",
    pricing: "From $22 per month",
    plan: "paid",
    credits: "No free plan",
    bestFor: "Corporate training & video localizations",
    url: "https://www.synthesia.io",
    tags: ["video", "business", "training", "avatar"]
  },
  {
    id: 36,
    name: "Hugging Face",
    emoji: "🤗",
    category: "coding",
    description: "The global hub for sharing open-source machine learning models, datasets, code spaces, and AI-powered web applications.",
    pricing: "Free / Pro paid tiers",
    plan: "free",
    credits: "Unlimited model hosting",
    bestFor: "AI developers & data scientists",
    url: "https://huggingface.co",
    tags: ["coding", "developer", "library", "platform", "source"]
  },
  {
    id: 37,
    name: "Replicate",
    emoji: "🚀",
    category: "coding",
    description: "Cloud API platform allowing developers to run, customize, and deploy popular open-source AI models with one command.",
    pricing: "Pay-as-you-go",
    plan: "paid",
    credits: "Small trial credit",
    bestFor: "Software developers & startups",
    url: "https://replicate.com",
    tags: ["coding", "platform", "serverless", "api"]
  },
  {
    id: 38,
    name: "Gamma App",
    emoji: "📐",
    category: "productivity",
    description: "AI-first presentation and document creator that automatically styles slides, web pages, and docs from markdown or prompt inputs.",
    pricing: "Free / $8 per month",
    plan: "freemium",
    credits: "400 credits on signup",
    bestFor: "Sales pitches & product showcases",
    url: "https://gamma.app",
    tags: ["productivity", "presentation", "slides", "writing"]
  },
  {
    id: 39,
    name: "DeepL Translator",
    emoji: "🌐",
    category: "productivity",
    description: "Extremely accurate neural network translator designed to read and translate documents and texts with native fluency.",
    pricing: "Free / Pro from $9/mo",
    plan: "freemium",
    credits: "Unlimited web translating",
    bestFor: "Global workers & language learners",
    url: "https://www.deepl.com",
    tags: ["productivity", "translation", "global", "writing"]
  },
  {
    id: 40,
    name: "Limitless",
    emoji: "♾",
    category: "productivity",
    description: "A personalized meetings assistant that record conversations, transcribes notes, and summarizes next steps.",
    pricing: "Free / $19 per month",
    plan: "freemium",
    credits: "10 hours monthly transcribing",
    bestFor: "Remote teams & managers",
    url: "https://www.limitless.ai",
    tags: ["productivity", "notes", "meetings", "audio"]
  },
  {
    id: 41,
    name: "Character.ai",
    emoji: "👥",
    category: "chatbot",
    description: "Interactive AI characters and virtual companions that users can chat with, customize, or build for specific utilities.",
    pricing: "Free / $10 per month (c.ai+)",
    plan: "freemium",
    credits: "Unlimited free chatting",
    bestFor: "Conversational practice & gaming",
    url: "https://character.ai",
    tags: ["chatbot", "characters", "chat", "creative"]
  },
  // ── AI Coding Spotlight Tools ──
  {
    id: 42,
    name: "Antigravity",
    emoji: "🚀",
    category: "vibecoding",
    description: "Google DeepMind's advanced agentic AI coding assistant. Tackles full engineering tasks end-to-end — from planning and writing code to debugging and deploying. Built for autonomous software development.",
    pricing: "Access via Google DeepMind",
    plan: "paid",
    credits: null,
    bestFor: "Senior engineers & enterprises",
    url: "https://deepmind.google",
    tags: ["coding", "agentic", "ai-agent", "developer", "google", "deepmind", "autonomous"]
  },
  {
    id: 43,
    name: "Lovable",
    emoji: "💖",
    category: "vibecoding",
    description: "AI-powered full-stack app builder that turns plain English descriptions into fully working React applications with Supabase backend, complete UI, and one-click deployment to the web.",
    pricing: "Free / $20 per month (Pro)",
    plan: "freemium",
    credits: "5 free projects",
    bestFor: "Founders & non-technical builders",
    url: "https://lovable.dev",
    tags: ["coding", "fullstack", "react", "no-code", "builder", "deploy", "startup"]
  },
  {
    id: 44,
    name: "Claude Code",
    emoji: "⌨️",
    category: "vibecoding",
    description: "Anthropic's agentic coding tool that lives in your terminal. Reads your entire codebase, writes multi-file changes, runs tests, and autonomously fixes bugs — all with a single natural-language command.",
    pricing: "Usage-based via Anthropic API",
    plan: "paid",
    credits: "API credits required",
    bestFor: "Professional developers",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    tags: ["coding", "agentic", "terminal", "claude", "anthropic", "developer", "autonomous"]
  },
  {
    id: 45,
    name: "Bolt.new",
    emoji: "⚡",
    category: "vibecoding",
    description: "StackBlitz's in-browser AI full-stack developer. Scaffolds, runs, edits, and deploys entire web applications from a prompt — no local setup required. Powered by WebContainers.",
    pricing: "Free / $20 per month (Pro)",
    plan: "freemium",
    credits: "Limited free daily tokens",
    bestFor: "Rapid prototyping & demos",
    url: "https://bolt.new",
    tags: ["coding", "fullstack", "builder", "browser", "deploy", "prototype", "stackblitz"]
  },
  {
    id: 46,
    name: "Windsurf",
    emoji: "🌊",
    category: "vibecoding",
    description: "Codeium's AI-native IDE with a powerful 'Cascade' agentic AI that deeply understands your codebase context, performs multi-step edits, runs commands, and collaborates like a real teammate.",
    pricing: "Free / $15 per month (Pro)",
    plan: "freemium",
    credits: "Generous free tier",
    bestFor: "Full-stack developers",
    url: "https://windsurf.com",
    tags: ["coding", "developer", "ide", "agentic", "codeium", "autocomplete", "refactor"]
  },
  {
    id: 47,
    name: "Replit AI",
    emoji: "🔄",
    category: "vibecoding",
    description: "AI coding assistant built directly into Replit's cloud IDE. Generates, explains, and debugs code in 50+ languages with an agent mode that can build entire apps from a single description.",
    pricing: "Free / $20 per month (Core)",
    plan: "freemium",
    credits: "Limited free AI usage",
    bestFor: "Students & hobby developers",
    url: "https://replit.com/ai",
    tags: ["coding", "developer", "cloud-ide", "student", "python", "javascript", "learning"]
  },
  {
    id: 48,
    name: "Codeium",
    emoji: "🟢",
    category: "coding",
    description: "Free AI code completion and chat assistant that integrates into 40+ editors. Offers blazing-fast inline completions, multi-file context, and a powerful chat to refactor or explain code.",
    pricing: "Free (individual) / Teams from $12",
    plan: "freemium",
    credits: "Unlimited for individuals",
    bestFor: "Developers wanting free Copilot alternative",
    url: "https://codeium.com",
    tags: ["coding", "developer", "autocomplete", "free", "vscode", "jetbrains", "vim"]
  },
  {
    id: 49,
    name: "Amazon Q Developer",
    emoji: "☁️",
    category: "coding",
    description: "AWS's AI coding companion for cloud developers. Provides inline code suggestions, security vulnerability scanning, unit test generation, and deep AWS service integration.",
    pricing: "Free / $19 per month (Pro)",
    plan: "freemium",
    credits: "Generous free tier",
    bestFor: "AWS & cloud developers",
    url: "https://aws.amazon.com/q/developer",
    tags: ["coding", "developer", "aws", "cloud", "security", "autocomplete", "amazon"]
  },
  {
    id: 50,
    name: "Tabnine",
    emoji: "🔵",
    category: "coding",
    description: "Privacy-first AI code completion tool with on-premise deployment options. Learns from your own codebase to provide hyper-personalized suggestions while keeping your code secure.",
    pricing: "Free / $12 per month (Pro)",
    plan: "freemium",
    credits: "Limited free completions",
    bestFor: "Enterprise teams with compliance needs",
    url: "https://www.tabnine.com",
    tags: ["coding", "developer", "privacy", "enterprise", "autocomplete", "on-premise"]
  },
  {
    id: 51,
    name: "Devin",
    emoji: "🤖",
    category: "vibecoding",
    description: "The world's first AI software engineer by Cognition AI. Devin autonomously plans and executes complex engineering tasks: writing code, fixing bugs, deploying apps, and browsing the web independently.",
    pricing: "From $500 per month",
    credits: null,
    bestFor: "Engineering teams & CTOs",
    url: "https://devin.ai",
    tags: ["coding", "agentic", "autonomous", "developer", "ai-agent", "enterprise", "cognition"]
  },
];

// ============================================
// DATA — AI News
// ============================================
const news = [
  {
    emoji: "🚀",
    tag: "Launch",
    title: "OpenAI launches GPT‑4 Turbo 2.0 with multimodal streaming",
    desc: "The new GPT‑4 Turbo 2.0 model adds real‑time video and audio processing, lower latency, and a dynamic pricing tier, expanding the possibilities for interactive AI applications.",
    date: "June 5, 2026",
    url: "https://openai.com/news/"
  },
  {
    emoji: "🧬",
    tag: "Research",
    title: "DeepMind announces AlphaFold‑4 achieving atomic‑resolution protein design",
    desc: "AlphaFold‑4 predicts protein structures and designs novel enzymes with sub‑angstrom accuracy, accelerating drug discovery pipelines.",
    date: "May 22, 2026",
    url: "https://deepmind.google/discover/"
  },
  {
    emoji: "🎨",
    tag: "Creative AI",
    title: "Stability AI releases Stable Diffusion XL‑v2 with photorealistic rendering",
    desc: "SDXL‑v2 introduces a new diffusion scheduler and higher‑resolution models, enabling artists to generate photorealistic images in seconds.",
    date: "May 12, 2026",
    url: "https://stability.ai/news"
  },
  {
    emoji: "⚖",
    tag: "Policy",
    title: "EU finalizes AI Act, enforcing transparency for high‑risk systems",
    desc: "The European Union's AI Act now requires rigorous documentation, risk assessments, and real‑time monitoring for AI models deployed in critical sectors.",
    date: "April 30, 2026",
    url: "https://artificialintelligenceact.eu/"
  },
  {
    emoji: "💡",
    tag: "Tools",
    title: "Microsoft integrates Copilot into Windows 12, enabling AI‑first desktop workflows",
    desc: "Windows 12 ships with native Copilot assistance, offering context‑aware suggestions across all apps, from code editors to design tools.",
    date: "April 18, 2026",
    url: "https://blogs.microsoft.com/"
  },
  {
    emoji: "🔬",
    tag: "Science",
    title: "AI models predict climate extremes with 90% accuracy",
    desc: "A consortium of universities deployed transformer‑based climate models that forecast heatwaves and storms a month ahead, supporting disaster preparedness.",
    date: "March 28, 2026",
    url: "https://www.nature.com/latest-news"
  }
];

// ============================================
// STATE
// ============================================
let currentCategory = "all";
let currentSearch = "";

// ============================================
// RENDER TOOLS
// ============================================
function renderTools(filtered) {
  const grid = document.getElementById("toolsGrid");
  if (!grid) return; // guard for pages without tools grid
  const noResults = document.getElementById("noResults");

  // Limit to 4 tools on the homepage
  const isHome = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '';
  if (isHome) {
    filtered = filtered.slice(0, 4);
  }

  grid.innerHTML = "";

  if (filtered.length === 0) {
    if (noResults) noResults.classList.remove("hidden");
    return;
  }
  if (noResults) noResults.classList.add("hidden");

  filtered.forEach((tool, i) => {
    const card = document.createElement("div");
    card.className = "tool-card";
    card.style.animationDelay = `${i * 0.05}s`;

    const badgeClass = {
      free: "badge-free",
      freemium: "badge-freemium",
      paid: "badge-paid"
    }[tool.plan] || "badge-freemium";

    const badgeLabel = {
      free: "Free",
      freemium: "Freemium",
      paid: "Paid"
    }[tool.plan] || "Freemium";

    card.innerHTML = `
        <div class="card-top">
          <div class="card-logo">${escapeHTML(tool.emoji)}</div>
          <div class="card-badges">
            <span class="badge ${escapeHTML(badgeClass)}">${escapeHTML(badgeLabel)}</span>
          </div>
        </div>
        <div>
          <div class="card-name" style="cursor:pointer;">${escapeHTML(tool.name)}</div>
        </div>
        <div class="card-desc">${escapeHTML(tool.description)}</div>
        <div class="card-meta">
          <div class="meta-row"><strong>Pricing:</strong> ${escapeHTML(tool.pricing)}</div>
          <div class="meta-row"><span class="best-for-tag">⚡ Best for: ${escapeHTML(tool.bestFor)}</span></div>
          ${tool.credits ? `<div class="meta-row" style="color:#34d399; font-size:0.8rem;">✦ ${escapeHTML(tool.credits)}</div>` : ''}
        </div>
        <div class="card-footer">
          <a href="${escapeHTML(tool.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit">Visit site →</a>
          <button class="btn-more-info" data-id="${escapeHTML(String(tool.id))}" style="
            padding: 7px 14px;
            border-radius: var(--radius-sm);
            background: none;
            border: 1.5px solid var(--border);
            color: var(--text-muted);
            font-family: 'DM Sans', sans-serif;
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 4px;
          ">ℹ️ More Info</button>
        </div>
    `;

    // Card name click → open modal
    card.querySelector('.card-name').addEventListener('click', () => openToolModal(tool.id));
    // More Info button click → open modal
    card.querySelector('.btn-more-info').addEventListener('click', () => openToolModal(tool.id));

    grid.appendChild(card);
  });
}

// ============================================
// RENDER NEWS
// ============================================
function renderNews() {
  const grid = document.getElementById("newsGrid");
  if (!grid) return;
  grid.innerHTML = "";

  news.forEach((item, i) => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.style.animationDelay = `${i * 0.07}s`;

    card.innerHTML = `
      <div class="news-thumb">${escapeHTML(item.emoji)}</div>
      <div class="news-body">
        <span class="news-tag">${escapeHTML(item.tag)}</span>
        <h3 class="news-title">${escapeHTML(item.title)}</h3>
        <p class="news-desc">${escapeHTML(item.desc)}</p>
        <div class="news-footer">
          <span class="news-date">${escapeHTML(item.date)}</span>
          <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" class="btn-read">Read more →</a>
        </div>
      </div>
    `;
    // Attach click listener for modal
    const readBtn = card.querySelector('.btn-read');
    readBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openNewsModal(item);
    });

    grid.appendChild(card);
  });
}



// ============================================
// FILTER LOGIC
// ============================================
function filterTools() {
  let filtered = tools;

  // Category filter
  if (currentCategory !== "all") {
    if (currentCategory === "coding") {
      filtered = filtered.filter(t => t.category === "coding" || t.category === "vibecoding");
    } else {
      filtered = filtered.filter(t => t.category === currentCategory);
    }
  }

  // Search filter
  if (currentSearch.trim() !== "") {
    const q = currentSearch.toLowerCase().trim();
    filtered = filtered.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.bestFor.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q)) ||
      t.category.includes(q)
    );
  }

  renderTools(filtered);
}

function resetSearch() {
  currentSearch = "";
  currentCategory = "all";
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.value = "";
  }
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
  const allChip = document.querySelector('.chip[data-category="all"]');
  if (allChip) {
    allChip.classList.add("active");
  }
  filterTools();
}

// ============================================
// CATEGORY CHIPS
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  // Render initial data
  renderTools(tools);
  renderNews();
  renderCodingSpotlight();

  // Initialize carousel for new tools
  initNewToolsCarousel();

  // Category chips
  const chips = document.querySelectorAll(".chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      currentCategory = chip.dataset.category;
      filterTools();

      // Scroll to tools section
      const toolsSec = document.getElementById("tools");
      if (toolsSec) toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Search input & autocomplete suggestions
  const searchWrap = document.querySelector('.search-wrap');
  const input = document.getElementById("searchInput");

  if (searchWrap && input) {
    // Create the dropdown element if it doesn't exist
    let dropdown = document.getElementById("autocompleteDropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.id = "autocompleteDropdown";
      dropdown.className = "autocomplete-dropdown";
      searchWrap.appendChild(dropdown);
    }

    let activeIndex = -1;

    // Helper function to hide dropdown
    const hideDropdown = () => {
      dropdown.style.display = "none";
      activeIndex = -1;
    };

    // Helper function to show dropdown with filtered items
    const updateSuggestions = (query) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        hideDropdown();
        return;
      }

      // Filter tools based on name, category, or tags
      const matches = tools.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      ).slice(0, 6); // limit to 6 suggestions

      if (matches.length === 0) {
        hideDropdown();
        return;
      }

      dropdown.innerHTML = matches.map((tool, idx) => `
        <div class="autocomplete-item" data-id="${tool.id}" data-index="${idx}">
          <span class="item-emoji">${tool.emoji}</span>
          <span class="item-name">${tool.name}</span>
          <span class="item-category">${tool.category}</span>
        </div>
      `).join("");

      dropdown.style.display = "block";
      activeIndex = -1;

      // Attach click events to items
      dropdown.querySelectorAll(".autocomplete-item").forEach(item => {
        item.addEventListener("click", () => {
          const toolId = parseInt(item.dataset.id);
          const selectedTool = tools.find(t => t.id === toolId);
          if (selectedTool) {
            input.value = selectedTool.name;
            currentSearch = selectedTool.name;
            filterTools();
            hideDropdown();

            const toolsSec = document.getElementById("tools");
            if (toolsSec) toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });
    };

    // Listeners for input
    input.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      filterTools();
      updateSuggestions(e.target.value);
    });

    input.addEventListener("focus", (e) => {
      updateSuggestions(e.target.value);
    });

    // Keyboard navigation
    input.addEventListener("keydown", (e) => {
      const items = dropdown.querySelectorAll(".autocomplete-item");

      if (dropdown.style.display === "block" && items.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length) items[activeIndex].classList.remove("active");
          activeIndex = (activeIndex + 1) % items.length;
          items[activeIndex].classList.add("active");
          items[activeIndex].scrollIntoView({ block: "nearest" });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length) items[activeIndex].classList.remove("active");
          activeIndex = (activeIndex - 1 + items.length) % items.length;
          items[activeIndex].classList.add("active");
          items[activeIndex].scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter") {
          if (activeIndex >= 0 && activeIndex < items.length) {
            e.preventDefault();
            items[activeIndex].click();
          } else {
            filterTools();
            hideDropdown();
          }
        } else if (e.key === "Escape") {
          hideDropdown();
        }
      } else {
        if (e.key === "Enter") {
          filterTools();
          const toolsSec = document.getElementById("tools");
          if (toolsSec) toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });

    // Close dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!searchWrap.contains(e.target)) {
        hideDropdown();
      }
    });
  }

  // Search button
  const searchBtn = document.getElementById("searchBtn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        currentSearch = searchInput.value;
        filterTools();
      }
      const toolsSec = document.getElementById("tools");
      if (toolsSec) toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Suggestion chips
  document.querySelectorAll(".suggestion-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.q;
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.value = q;
      }
      currentSearch = q;
      filterTools();
      const toolsSec = document.getElementById("tools");
      if (toolsSec) toolsSec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Mobile nav hamburger
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  // Navbar scroll behavior
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // Fade-up intersection observer
  const fadeEls = document.querySelectorAll(".fade-up");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => observer.observe(el));
});

// ============================================
// THEME TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");

// Load saved theme
const savedTheme = localStorage.getItem("elegir-theme") || localStorage.getItem("aivault-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("elegir-theme", next);
    localStorage.removeItem("aivault-theme"); // migrate old key
  });
}

// Modal handling
function openNewsModal(item) {
  const modal = document.getElementById('newsModal');
  if (!modal) return;
  const contentDiv = modal.querySelector('#newsModalContent');
  if (contentDiv) {
    contentDiv.innerHTML = `
      <h2 class="news-modal-title">${escapeHTML(item.title)} ${escapeHTML(item.emoji)}</h2>
      <p class="news-modal-date">${escapeHTML(item.date)}</p>
      <p class="news-modal-desc">${escapeHTML(item.desc)}</p>
      <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit">Read full article →</a>
    `;
  }
  modal.style.display = 'flex';
}
function closeNewsModal() {
  const modal = document.getElementById('newsModal');
  if (modal) modal.style.display = 'none';
}

function openToolModal(id) {
  const tool = tools.find(t => t.id === id);
  if (!tool) return;
  const modal = document.getElementById('toolModal');
  if (!modal) return;
  const modalContent = modal.querySelector('#toolModalContent') || modal.querySelector('.modal-content');
  if (modalContent) {
    const tagsHtml = tool.tags ? tool.tags.map(tag => `<span class="modal-tag">#${tag}</span>`).join(" ") : "";

    // Choose a realistic reset cycle details
    let resetText = tool.resetTime;
    if (!resetText) {
      if (tool.plan === 'free') {
        resetText = "Unlimited Access";
      } else if (tool.credits && tool.credits.toLowerCase().includes("daily")) {
        resetText = "Daily (24h Rolling)";
      } else if (tool.credits && tool.credits.toLowerCase().includes("monthly")) {
        resetText = "Monthly Cycle";
      } else {
        resetText = "24-hour Rolling Window";
      }
    }

    modalContent.innerHTML = `
      <div style="position:relative;">
        <button class="btn-close" onclick="closeToolModal()" style="position:absolute; top:-8px; right:-8px; background:none; border:none; font-size:1.5rem; cursor:pointer; color:var(--text-muted); padding:4px; z-index:10;">✕</button>
        
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
          <div style="width:48px; height:48px; border-radius:var(--radius-sm); border:1px solid var(--border); background:var(--bg-2); display:flex; align-items:center; justify-content:center; font-size:1.6rem;">${escapeHTML(tool.emoji)}</div>
          <div>
            <h2 style="font-family:'Sora', sans-serif; font-size:1.4rem; font-weight:700; margin:0; line-height:1.2;">${escapeHTML(tool.name)}</h2>
            <span class="badge ${tool.plan === 'free' ? 'badge-free' : tool.plan === 'paid' ? 'badge-paid' : 'badge-freemium'}" style="display:inline-block; margin-top:4px;">${escapeHTML(tool.plan.toUpperCase())}</span>
          </div>
        </div>

        <p style="color:var(--text); font-size:0.92rem; line-height:1.6; margin-bottom:20px;">${escapeHTML(tool.description)}</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; background:var(--bg-2); border:1px solid var(--border); padding:16px; border-radius:var(--radius-md);">
          <div>
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">💰 Pricing</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(tool.pricing)}</p>
          </div>
          <div>
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">⚡ Best For</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(tool.bestFor)}</p>
          </div>
          <div>
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">🎁 Free Credits</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(tool.credits || 'None / Paid Only')}</p>
          </div>
          <div>
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">⏰ Reset Time</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(resetText)}</p>
          </div>
          ${tool.limit ? `
          <div style="grid-column: span 2; border-top:1px solid var(--border); padding-top:8px; margin-top:4px;">
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">⚠️ Usage Limit</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(tool.limit)}</p>
          </div>` : ''}
          ${tool.costPerUse ? `
          <div style="grid-column: span 2; border-top:1px solid var(--border); padding-top:8px; margin-top:4px;">
            <strong style="color:var(--text-muted); font-size:0.75rem; text-transform:uppercase; letter-spacing:0.04em;">💸 Cost Per Use</strong>
            <p style="font-size:0.88rem; font-weight:600; margin-top:2px; color:var(--text);">${escapeHTML(tool.costPerUse)}</p>
          </div>` : ''}
        </div>

        <div style="margin-bottom:20px;">
          ${tagsHtml}
        </div>

        <div style="display:flex; gap:10px; border-top:1px solid var(--border); padding-top:16px;">
          <a href="${escapeHTML(tool.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit" style="flex:1; text-align:center; justify-content:center; margin:0;">Visit Site →</a>
          <button class="btn-outline" onclick="closeToolModal()" style="margin:0; padding:8px 20px;">Close</button>
        </div>
      </div>
    `;
  }
  modal.style.display = 'flex';
}
function closeToolModal() {
  const modal = document.getElementById('toolModal');
  if (modal) modal.style.display = 'none';
}

// ============================================
// RENDER CODING SPOTLIGHT SECTION
// ============================================
function renderCodingSpotlight() {
  const grid = document.getElementById('codingSpotlightGrid');
  if (!grid) return;

  const customOrder = ["Antigravity", "Claude Code", "Lovable", "Bolt.new", "Devin", "Cursor", "Windsurf", "v0.dev", "Replit AI"];
  const spotlightTools = tools.filter(t => t.category === 'vibecoding')
    .sort((a, b) => {
      const idxA = customOrder.indexOf(a.name);
      const idxB = customOrder.indexOf(b.name);
      if (idxA === -1 && idxB === -1) return 0;
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

  grid.innerHTML = '';
  spotlightTools.forEach((tool, i) => {
    const card = document.createElement('div');
    card.className = 'tool-card coding-spotlight-card';
    card.style.animationDelay = `${i * 0.06}s`;
    const badgeClass = { free: 'badge-free', freemium: 'badge-freemium', paid: 'badge-paid' }[tool.plan] || 'badge-freemium';
    const badgeLabel = { free: 'Free', freemium: 'Freemium', paid: 'Paid' }[tool.plan] || 'Freemium';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-logo">${escapeHTML(tool.emoji)}</div>
        <div class="card-badges"><span class="badge ${escapeHTML(badgeClass)}">${escapeHTML(badgeLabel)}</span></div>
      </div>
      <div>
        <div class="card-name" style="cursor:pointer;">${escapeHTML(tool.name)}</div>
      </div>
      <div class="card-desc">${escapeHTML(tool.description)}</div>
      <div class="card-meta">
        <div class="meta-row"><strong>Pricing:</strong> ${escapeHTML(tool.pricing)}</div>
        <div class="meta-row"><span class="best-for-tag">⚡ Best for: ${escapeHTML(tool.bestFor)}</span></div>
        ${tool.credits ? `<div class="meta-row" style="color:#34d399; font-size:0.8rem;">✦ ${escapeHTML(tool.credits)}</div>` : ''}
      </div>
      <div class="card-footer">
        <a href="${escapeHTML(tool.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit">Visit site →</a>
        <button class="btn-more-info" data-id="${escapeHTML(String(tool.id))}" style="padding:7px 14px; border-radius:var(--radius-sm); background:none; border:1.5px solid var(--border); color:var(--text-muted); font-family:'DM Sans',sans-serif; font-size:0.8rem; font-weight:500; cursor:pointer; transition:all 0.2s ease; display:flex; align-items:center; gap:4px;">ℹ️ More Info</button>
      </div>`;
    card.querySelector('.card-name').addEventListener('click', () => openToolModal(tool.id));
    card.querySelector('.btn-more-info').addEventListener('click', () => openToolModal(tool.id));
    grid.appendChild(card);
  });
}

// Carousel init (simple scroll‑snap)
function initNewToolsCarousel() {
  const carousel = document.getElementById('newToolsCarousel');
  if (!carousel) return;
  const newTools = tools.filter(t => t.id >= 17 && t.id <= 21);
  const container = carousel.querySelector('.carousel-inner');
  if (!container) return;
  container.innerHTML = '';
  newTools.forEach(t => {
    const card = document.createElement('div');
    card.className = 'tool-card';
    card.innerHTML = `
      <div class="card-top">
        <div class="card-logo">${escapeHTML(t.emoji)}</div>
        <div class="card-badges"><span class="badge ${t.plan === 'free' ? 'badge-free' : t.plan === 'paid' ? 'badge-paid' : 'badge-freemium'}">${escapeHTML(t.plan.charAt(0).toUpperCase() + t.plan.slice(1))}</span></div>
      </div>
      <div class="card-name">${escapeHTML(t.name)}</div>
      <div class="card-desc">${escapeHTML(t.description)}</div>
      <div class="card-footer"><a href="${escapeHTML(t.url)}" target="_blank" rel="noopener noreferrer" class="btn-visit">Visit →</a></div>`;
    container.appendChild(card);
  });
}

// Match Modal logic
const matchBtn = document.getElementById('matchBtn');
if (matchBtn) {
  matchBtn.addEventListener('click', openMatchModal);
}
function openMatchModal() {
  const modal = document.getElementById('matchModal');
  if (modal) modal.style.display = 'flex';
}
function closeMatchModal() {
  const modal = document.getElementById('matchModal');
  if (modal) modal.style.display = 'none';
}
function openMatchResultsModal(matches) {
  // matchResultsModal is not present in the HTML – show results in the existing toolsGrid instead
  closeMatchModal();
  currentSearch = '';
  currentCategory = 'all';
  renderTools(matches);
  const toolsSec = document.getElementById('tools');
  if (toolsSec) toolsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function closeMatchResultsModal() { /* no-op: modal removed */ }
const matchForm = document.getElementById('matchForm');
if (matchForm) {
  matchForm.addEventListener('submit', e => {
    e.preventDefault();
    const q1 = document.getElementById('q1').value;
    const q2 = document.getElementById('q2').value;
    const q3 = document.getElementById('q3').value;
    // Simple filtering based on use case and budget
    const filtered = tools.filter(t => {
      const catMatch = q1 === 'coding' ? t.category === 'vibecoding' : true;
      const planMatch = q2 === 'free' ? t.plan === 'free' : true;
      return catMatch && planMatch;
    });
    closeMatchModal();
    openMatchResultsModal(filtered);
  });
}