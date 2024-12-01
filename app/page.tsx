import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignInModal from "@/components/modal/sign-in-modal";
import PromoCard from "@/components/cards/promo-card";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("/background.png")',
          height: "60vh",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617] z-0"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            {/* Membership Banner */}
            <SignInModal />

            {/* Hero Title */}
            <h1 className="text-white text-6xl sm:text-7xl font-bold bg-gradient-to-r from-purple-400 via-blue-500 to-green-400 bg-clip-text text-transparent mb-4">
              Empower Your Words with AI
            </h1>

            {/* Hero Subtitle */}
            <p className="text-gray-300 text-lg sm:text-xl mb-5 max-w-2xl mx-auto">
              TextGenius transforms your ideas into impactful, beautifully
              written content. From professional emails to creative
              storytelling, unleash your full writing potential.
            </p>

            {/* Call to Action */}
            <Link href="/dashboard">
              <Button variant="outline" className="px-6 py-3 text-lg">
                Start Writing Today
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Why Choose TextGenius?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Built for writers, creators, and professionals who want to elevate
            their content effortlessly.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <PromoCard
              title="AI-Powered Writing"
              description="Leverage cutting-edge AI to craft error-free, engaging, and meaningful content in seconds."
              link="/features"
            />
            <PromoCard
              title="Customizable Templates"
              description="Access a growing library of templates tailored for blogs, emails, social media, and more."
              link="/templates"
            />
            <PromoCard
              title="Tone & Style Adjustments"
              description="Refine your content by choosing from formal, casual, persuasive, or creative tones."
              link="/dashboard"
            />
            <PromoCard
              title="Real-Time Collaboration"
              description="Collaborate with your team seamlessly, share drafts, and finalize content together."
              link="/dashboard"
            />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-green-400 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Writing Journey?
          </h3>
          <p className="text-lg sm:text-xl mb-8">
            Whether you're a content creator, marketer, or professional writer,
            TextGenius is your ultimate partner for excellence.
          </p>
          <Link href="/dashboard">
            <Button className="bg-black text-white px-6 py-3 text-lg hover:bg-gray-800">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
