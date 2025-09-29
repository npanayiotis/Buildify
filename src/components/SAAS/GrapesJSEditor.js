import React, { useRef, useState, useEffect, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage";
import "grapesjs-blocks-basic";
import "grapesjs-plugin-forms";
import "grapesjs-component-countdown";
import "grapesjs-plugin-export";
import CustomizationPanel from "./CustomizationPanel";

const GrapesJSEditor = ({
  templateData,
  onSave,
  onPublish,
  onTemplateChange,
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(templateData);

  // Generate website HTML with enhanced structure
  const generateWebsiteHTML = useCallback((website) => {
    console.log("Generating website HTML for:", website.name);

    const content = website.fullWebsite || website.components;

    switch (website.category) {
      case "blog":
        return `
          <div class="website-container" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <!-- Navigation -->
            <nav style="background: white; padding: 1rem 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100;">
              <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px; display: flex; justify-content: space-between; align-items: center;">
                <div class="editable-text" data-type="logo" style="font-size: 1.5rem; font-weight: bold; color: #2d3748;">My Blog</div>
                <div style="display: flex; gap: 2rem; align-items: center;">
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Home</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">About</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Blog</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Categories</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Archive</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Search</a>
                  <a href="#" class="editable-text" data-type="nav-link" style="color: #4a5568; text-decoration: none; font-weight: 500; transition: color 0.3s;">Contact</a>
                </div>
              </div>
            </nav>

            <!-- Hero Section -->
            <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 20px; text-align: center; color: white; position: relative; min-height: 60vh; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
                <h1 class="editable-text" data-type="heading" style="font-size: 4rem; font-weight: bold; margin-bottom: 2rem; line-height: 1.2;">${
                  content.hero?.title || "Welcome to My Blog"
                }</h1>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.4rem; margin-bottom: 3rem; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6;">${
                  content.hero?.subtitle ||
                  "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way."
                }</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <button class="editable-button" data-type="button" style="background: #ff6b6b; color: white; border: none; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">${
                    content.hero?.buttonText || "Read Latest Posts"
                  }</button>
                  <button class="editable-button" data-type="button" style="background: transparent; color: white; border: 2px solid white; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">${
                    content.hero?.buttonSecondary || "Subscribe"
                  }</button>
                  </div>
              </div>
            </section>
            
            <!-- About Section -->
            <section class="about-section" style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748; font-weight: 700;">${
                  content.about?.title || "About Me"
                }</h2>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.2rem; color: #4a5568; max-width: 800px; margin: 0 auto 3rem; line-height: 1.6;">${
                  content.about?.content ||
                  "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey. Join me as we explore life, creativity, and everything in between."
                }</p>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
                  ${
                    content.about?.interests
                      ?.map(
                        (interest) => `
                    <span class="editable-text" data-type="tag" style="background: white; color: #667eea; padding: 0.5rem 1rem; border-radius: 25px; font-weight: 600; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">${interest}</span>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
            
            <!-- Blog Posts Section -->
            <section class="blog-section" style="padding: 100px 20px; background: #ffffff;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 class="editable-text" data-type="heading" style="text-align: center; font-size: 2.8rem; margin-bottom: 4rem; color: #2d3748; font-weight: 700;">Latest Posts</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
                  ${
                    content.posts
                      ?.slice(0, 6)
                      .map(
                        (post, index) => `
                    <article class="editable-content" data-type="blog-post" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer;">
                      <div style="height: 220px; background: url('${
                        post.image
                      }') center/cover; position: relative;">
                        <div class="editable-text" data-type="badge" style="position: absolute; top: 15px; left: 15px; background: rgba(255,255,255,0.9); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; color: #4a5568;">${
                          post.category
                        }</div>
                        ${
                          post.featured
                            ? '<div class="editable-text" data-type="featured" style="position: absolute; top: 15px; right: 15px; background: #ff6b6b; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">Featured</div>'
                            : ""
                        }
                      </div>
                      <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; font-size: 0.85rem; color: #718096;">
                          <span class="editable-text" data-type="date" style="font-weight: 500;">${
                            post.date
                          }</span>
                          <span class="editable-text" data-type="read-time" style="background: #f7fafc; padding: 0.3rem 0.8rem; border-radius: 12px;">${
                            post.readTime
                          }</span>
                        </div>
                        <h3 class="editable-text" data-type="heading" style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748; font-weight: 700; line-height: 1.3;">${
                          post.title
                        }</h3>
                        <p class="editable-text" data-type="paragraph" style="color: #4a5568; line-height: 1.7; font-size: 0.95rem; margin-bottom: 1.5rem;">${
                          post.excerpt
                        }</p>
                        <a href="#" class="editable-text" data-type="link" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 0.9rem;">Read More →</a>
                      </div>
                    </article>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
            
            <!-- Categories Section -->
            <section class="categories-section" style="padding: 80px 20px; background: #ffffff;">
              <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748; font-weight: 700;">Explore by Category</h2>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.2rem; color: #4a5568; margin-bottom: 3rem; line-height: 1.6;">Find content that interests you</p>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem;">
                  ${
                    content.categories
                      ?.map(
                        (category, index) => `
                    <div class="editable-content" data-type="category-card" style="background: white; border-radius: 16px; padding: 2rem; box-shadow: 0 4px 20px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease; cursor: pointer; text-align: center;">
                      <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">📝</div>
                      <h3 class="editable-text" data-type="category-title" style="font-size: 1.2rem; font-weight: 600; color: #2d3748; margin-bottom: 0.5rem;">${category}</h3>
                      <p class="editable-text" data-type="category-count" style="color: #718096; font-size: 0.9rem;">${
                        Math.floor(Math.random() * 20) + 5
                      } posts</p>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>

            <!-- Stats Section -->
            <section class="stats-section" style="padding: 80px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.5rem; margin-bottom: 3rem; font-weight: 700;">Blog Statistics</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 3rem;">
                  ${
                    content.stats
                      ?.map(
                        (stat) => `
                    <div class="editable-content" data-type="stat-card" style="text-align: center;">
                      <div class="editable-text" data-type="stat-number" style="font-size: 3rem; font-weight: bold; margin-bottom: 0.5rem;">${stat.number}</div>
                      <div class="editable-text" data-type="stat-label" style="font-size: 1.1rem; opacity: 0.9;">${stat.label}</div>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
            
            <!-- Newsletter Section -->
            <section class="newsletter-section" style="padding: 80px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
              <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.2rem; margin-bottom: 1rem; color: #2d3748; font-weight: 700;">${
                  content.newsletter?.title || "Stay Updated"
                }</h2>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.1rem; color: #4a5568; margin-bottom: 2.5rem; line-height: 1.6;">${
                  content.newsletter?.description ||
                  "Get notified when I publish new posts. No spam, just quality content delivered to your inbox."
                }</p>
                <div class="editable-content" data-type="form" style="display: flex; gap: 1rem; max-width: 400px; margin: 0 auto;">
                  <input type="email" class="editable-input" data-type="input" placeholder="${
                    content.newsletter?.placeholder ||
                    "Enter your email address"
                  }" style="flex: 1; padding: 15px 20px; border: 2px solid #e2e8f0; border-radius: 50px; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
                  <button class="editable-button" data-type="button" style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">Subscribe</button>
                </div>
                <p class="editable-text" data-type="subscriber-count" style="font-size: 0.9rem; color: #718096; margin-top: 1rem;">Join ${
                  content.newsletter?.subscribers || "2,500+"
                } subscribers who get our latest posts</p>
              </div>
            </section>
          </div>
        `;

      case "restaurant":
        return `
          <div class="website-container" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <!-- Hero Section -->
            <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 20px; text-align: center; color: white; position: relative; min-height: 60vh; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
                <h1 class="editable-text" data-type="heading" style="font-size: 4rem; font-weight: bold; margin-bottom: 2rem; line-height: 1.2;">${
                  content.hero?.title || "Fine Dining Experience"
                }</h1>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.4rem; margin-bottom: 3rem; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6;">${
                  content.hero?.subtitle ||
                  "Exceptional cuisine in an elegant atmosphere. Where culinary artistry meets warm hospitality."
                }</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <button class="editable-button" data-type="button" style="background: #ff6b6b; color: white; border: none; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">${
                    content.hero?.buttonText || "Make Reservation"
                  }</button>
                  <button class="editable-button" data-type="button" style="background: transparent; color: white; border: 2px solid white; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">${
                    content.hero?.buttonSecondary || "View Menu"
                  }</button>
                </div>
              </div>
            </section>
            
            <!-- About Section -->
            <section class="about-section" style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748; font-weight: 700;">${
                  content.about?.title || "About Our Restaurant"
                }</h2>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.2rem; color: #4a5568; max-width: 800px; margin: 0 auto 3rem; line-height: 1.6;">${
                  content.about?.content ||
                  "Established in 2015, our restaurant has been serving exceptional cuisine in an elegant atmosphere. Our chef brings over 20 years of experience from world-renowned kitchens, creating dishes that celebrate local ingredients with international flair."
                }</p>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
                  ${
                    content.about?.specialties
                      ?.map(
                        (specialty) => `
                    <span class="editable-text" data-type="tag" style="background: white; color: #667eea; padding: 0.5rem 1rem; border-radius: 25px; font-weight: 600; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">${specialty}</span>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
            
            <!-- Menu Section -->
            <section class="menu-section" style="padding: 100px 20px; background: #ffffff;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 class="editable-text" data-type="heading" style="text-align: center; font-size: 2.8rem; margin-bottom: 4rem; color: #2d3748; font-weight: 700;">Our Menu</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
                  ${
                    content.menu
                      ?.slice(0, 6)
                      .map(
                        (item, index) => `
                    <div class="editable-content" data-type="menu-item" style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s ease, box-shadow 0.3s ease;">
                      <div style="height: 200px; background: url('${
                        item.image
                      }') center/cover; position: relative;">
                        ${
                          item.popular
                            ? '<div class="editable-text" data-type="popular" style="position: absolute; top: 15px; right: 15px; background: #ff6b6b; color: white; padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600;">Popular</div>'
                            : ""
                        }
                      </div>
                      <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                          <h3 class="editable-text" data-type="heading" style="font-size: 1.5rem; color: #2d3748; font-weight: 700;">${
                            item.name
                          }</h3>
                          <span class="editable-text" data-type="price" style="font-size: 1.5rem; font-weight: bold; color: #667eea;">${
                            item.price
                          }</span>
                        </div>
                        <p class="editable-text" data-type="paragraph" style="color: #4a5568; line-height: 1.6; margin-bottom: 1rem;">${
                          item.description
                        }</p>
                        <span class="editable-text" data-type="category" style="background: #f7fafc; color: #4a5568; padding: 0.3rem 0.8rem; border-radius: 12px; font-size: 0.8rem; font-weight: 600;">${
                          item.category
                        }</span>
                      </div>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
          </div>
        `;

      case "gym":
        return `
          <div class="website-container" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <!-- Hero Section -->
            <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 20px; text-align: center; color: white; position: relative; min-height: 60vh; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto; width: 100%;">
                <h1 class="editable-text" data-type="heading" style="font-size: 4rem; font-weight: bold; margin-bottom: 2rem; line-height: 1.2;">${
                  content.hero?.title || "Transform Your Body"
                }</h1>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.4rem; margin-bottom: 3rem; opacity: 0.95; max-width: 700px; margin-left: auto; margin-right: auto; line-height: 1.6;">${
                  content.hero?.subtitle ||
                  "Join our community of fitness enthusiasts and achieve your health goals with our state-of-the-art equipment and expert trainers."
                }</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                  <button class="editable-button" data-type="button" style="background: #ff6b6b; color: white; border: none; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">${
                    content.hero?.buttonText || "Start Free Trial"
                  }</button>
                  <button class="editable-button" data-type="button" style="background: transparent; color: white; border: 2px solid white; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;">${
                    content.hero?.buttonSecondary || "View Programs"
                  }</button>
                </div>
              </div>
            </section>
            
            <!-- About Section -->
            <section class="about-section" style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
                <h2 class="editable-text" data-type="heading" style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748; font-weight: 700;">${
                  content.about?.title || "About Our Gym"
                }</h2>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.2rem; color: #4a5568; max-width: 800px; margin: 0 auto 3rem; line-height: 1.6;">${
                  content.about?.content ||
                  "We're more than just a gym - we're a community dedicated to helping you achieve your fitness goals. With state-of-the-art equipment, expert trainers, and a supportive environment, we provide everything you need to succeed."
                }</p>
                <div style="display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem;">
                  ${
                    content.about?.values
                      ?.map(
                        (value) => `
                    <span class="editable-text" data-type="tag" style="background: white; color: #667eea; padding: 0.5rem 1rem; border-radius: 25px; font-weight: 600; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">${value}</span>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
            
            <!-- Programs Section -->
            <section class="programs-section" style="padding: 100px 20px; background: #ffffff;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 class="editable-text" data-type="heading" style="text-align: center; font-size: 2.8rem; margin-bottom: 4rem; color: #2d3748; font-weight: 700;">Our Programs</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
                  ${
                    content.programs
                      ?.slice(0, 4)
                      .map(
                        (program, index) => `
                    <div class="editable-content" data-type="program" style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-center; transition: transform 0.3s ease, box-shadow 0.3s ease;">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">${
                        program.icon
                      }</div>
                      <h3 class="editable-text" data-type="heading" style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748; font-weight: 700;">${
                        program.name
                      }</h3>
                      <p class="editable-text" data-type="paragraph" style="color: #4a5568; line-height: 1.6; margin-bottom: 1.5rem;">${
                        program.description
                      }</p>
                      <div style="margin-bottom: 1.5rem;">
                        <span class="editable-text" data-type="price" style="font-size: 2rem; font-weight: bold; color: #667eea;">${
                          program.price
                        }</span>
                        <span class="editable-text" data-type="duration" style="color: #4a5568; font-size: 0.9rem;">/${
                          program.duration
                        }</span>
                      </div>
                      <ul style="list-style: none; padding: 0; text-align: left;">
                        ${program.features
                          .map(
                            (feature) => `
                          <li style="padding: 0.5rem 0; color: #4a5568; display: flex; align-items: center;">
                            <span style="color: #10b981; margin-right: 0.5rem;">✓</span>
                            ${feature}
                          </li>
                        `
                          )
                          .join("")}
                      </ul>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </section>
          </div>
        `;

      default:
        return `
          <div class="website-container" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <section class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 20px; text-align: center; color: white; min-height: 60vh; display: flex; align-items: center;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 class="editable-text" data-type="heading" style="font-size: 4rem; font-weight: bold; margin-bottom: 2rem;">${website.name}</h1>
                <p class="editable-text" data-type="paragraph" style="font-size: 1.4rem; margin-bottom: 3rem; opacity: 0.9;">Professional website ready for customization</p>
                <button class="editable-button" data-type="button" style="background: #ff6b6b; color: white; border: none; padding: 20px 40px; font-size: 1.2rem; border-radius: 50px; cursor: pointer;">Get Started</button>
              </div>
            </section>
          </div>
        `;
    }
  }, []);

  // Generate enhanced CSS with customization classes
  const generateWebsiteCSS = useCallback((website) => {
    return `
      /* Base Styles */
      .website-container {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      /* Editable Elements */
      .editable-text:hover,
      .editable-button:hover,
      .editable-content:hover,
      .editable-input:hover {
        outline: 2px dashed #667eea !important;
        outline-offset: 2px;
        cursor: pointer;
      }
      
      .editable-text.selected,
      .editable-button.selected,
      .editable-content.selected,
      .editable-input.selected {
        outline: 2px solid #667eea !important;
        outline-offset: 2px;
        background-color: rgba(102, 126, 234, 0.1) !important;
      }
      
      /* Typography */
      .editable-text[data-type="heading"] {
        font-weight: 700;
        line-height: 1.2;
        margin: 0 0 1rem 0;
      }
      
      .editable-text[data-type="paragraph"] {
        line-height: 1.6;
        margin: 0 0 1rem 0;
      }
      
      /* Buttons */
      .editable-button {
        transition: all 0.3s ease;
        cursor: pointer;
        border: none;
        border-radius: 8px;
        font-weight: 600;
      }
      
      .editable-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      /* Forms */
      .editable-input {
        transition: border-color 0.3s ease;
        border: 2px solid #e2e8f0;
        border-radius: 8px;
        padding: 12px 16px;
      }
      
      .editable-input:focus {
        border-color: #667eea;
        outline: none;
      }
      
      /* Content Blocks */
      .editable-content {
        transition: all 0.3s ease;
      }
      
      .editable-content:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      }
      
      /* Responsive Design */
      @media (max-width: 768px) {
        .hero-section h1 {
          font-size: 2.5rem !important;
        }
        
        .hero-section p {
          font-size: 1.1rem !important;
        }
      }
    `;
  }, []);

  // Load website into editor
  const loadWebsite = useCallback(
    (editorInstance, website) => {
      console.log("Loading website:", website.name);

      const websiteHTML = generateWebsiteHTML(website);
      const websiteCSS = generateWebsiteCSS(website);

      try {
        // Set HTML and CSS
        console.log(
          "Setting components:",
          websiteHTML.substring(0, 200) + "..."
        );
        console.log("Setting styles:", websiteCSS.substring(0, 200) + "...");

        // Clear existing content first
        editorInstance.setComponents("");
        editorInstance.setStyle("");

        // Set new content
        editorInstance.setComponents(websiteHTML);
        editorInstance.setStyle(websiteCSS);

        // Force refresh the canvas
        editorInstance.refresh();

        // Wait a bit and refresh again to ensure proper rendering
        setTimeout(() => {
          editorInstance.refresh();
          console.log("✅ Website HTML and CSS set successfully");

          // Add styles after canvas is fully ready
          setTimeout(() => {
            try {
              const canvas = editorInstance.Canvas;
              const canvasDocument = canvas.getDocument();

              if (canvasDocument && canvasDocument.head) {
                const canvasHead = canvasDocument.head;

                // Remove any existing base styles to avoid duplicates
                const existingStyles = canvasHead.querySelector(
                  "style[data-base-styles]"
                );
                if (existingStyles) {
                  existingStyles.remove();
                }

                // Add base styles
                const baseStyles = canvasDocument.createElement("style");
                baseStyles.setAttribute("data-base-styles", "true");
                baseStyles.textContent = `
                   * { box-sizing: border-box; }
                   body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
                   .website-container { width: 100%; }
                   .editable-text:hover, .editable-button:hover, .editable-content:hover { 
                     outline: 2px dashed #3b82f6 !important; 
                     cursor: pointer !important; 
                   }
                   .selected { outline: 2px solid #3b82f6 !important; }
                   .gjs-cv-canvas { background: white !important; }
                   .gjs-frame { background: white !important; }
                 `;
                canvasHead.appendChild(baseStyles);
                console.log("✅ Base styles added to canvas (delayed)");
              }
            } catch (error) {
              console.warn("⚠️ Could not add delayed base styles:", error);
            }
          }, 200);
        }, 100);

        console.log("✅ Website HTML and CSS set successfully");

        // Add custom blocks for drag and drop
        const blockManager = editorInstance.BlockManager;

        // Clear existing blocks
        blockManager.clear();

        // Text Blocks
        blockManager.add("text-block", {
          label: "📝 Text Block",
          category: "Content",
          content:
            '<div class="editable-text" data-type="paragraph" style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">Click to edit this text block</div>',
        });

        blockManager.add("heading-block", {
          label: "📰 Heading",
          category: "Content",
          content:
            '<h1 class="editable-text" data-type="heading" style="font-size: 2.5rem; font-weight: bold; color: #2d3748; margin: 20px 0;">Your Heading Here</h1>',
        });

        // Button Blocks
        blockManager.add("button-primary", {
          label: "🔘 Primary Button",
          category: "Buttons",
          content:
            '<button class="editable-button" data-type="button" style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; cursor: pointer;">Click Me</button>',
        });

        blockManager.add("button-secondary", {
          label: "⚪ Secondary Button",
          category: "Buttons",
          content:
            '<button class="editable-button" data-type="button" style="background: white; color: #667eea; border: 2px solid #667eea; padding: 15px 30px; border-radius: 8px; font-weight: 600; cursor: pointer;">Click Me</button>',
        });

        // Layout Blocks
        blockManager.add("container", {
          label: "📦 Container",
          category: "Layout",
          content:
            '<div class="editable-content" data-type="container" style="padding: 40px; background: #f8f9fa; border-radius: 12px; margin: 20px 0;"><p class="editable-text" data-type="paragraph">Add your content here</p></div>',
        });

        blockManager.add("card", {
          label: "🃏 Card",
          category: "Layout",
          content:
            '<div class="editable-content" data-type="card" style="background: white; padding: 30px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); margin: 20px 0;"><h3 class="editable-text" data-type="heading" style="margin-bottom: 15px;">Card Title</h3><p class="editable-text" data-type="paragraph">Card content goes here</p></div>',
        });

        // Feature Blocks
        blockManager.add("feature-card", {
          label: "⭐ Feature Card",
          category: "Content",
          content: `
          <div class="editable-content" data-type="feature-card" style="background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
            <h3 class="editable-text" data-type="heading" style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748;">Feature Title</h3>
            <p class="editable-text" data-type="paragraph" style="color: #4a5568; line-height: 1.6;">Feature description goes here</p>
          </div>
        `,
        });

        // Form Blocks
        blockManager.add("contact-form", {
          label: "📧 Contact Form",
          category: "Forms",
          content: `
          <div class="editable-content" data-type="form" style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h3 class="editable-text" data-type="heading" style="margin-bottom: 20px;">Contact Us</h3>
            <input type="text" class="editable-input" data-type="input" placeholder="Your Name" style="width: 100%; margin-bottom: 15px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px;">
            <input type="email" class="editable-input" data-type="input" placeholder="Your Email" style="width: 100%; margin-bottom: 15px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px;">
            <textarea class="editable-input" data-type="textarea" placeholder="Your Message" style="width: 100%; margin-bottom: 15px; padding: 12px; border: 2px solid #e2e8f0; border-radius: 8px; min-height: 100px; resize: vertical;"></textarea>
            <button class="editable-button" data-type="button" style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">Send Message</button>
          </div>
        `,
        });

        console.log("✅ Website loaded successfully");
      } catch (error) {
        console.error("❌ Error loading website:", error);
        throw error;
      }
    },
    [generateWebsiteHTML, generateWebsiteCSS]
  );

  // Initialize editor
  useEffect(() => {
    if (!editorRef.current) return;

    const initEditor = async () => {
      try {
        console.log("Initializing GrapesJS editor...");

        const editorInstance = grapesjs.init({
          container: editorRef.current,
          height: "100vh",
          width: "100%",
          storageManager: false,
          canvas: {
            styles: [
              "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
            ],
            scripts: [],
          },
          plugins: [
            "gjs-preset-webpage",
            "gjs-blocks-basic",
            "gjs-plugin-forms",
            "gjs-component-countdown",
            "gjs-plugin-export",
          ],
          pluginsOpts: {
            "gjs-preset-webpage": {
              modalImportTitle: "Import Template",
              modalImportLabel:
                "<div>Paste here your HTML/CSS and click Import</div>",
              modalImportContent: function (editor) {
                return (
                  editor.getHtml() + "<style>" + editor.getCss() + "</style>"
                );
              },
            },
          },
          blockManager: { appendTo: ".blocks-container" },
          layerManager: { appendTo: ".layers-container" },
          traitManager: { appendTo: ".traits-container" },
          selectorManager: { appendTo: ".styles-container" },
          // Enhanced configuration for better editing experience
          deviceManager: {
            devices: [
              {
                name: "Desktop",
                width: "",
              },
              {
                name: "Tablet",
                width: "768px",
                widthMedia: "992px",
              },
              {
                name: "Mobile",
                width: "320px",
                widthMedia: "768px",
              },
            ],
          },
          // Disable inline editing (using click-to-select instead)
          inlineEditing: false,
          // Better component selection
          componentManager: {
            appendTo: ".components-container",
          },
          // Enhanced traits for better customization
          traitManager: {
            appendTo: ".traits-container",
            options: [
              {
                type: "checkbox",
                name: "disabled",
                label: "Disabled",
                changeProp: 1,
              },
              {
                type: "select",
                name: "tagName",
                label: "Tag",
                options: [
                  { value: "div", name: "DIV" },
                  { value: "section", name: "SECTION" },
                  { value: "article", name: "ARTICLE" },
                  { value: "header", name: "HEADER" },
                  { value: "footer", name: "FOOTER" },
                ],
                changeProp: 1,
              },
            ],
          },
        });

        // Load website if provided
        if (currentTemplate) {
          loadWebsite(editorInstance, currentTemplate);
        }

        // Add click handlers for editable elements
        editorInstance.on("load", () => {
          const canvas = editorInstance.Canvas;
          const canvasDocument = canvas.getDocument();

          // Add click handlers to editable elements
          canvasDocument.addEventListener("click", (e) => {
            const element = e.target.closest(
              ".editable-text, .editable-button, .editable-content, .editable-input, .editable-image, .editable-logo"
            );
            if (element) {
              e.preventDefault();
              e.stopPropagation();

              // Remove previous selection
              canvasDocument
                .querySelectorAll(".selected")
                .forEach((el) => el.classList.remove("selected"));

              // Add selection to clicked element
              element.classList.add("selected");
              setSelectedElement(element);

              // Select the component in GrapesJS
              const component = editorInstance.getSelected();
              if (component) {
                component.set("editable", true);
                // Open the trait manager for the selected element
                editorInstance.runCommand("open-trait-manager");
              }

              // Add visual feedback
              element.style.outline = "2px solid #3b82f6";
              element.style.outlineOffset = "2px";
            }
          });

          // Add hover effects for better UX
        });

        setEditor(editorInstance);
        setIsLoading(false);

        console.log("✅ Editor initialized successfully");
      } catch (error) {
        console.error("❌ Error initializing editor:", error);
        setIsLoading(false);
      }
    };

    initEditor();

    return () => {
      if (editor) {
        editor.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTemplate, loadWebsite]);

  // Handle website change
  useEffect(() => {
    if (templateData && templateData.id !== currentTemplate?.id) {
      setCurrentTemplate(templateData);
      if (editor) {
        loadWebsite(editor, templateData);
      }
    }
  }, [templateData, editor, currentTemplate, loadWebsite]);

  // Handle save
  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();

      console.log("Saving website:", { html: html.length, css: css.length });

      if (onSave) {
        await onSave({ html, css, website: currentTemplate });
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle publish
  const handlePublish = async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();

      console.log("Publishing website:", {
        html: html.length,
        css: css.length,
      });

      if (onPublish) {
        await onPublish({ html, css, website: currentTemplate });
      }
    } catch (error) {
      console.error("Error publishing:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Handle style updates from customization panel
  const handleUpdateStyle = useCallback(
    (property, value) => {
      if (!editor || !selectedElement) return;

      const component = editor.getSelected();
      if (component) {
        const currentStyles = component.getStyle() || {};

        // Map common property names to CSS properties
        const cssPropertyMap = {
          backgroundColor: "background-color",
          fontFamily: "font-family",
          fontSize: "font-size",
          fontWeight: "font-weight",
          lineHeight: "line-height",
          color: "color",
          padding: "padding",
          margin: "margin",
          borderRadius: "border-radius",
          width: "width",
          primary: "border-color",
        };

        const cssProperty = cssPropertyMap[property] || property;
        const newStyles = { ...currentStyles, [cssProperty]: value };

        component.setStyle(newStyles);
      }
    },
    [editor, selectedElement]
  );

  // Handle content updates from customization panel
  const handleUpdateContent = useCallback(
    (field, value) => {
      if (!editor || !selectedElement) return;

      const component = editor.getSelected();
      if (component) {
        if (field === "text") {
          component.set("content", value);
        }
      }
    },
    [editor, selectedElement]
  );

  // Loading overlay
  const renderLoadingOverlay = () => {
    if (!isLoading) return null;

    return (
      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🚀 Loading Editor
          </h2>
          <p className="text-gray-600 mb-4 text-lg">
            Setting up your drag-and-drop website builder...
          </p>
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2">
            {currentTemplate
              ? `✨ Loading ${currentTemplate.name} website`
              : "🎨 Initializing blank canvas"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="editor-wrapper h-screen flex">
      {/* Left Side: Website Preview */}
      <div className="flex-1 bg-white relative">
        {/* Top Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {currentTemplate ? currentTemplate.name : "Website Preview"}
            </h2>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
                Desktop
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                Tablet
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                Mobile
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? "💾 Saving..." : "💾 Save"}
            </button>
            <button
              onClick={handlePublish}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? "🚀 Publishing..." : "🚀 Publish"}
            </button>
          </div>
        </div>

        {/* Left Side: Website Preview */}
        <div className="flex-1 bg-white relative">
          {/* Top Toolbar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-bold text-gray-900">
                {currentTemplate ? currentTemplate.name : "Website Preview"}
              </h2>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
                  Desktop
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                  Tablet
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">
                  Mobile
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? "💾 Saving..." : "💾 Save"}
              </button>
              <button
                onClick={handlePublish}
                disabled={isSaving}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? "🚀 Publishing..." : "🚀 Publish"}
              </button>
            </div>
          </div>

          {/* Website Preview Area */}
          <div className="flex-1 overflow-auto bg-gray-50">
            <div className="min-h-screen bg-white">
              <div
                className="gjs-editor"
                style={{ height: "100%", minHeight: "100vh" }}
              >
                <div ref={editorRef} className="h-full w-full"></div>
              </div>
              {renderLoadingOverlay()}
            </div>
          </div>
        </div>

        {/* Right Side: Customization Panel */}
        <CustomizationPanel
          selectedElement={selectedElement}
          onUpdateStyle={handleUpdateStyle}
          onUpdateContent={handleUpdateContent}
          editor={editor}
        />
      </div>
    </div>
  );
};

export default GrapesJSEditor;
