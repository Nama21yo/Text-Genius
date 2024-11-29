export default [
  {
    name: "AI Resume Assistant",
    desc: "Craft a professional and tailored resume based on your career details.",
    category: "Career",
    icon: "https://cdn-icons-png.flaticon.com/128/1019/1019960.png",
    slug: "ai-resume-assistant",
    aiPrompt:
      "Generate a professional resume based on the following career details: ",
    form: [
      {
        label: "Enter your career details and achievements",
        field: "textarea",
        name: "careerDetails",
        required: true,
      },
    ],
  },
  {
    name: "Blog Ideas",
    desc: "An AI tool that generates blog ideas based on the topic you provide.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4186/4186534.png",
    aiPrompt: "Give me 5 blog topic ideas in bullet points for: ",
    slug: "ai-blog-title",
    form: [
      {
        label: "Enter your blog topic",
        field: "input",
        name: "niche",
        required: true,
      },
    ],
  },
  {
    name: "Blog Content",
    desc: "An AI tool that serves as your personal blog writer, generating high-quality SEO-ready blog posts in seconds.",
    category: "Blog",
    icon: "https://cdn-icons-png.flaticon.com/128/4905/4905454.png",
    slug: "ai-blog-content",
    aiPrompt: "Generate Blog Content for the title: ",
    form: [
      {
        label: "Enter your blog title",
        field: "input",
        name: "topic",
        required: true,
      },
    ],
  },
  {
    name: "Fitness Plan Generator",
    desc: "An AI tool to create personalized fitness plans based on your fitness goals and preferences.",
    category: "Fitness",
    icon: "https://cdn-icons-png.flaticon.com/128/4101/4101278.png",
    slug: "ai-fitness-plan-generator",
    aiPrompt:
      "Create a customized weekly fitness plan for the following goals and preferences: ",
    form: [
      {
        label: "Enter your fitness goals and preferences",
        field: "textarea",
        name: "fitnessDetails",
        required: true,
      },
    ],
  },
  {
    name: "Event Invitation Generator",
    desc: "Generate beautiful and creative invitation messages for any event.",
    category: "Events",
    icon: "https://cdn-icons-png.flaticon.com/128/481/481620.png",
    slug: "ai-event-invitation",
    aiPrompt:
      "Create an elegant invitation message for the following event details: ",
    form: [
      {
        label: "Enter event details (name, date, time, location)",
        field: "textarea",
        name: "eventDetails",
        required: true,
      },
    ],
  },

  {
    name: "Social Media Content Planner",
    desc: "Plan your social media content with tailored posts and ideas from this AI tool.",
    category: "Social Media",
    icon: "https://cdn-icons-png.flaticon.com/128/1344/1344893.png",
    slug: "ai-social-media-planner",
    aiPrompt:
      "Create a week-long social media content plan based on the following theme: ",
    form: [
      {
        label: "Enter your theme or topic",
        field: "input",
        name: "theme",
        required: true,
      },
    ],
  },
  {
    name: "Travel Itinerary Planner",
    desc: "Generate a perfect travel itinerary based on your preferences and destination.",
    category: "Travel",
    icon: "https://cdn-icons-png.flaticon.com/128/813/813495.png",
    slug: "ai-travel-itinerary",
    aiPrompt:
      "Plan a 7-day travel itinerary for the destination and preferences: ",
    form: [
      {
        label: "Enter your destination and preferences",
        field: "textarea",
        name: "travelDetails",
        required: true,
      },
    ],
  },
  {
    name: "AI Poem Writer",
    desc: "Write beautiful and creative poems tailored to any theme or occasion.",
    category: "Creative Writing",
    icon: "https://cdn-icons-png.flaticon.com/128/3407/3407695.png",
    slug: "ai-poem-writer",
    aiPrompt: "Write a creative and meaningful poem for: ",
    form: [
      {
        label: "Enter your theme or occasion",
        field: "input",
        name: "poemTheme",
        required: true,
      },
    ],
  },
  {
    name: "AI Recipe Improver",
    desc: "Enhance your existing recipes with new ideas, substitutions, and flavors.",
    category: "Food",
    icon: "https://cdn-icons-png.flaticon.com/128/706/706164.png",
    slug: "ai-recipe-improver",
    aiPrompt:
      "Suggest ways to improve this recipe for better flavor and presentation: ",
    form: [
      {
        label: "Enter your recipe details",
        field: "textarea",
        name: "recipeDetails",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Hash Tag Generator",
    desc: "An AI tool that serves as your personal blog post title writer, generating catchy and viral-worthy titles in your chosen language.",
    icon: "https://cdn-icons-png.flaticon.com/128/7045/7045432.png",
    category: "blog",

    slug: "ai-instagram-hash-tag-generator",
    aiPrompt:
      "Generate 15 Instagram hash tag depends on a given keywords and give output in  in rich text editor format",
    form: [
      {
        label: "Enter Keywords for your instagram hastag",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "Instagram Post/Reel Idea",
    desc: "An AI tool that generate New and trending instagram idea depends on your niche",
    icon: "https://cdn-icons-png.flaticon.com/128/1029/1029183.png",
    category: "instagram",

    slug: "ai-instagram-post-idea-generator",
    aiPrompt:
      "Generate 5-10 Instagram idea depends on niche with latest trend and give output in  in rich text editor format",
    form: [
      {
        label: "Enter Keywords / Niche for your instagram idea",
        field: "input",
        name: "keywords",
        required: true,
      },
    ],
  },
  {
    name: "English Grammer Check",
    desc: "AI Model to Correct your english grammer by providing the text",
    icon: "https://cdn-icons-png.flaticon.com/128/12596/12596700.png",
    category: "english",

    slug: "ai-english-grammer-checker",
    aiPrompt:
      "Rewrite the inputText by correcting the grammer and give output in  in rich text editor format",
    form: [
      {
        label: "Enter text to correct the grammer",
        field: "input",
        name: "inputText",
        required: true,
      },
    ],
  },
  {
    name: "Write Code",
    desc: "AI Model to generate programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/6062/6062646.png",
    category: "Coding",

    slug: "ai-write-code",
    aiPrompt:
      "Depends on user codeDescription write a code and give output in  in rich text editor format in code block ",
    form: [
      {
        label:
          "Enter description of code you want along with Programming Language",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Explain Code",
    desc: "AI Model to explain programming code in any language",
    icon: "https://cdn-icons-png.flaticon.com/128/8488/8488751.png",
    category: "Coding",

    slug: "ai-explain-code",
    aiPrompt:
      "Depends on user codeDescription explain code line by line and give output in  in rich text editor format in code block ",
    form: [
      {
        label: "Enter code which you want to understand",
        field: "textarea",
        name: "codeDesscripton",
        required: true,
      },
    ],
  },
  {
    name: "Code Bug Detector",
    desc: "This tool analyzes your input, like error messages and code snippets, to pinpoint and fix bugs, offering detailed solutions and alternatives in a straightforward, user-friendly way.",
    icon: "https://cdn-icons-png.flaticon.com/128/4426/4426267.png",
    category: "code-bug-detector",

    slug: "ai-code-bug-detector",
    aiPrompt:
      "Depends on user codeInput find bug in code and give solution and give output in  in rich text editor format in code block ",
    form: [
      {
        label: "Enter code which you want to test bug",
        field: "textarea",
        name: "codeInput",
        required: true,
      },
    ],
  },
  {
    name: "Tagline Generator",
    desc: "Struggling to find the perfect tagline for your brand? Let our AI-tool assist you in creating a tagline that stands out.",
    icon: "https://cdn-icons-png.flaticon.com/128/2178/2178616.png",
    category: "Marketting",

    slug: "ai-tagline-generator",
    aiPrompt:
      "Depends on user productName and outline generate catchy 5-10 tagline for the business product and give output  in rich text editor format ",
    form: [
      {
        label: "Product/Brand Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "What you are selling / Marketting",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
  {
    name: "Product Description",
    desc: "This is your AI-powered SEO expert, creating captivating and keyword-rich e-commerce product descriptions to boost your online sales.",
    icon: "https://cdn-icons-png.flaticon.com/128/679/679922.png",
    category: "Marketting",

    slug: "ai-product-description",
    aiPrompt:
      "Depends on user productName and description generate small description for product for e-commer business give output  in rich text editor format  ",
    form: [
      {
        label: "Product Name",
        field: "input",
        name: "productName",
        required: true,
      },
      {
        label: "Product Details",
        field: "textarea",
        name: "outline",
        required: true,
      },
    ],
  },
];
