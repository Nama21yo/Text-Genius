# TextGenius

**TextGeniusAI** is a cutting-edge platform designed to help you create high-quality content, whether it's for blogs, stories, or professional writing. Built with **Next.js**, **TypeScript**, **MongoDB**, and **TailwindCSS**, it delivers a smooth and intuitive user experience.

![Home Page](https://github.com/user-attachments/assets/b1ab137f-99bd-4fe1-9a25-96b4d9aead96)

---

Experience TextGeniusAI live on **Vercel**:

## [Live Demo](https://text-genius-ggfe.vercel.app/)

## Features

- **Dashboard**: A central hub to navigate and manage tools efficiently.
- **TextGenAI**: Leverage AI to generate engaging and unique content.
- **History**: Keep track of all your previously generated content.
- **Billing**: Securely manage subscriptions and payments via Stripe.
- **Settings**: Customize your user preferences and account details.
- **Membership**: Unlock premium features by joining the membership program.

---

## Tech Stack

- **Next.js**: A robust React framework optimized for modern web development.
- **TypeScript**: Ensures type safety and enhanced development experience.
- **MongoDB**: Provides a scalable and flexible NoSQL database solution.
- **TailwindCSS**: Offers a utility-first CSS framework for responsive and modern design.

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/TextGeniusAI.git
   cd TextGeniusAI
   ```
1. Install dependencies:
   ```bash
   npm install
   ```
1. Set up the .env file:
   ```env
   GEMINI_API_KEY=<your_gemini_api_key>
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
   CLERK_SECRET_KEY=<your_clerk_secret_key>
   MONGODB_URL=<your_mongodb_url>
   STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>
   STRIPE_MONTHLY_PRICE_ID=<your_stripe_monthly_price_id>
   STRIPE_WEBHOOK_SECRET=<your_stripe_webhook_secret>
   NEXT_PUBLIC_URL=<your_application_url>
   NEXT_PUBLIC_FREE_TIER_USAGE=10,000
   ```
1. Run the development serve:
   ```bash
   npm run dev
   ```
1. Open your browser and visit: http://localhost:3000
