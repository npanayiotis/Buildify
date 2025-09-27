import React, { useState, useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";
import Lazy3DCanvas from "../../components/Templates/Lazy3DCanvas";
import {
  OptimizedSphere,
  OptimizedBox,
  OptimizedOrbitControls,
} from "../../components/Templates/Performance3DComponents";

const PersonalBlogTemplate = React.memo(
  ({ customization: externalCustomization = {} }) => {
    const [customization, setCustomization] = useState({
      // Branding
      primaryColor: externalCustomization.primaryColor || "#EC4899",
      secondaryColor: externalCustomization.secondaryColor || "#BE185D",
      accentColor: externalCustomization.accentColor || "#F59E0B",
      textColor: externalCustomization.textColor || "#1F2937",
      backgroundColor: externalCustomization.backgroundColor || "#FFFFFF",

      // Content
      blogName:
        externalCustomization.blogName ||
        externalCustomization.siteName ||
        "My Personal Blog",
      tagline:
        externalCustomization.tagline || "Thoughts, Stories & Adventures",
      description:
        externalCustomization.description ||
        externalCustomization.heroSubtitle ||
        "Welcome to my personal space where I share my thoughts, experiences, and adventures from around the world.",
      heroImage: externalCustomization.heroImage || "",

      // Recent Posts
      post1: externalCustomization.post1 || "My Journey to Digital Nomadism",
      post1Date: externalCustomization.post1Date || "March 15, 2023",
      post1Excerpt:
        externalCustomization.post1Excerpt ||
        "How I transitioned from a traditional 9-5 job to becoming a digital nomad and the lessons I learned along the way.",
      post2: externalCustomization.post2 || "10 Books That Changed My Life",
      post2Date: externalCustomization.post2Date || "March 10, 2023",
      post2Excerpt:
        externalCustomization.post2Excerpt ||
        "A curated list of books that have had a profound impact on my personal and professional growth.",
      post3:
        externalCustomization.post3 || "Travel Photography Tips for Beginners",
      post3Date: externalCustomization.post3Date || "March 5, 2023",
      post3Excerpt:
        externalCustomization.post3Excerpt ||
        "Essential tips and techniques for capturing stunning travel photos, even with just your smartphone.",
      post4: externalCustomization.post4 || "Sustainable Travel Guide",
      post4Date: externalCustomization.post4Date || "February 28, 2023",
      post4Excerpt:
        externalCustomization.post4Excerpt ||
        "How to travel responsibly and make a positive impact on the places you visit...",
      post5: externalCustomization.post5 || "Remote Work Productivity Tips",
      post5Date: externalCustomization.post5Date || "February 20, 2023",
      post5Excerpt:
        externalCustomization.post5Excerpt ||
        "Staying productive while working from anywhere in the world...",
      post6: externalCustomization.post6 || "Mindfulness in Daily Life",
      post6Date: externalCustomization.post6Date || "February 15, 2023",
      post6Excerpt:
        externalCustomization.post6Excerpt ||
        "Simple practices to bring mindfulness into your everyday routine...",

      // About
      aboutTitle: externalCustomization.aboutTitle || "About Me",
      aboutContent:
        externalCustomization.aboutContent ||
        "I'm a passionate writer, traveler, and digital nomad who loves sharing stories and experiences. When I'm not writing, you can find me exploring new cities, reading books, or experimenting with photography.",

      // Author Details
      authorName: externalCustomization.authorName || "Alex Johnson",
      authorBio:
        externalCustomization.authorBio ||
        "Digital nomad, photographer, and mindfulness enthusiast sharing life experiences and insights.",
      authorImage: externalCustomization.authorImage || "",
      authorLocation:
        externalCustomization.authorLocation || "Currently in Bali, Indonesia",
      authorInterests: externalCustomization.authorInterests || [
        "Travel",
        "Photography",
        "Mindfulness",
        "Technology",
        "Sustainability",
      ],

      // Blog Categories
      categories: externalCustomization.categories || [
        "Travel",
        "Lifestyle",
        "Photography",
        "Mindfulness",
        "Technology",
        "Personal Growth",
      ],

      // Testimonials
      testimonial1:
        externalCustomization.testimonial1 ||
        "Your blog has inspired me to start my own digital nomad journey. Thank you!",
      testimonial1Author:
        externalCustomization.testimonial1Author || "Sarah M., Reader",
      testimonial2:
        externalCustomization.testimonial2 ||
        "The photography tips were incredibly helpful. My photos have improved so much!",
      testimonial2Author:
        externalCustomization.testimonial2Author ||
        "Mike R., Photography Enthusiast",
      testimonial3:
        externalCustomization.testimonial3 ||
        "Your mindfulness posts have helped me find peace in my daily life.",
      testimonial3Author:
        externalCustomization.testimonial3Author || "Elena K., Regular Reader",

      // Contact
      email: "hello@mypersonalblog.com",
      social: {
        twitter: "https://twitter.com/mypersonalblog",
        instagram: "https://instagram.com/mypersonalblog",
        linkedin: "https://linkedin.com/in/mypersonalblog",
      },
    });

    const handleChange = (key, value) => {
      setCustomization((prev) => ({ ...prev, [key]: value }));
    };

    // 3D Blog Elements
    const BlogSphere = () => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      });

      return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
              color="#EC4899"
              attach="material"
              distort={0.2}
              speed={1.5}
              roughness={0}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      );
    };

    // Floating Blog Elements
    const BlogElement = ({ position, color, shape = "sphere" }) => {
      const meshRef = useRef();
      useFrame((state) => {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      });

      return (
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
          {shape === "sphere" ? (
            <Sphere ref={meshRef} position={position} args={[0.3, 32, 32]}>
              <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
              />
            </Sphere>
          ) : (
            <Box ref={meshRef} position={position} args={[0.4, 0.4, 0.4]}>
              <meshStandardMaterial
                color={color}
                metalness={0.8}
                roughness={0.2}
              />
            </Box>
          )}
        </Float>
      );
    };

    return (
      <div
        className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50"
        style={{ backgroundColor: customization.backgroundColor }}
      >
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  ✍️
                </div>
                <span
                  className="ml-3 text-xl font-bold"
                  style={{ color: customization.textColor }}
                >
                  {customization.blogName}
                </span>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#home" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
                <a href="#posts" className="text-gray-600 hover:text-gray-900">
                  Posts
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About
                </a>
                <a
                  href="#contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact
                </a>
              </nav>
              <button
                className="px-4 py-2 rounded-lg text-white font-medium"
                style={{ backgroundColor: customization.primaryColor }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="home"
          className="py-20"
          style={{ backgroundColor: customization.backgroundColor }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1
                className="text-5xl font-bold mb-6"
                style={{ color: customization.textColor }}
              >
                {customization.tagline}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                {customization.description}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="px-8 py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Read Latest Posts
                </button>
                <button
                  className="px-8 py-3 rounded-lg border-2 font-medium"
                  style={{
                    borderColor: customization.primaryColor,
                    color: customization.primaryColor,
                  }}
                >
                  Subscribe to Newsletter
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Posts Section */}
        <section id="posts" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Recent Posts
              </h2>
              <p className="text-xl text-gray-600">
                My latest thoughts and experiences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {customization.post1Date}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.post1}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.post1Excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium"
                    style={{ color: customization.primaryColor }}
                  >
                    Read More →
                  </a>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {customization.post2Date}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.post2}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.post2Excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium"
                    style={{ color: customization.primaryColor }}
                  >
                    Read More →
                  </a>
                </div>
              </article>

              <article className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Featured Image</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="text-sm text-gray-500">
                      {customization.post3Date}
                    </span>
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{ color: customization.textColor }}
                  >
                    {customization.post3}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {customization.post3Excerpt}
                  </p>
                  <a
                    href="#"
                    className="text-sm font-medium"
                    style={{ color: customization.primaryColor }}
                  >
                    Read More →
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{ color: customization.textColor }}
                >
                  {customization.aboutTitle}
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  {customization.aboutContent}
                </p>
                <div className="flex space-x-6">
                  <a
                    href={customization.social.twitter}
                    className="text-gray-600 hover:text-blue-400"
                  >
                    Twitter
                  </a>
                  <a
                    href={customization.social.instagram}
                    className="text-gray-600 hover:text-pink-600"
                  >
                    Instagram
                  </a>
                  <a
                    href={customization.social.linkedin}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                <span className="text-gray-400 text-lg">Author Photo</span>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: customization.textColor }}
            >
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to my newsletter for the latest posts and updates
            </p>
            <form className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-r-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{ color: customization.textColor }}
              >
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600">
                I&apos;d love to hear from you
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  rows="4"
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <button
                  type="submit"
                  className="w-full px-6 py-3 rounded-lg text-white font-medium"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  Send Message
                </button>
              </form>
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Email:{" "}
                  <a
                    href={`mailto:${customization.email}`}
                    className="text-blue-600"
                  >
                    {customization.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: customization.primaryColor }}
                >
                  ✍️
                </div>
                <span className="ml-3 text-xl font-bold">
                  {customization.blogName}
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Thoughts, stories, and adventures from around the world.
              </p>
              <div className="flex justify-center space-x-6">
                <a
                  href={customization.social.twitter}
                  className="text-gray-400 hover:text-white"
                >
                  Twitter
                </a>
                <a
                  href={customization.social.instagram}
                  className="text-gray-400 hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href={customization.social.linkedin}
                  className="text-gray-400 hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-6">
                © 2023 {customization.blogName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
);

PersonalBlogTemplate.displayName = "PersonalBlogTemplate";

export default PersonalBlogTemplate;
