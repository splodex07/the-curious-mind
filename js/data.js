/* ==========================================================================
   THE CURIOUS MIND — catalogue data (single source of truth)
   Add or edit books here. Everything on the page is rendered from this list.

   - coverImage: original first-page cover artwork extracted from each PDF.
   - price:      displayed catalogue price in INR.
   - filter:     must match a data-filter value in index.html.
   - theme:      "blue" or "gold" (placeholder cover colour only).
   ========================================================================== */
window.TCM = window.TCM || {};

TCM.catalog = [
  {
    id: "body",
    index: "01",
    filter: "science",
    theme: "blue",
    category: "SCIENCE & THE HUMAN BODY",
    title: "Your Body Is Hiding 100 Amazing Secrets",
    titleLines: ["YOUR BODY", "IS HIDING", "100 AMAZING", "SECRETS"],
    accentLine: 1,
    teaser: "A journey into the surprising systems, mysteries and everyday wonders of the human body.",
    description: "You live inside your body every second—but how much of it do you truly understand? From the quiet work happening inside your cells to the strange ways your senses, organs and systems keep you going, this book uncovers 100 fascinating discoveries hiding in plain sight. Each idea turns an everyday experience into a question worth exploring, then explains the science in clear, engaging language. Whether you love science or simply want to understand yourself a little better, prepare to see the human body with fresh curiosity.",
    bullets: [
      "100 surprising discoveries about the body, explained clearly",
      "Explore the hidden science behind everyday experiences",
      "For curious readers who want to understand how the body works"
    ],
    price: 99,
    coverImage: "assets/covers/your-body.jpg"
  },
  {
    id: "brain",
    index: "02",
    filter: "psychology",
    theme: "gold",
    category: "PSYCHOLOGY & THE MIND",
    title: "Your Brain Is Playing Tricks on You",
    titleLines: ["YOUR BRAIN", "IS PLAYING", "TRICKS ON YOU"],
    accentLine: 1,
    teaser: "Explore how perception, memory and mental shortcuts shape the way you experience reality.",
    description: "You trust what you see, remember and believe. But what if your brain is quietly filling gaps, editing memories and taking shortcuts without telling you? Across five connected chapters, this book follows the mind from perception to memory and decision-making, revealing how expectations, attention and mental habits can shape the reality you experience. Thought-provoking and accessible, it invites you to question your first impressions—and understand the hidden processes behind everyday thinking.",
    bullets: [
      "Five connected chapters that build one big idea",
      "Explore perception, memory, attention and mental shortcuts",
      "Question what you think you know about your own mind"
    ],
    price: 199,
    coverImage: "assets/covers/your-brain.jpg"
  },
  {
    id: "noticing",
    index: "03",
    filter: "curiosity",
    theme: "gold",
    category: "ATTENTION, PERCEPTION & CURIOSITY",
    title: "The Art of Noticing",
    titleLines: ["THE ART OF", "NOTICING"],
    accentLine: 1,
    teaser: "Discover the extraordinary details hidden in ordinary life—and learn to look at familiar things with fresh curiosity.",
    description: "The world has not run out of details. Our attention simply learns to move quickly past what feels familiar. The Art of Noticing explores how perception, expectation and memory shape what reaches our awareness—and why meaningful details can disappear in plain sight. Across five connected chapters, it moves from the limits of what we think we see, to overlooked details, the meeting of our senses, the pull of curiosity and awe, and practical ways to observe more deliberately. With thoughtful explanations and gentle observation exercises, this book invites you to slow down, ask better questions and rediscover the richness already present in everyday life.",
    bullets: [
      "Understand how attention and expectation shape what you notice",
      "Explore the overlooked details, senses, curiosity and awe in daily life",
      "Use practical observation ideas to look again without turning life into a test"
    ],
    price: 250,
    coverImage: "assets/covers/art-of-noticing.jpg"
  }
];
