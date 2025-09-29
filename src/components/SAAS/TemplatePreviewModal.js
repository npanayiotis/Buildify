import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Tablet, Monitor, ExternalLink } from "lucide-react";

const TemplatePreviewModal = ({ isOpen, onClose, template }) => {
  const [deviceView, setDeviceView] = useState("desktop");

  if (!isOpen || !template) return null;

  const getDeviceStyles = () => {
    switch (deviceView) {
      case "mobile":
        return { width: "375px", height: "667px", maxHeight: "80vh" };
      case "tablet":
        return { width: "768px", height: "1024px", maxHeight: "80vh" };
      default:
        return { width: "100%", height: "100%", maxHeight: "none" };
    }
  };

  const generatePreviewHTML = () => {
    const content = template.fullContent || template.components;

    switch (template.category) {
      case "saas":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${
                  content.hero.title
                }</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">${
                  content.hero.subtitle
                }</p>
                <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">${
                  content.hero.buttonText
                }</button>
              </div>
            </div>

            <!-- Features Section -->
            <div style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Why Choose Us?</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                  ${
                    content.features
                      ?.slice(0, 3)
                      .map(
                        (feature) => `
                    <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="font-size: 3rem; margin-bottom: 1rem;">${feature.icon}</div>
                      <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">${feature.title}</h3>
                      <p style="color: #666; line-height: 1.6;">${feature.description}</p>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

      case "portfolio":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333;">
            <!-- Hero Section -->
            <div style="background: #000; color: white; padding: 100px 20px; text-align: center;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; font-weight: 300; margin-bottom: 1rem;">${
                  content.hero.title
                }</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.8;">${
                  content.hero.subtitle
                }</p>
              </div>
            </div>

            <!-- Portfolio Section -->
            <div style="padding: 80px 20px;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                  ${
                    content.portfolio
                      ?.slice(0, 3)
                      .map(
                        (project) => `
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.1);">
                      <div style="height: 200px; background: linear-gradient(45deg, #ff6b6b, #4ecdc4);"></div>
                      <div style="padding: 2rem;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">${project.title}</h3>
                        <p style="color: #666; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${project.category}</p>
                      </div>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

      case "restaurant":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333;">
            <!-- Hero Section -->
            <div style="background: url('${
              content.hero.backgroundImage
            }') center/cover; padding: 100px 20px; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.6);"></div>
              <div style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; text-align: center; color: white;">
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${
                  content.hero.title
                }</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">${
                  content.hero.subtitle
                }</p>
                <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">${
                  content.hero.buttonText
                }</button>
              </div>
            </div>

            <!-- Menu Section -->
            <div style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Our Menu</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                  ${
                    content.menu
                      ?.slice(0, 4)
                      .map(
                        (item) => `
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="height: 150px; background: linear-gradient(45deg, #ff9a9e, #fecfef); border-radius: 8px; margin-bottom: 1rem;"></div>
                      <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #333;">${item.name}</h3>
                      <p style="color: #666; margin-bottom: 1rem; font-size: 0.9rem;">${item.description}</p>
                      <span style="font-size: 1.1rem; font-weight: bold; color: #ff6b6b;">${item.price}</span>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

      case "ecommerce":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${
                  content.hero.title
                }</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">${
                  content.hero.subtitle
                }</p>
                <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">${
                  content.hero.buttonText
                }</button>
              </div>
            </div>

            <!-- Products Section -->
            <div style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Featured Products</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                  ${
                    content.products
                      ?.slice(0, 4)
                      .map(
                        (product) => `
                    <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="height: 200px; background: linear-gradient(45deg, #ff9a9e, #fecfef);"></div>
                      <div style="padding: 1.5rem;">
                        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: #333;">${product.name}</h3>
                        <p style="color: #666; margin-bottom: 1rem; font-size: 0.9rem;">${product.description}</p>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                          <span style="font-size: 1.2rem; font-weight: bold; color: #667eea;">$${product.price}</span>
                          <button style="background: #667eea; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.9rem; cursor: pointer;">Add to Cart</button>
                        </div>
                      </div>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

      case "blog":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #2d3748; background: #ffffff;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white; position: relative;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem; line-height: 1.2;">${
                  content.hero?.title || "Welcome to My Blog"
                }</h1>
                <p style="font-size: 1.3rem; margin-bottom: 2.5rem; opacity: 0.95; max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;">${
                  content.hero?.subtitle ||
                  "Thoughts, stories, and insights from my journey"
                }</p>
                <button style="background: #ff6b6b; color: white; border: none; padding: 18px 35px; font-size: 1.1rem; border-radius: 50px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);">${
                  content.hero?.buttonText || "Read Latest Post"
                }</button>
              </div>
            </div>
            
            <!-- Blog Posts Section -->
            <div style="padding: 100px 20px; background: #ffffff;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.8rem; margin-bottom: 4rem; color: #2d3748; font-weight: 700;">Latest Posts</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 3rem;">
                  ${
                    content.posts
                      ?.slice(0, 3)
                      .map(
                        (post) => `
                    <article style="background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: all 0.3s ease; cursor: pointer;">
                      <div style="height: 220px; background: url('${post.image}') center/cover; position: relative;">
                        <div style="position: absolute; top: 15px; left: 15px; background: rgba(255,255,255,0.9); padding: 0.4rem 1rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; color: #4a5568;">${post.category}</div>
                      </div>
                      <div style="padding: 2rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; font-size: 0.85rem; color: #718096;">
                          <span style="font-weight: 500;">${post.date}</span>
                          <span style="background: #f7fafc; padding: 0.3rem 0.8rem; border-radius: 12px;">${post.readTime}</span>
                        </div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748; font-weight: 700; line-height: 1.3;">${post.title}</h3>
                        <p style="color: #4a5568; line-height: 1.7; font-size: 0.95rem; margin-bottom: 1.5rem;">${post.excerpt}</p>
                        <a href="#" style="color: #667eea; text-decoration: none; font-weight: 600; font-size: 0.9rem;">Read More →</a>
                      </div>
                    </article>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
            
            <!-- Newsletter Section -->
            <div style="padding: 80px 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">
              <div style="max-width: 800px; margin: 0 auto; text-align: center;">
                <h2 style="font-size: 2.2rem; margin-bottom: 1rem; color: #2d3748; font-weight: 700;">Stay Updated</h2>
                <p style="font-size: 1.1rem; color: #4a5568; margin-bottom: 2.5rem; line-height: 1.6;">Get notified when I publish new posts. No spam, just quality content delivered to your inbox.</p>
                <div style="display: flex; gap: 1rem; max-width: 400px; margin: 0 auto;">
                  <input type="email" placeholder="Enter your email address" style="flex: 1; padding: 15px 20px; border: 2px solid #e2e8f0; border-radius: 50px; font-size: 1rem; outline: none; transition: border-color 0.3s ease;">
                  <button style="background: #667eea; color: white; border: none; padding: 15px 30px; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        `;

      case "business":
        return `
          <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; line-height: 1.6; color: #333;">
            <!-- Hero Section -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${
                  content.hero.title
                }</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">${
                  content.hero.subtitle
                }</p>
                <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">${
                  content.hero.buttonText
                }</button>
              </div>
            </div>

            <!-- Services Section -->
            <div style="padding: 80px 20px; background: #f8f9fa;">
              <div style="max-width: 1200px; margin: 0 auto;">
                <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Our Services</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
                  ${
                    content.services
                      ?.slice(0, 4)
                      .map(
                        (service) => `
                    <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                      <div style="font-size: 2.5rem; margin-bottom: 1rem;">${service.icon}</div>
                      <h3 style="font-size: 1.3rem; margin-bottom: 1rem; color: #333;">${service.title}</h3>
                      <p style="color: #666; line-height: 1.5; font-size: 0.9rem;">${service.description}</p>
                    </div>
                  `
                      )
                      .join("") || ""
                  }
                </div>
              </div>
            </div>
          </div>
        `;

      default:
        return `
          <div style="padding: 80px 20px; text-align: center; background: #f8f9fa; font-family: 'Inter', sans-serif;">
            <h1 style="font-size: 3rem; margin-bottom: 1rem; color: #333;">Welcome to Your Website</h1>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 2rem;">Start customizing your page by adding components from the left panel.</p>
            <button style="background: #007bff; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">Get Started</button>
          </div>
        `;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 z-[99999] flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full h-full max-w-none max-h-none flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {template.name} - Live Preview
                  </h2>
                  <p className="text-gray-600 mt-1 text-lg">
                    {template.description}
                  </p>
                </div>

                {/* Device Selector */}
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setDeviceView("mobile")}
                      className={`p-3 rounded-md transition-colors ${
                        deviceView === "mobile"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeviceView("tablet")}
                      className={`p-3 rounded-md transition-colors ${
                        deviceView === "tablet"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Tablet View"
                    >
                      <Tablet className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setDeviceView("desktop")}
                      className={`p-3 rounded-md transition-colors ${
                        deviceView === "desktop"
                          ? "bg-white shadow-sm text-blue-600"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      title="Desktop View"
                    >
                      <Monitor className="w-5 h-5" />
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-hidden bg-gray-50 flex items-center justify-center p-8">
              <div
                className="bg-white rounded-xl shadow-2xl overflow-auto border border-gray-200"
                style={getDeviceStyles()}
              >
                <div
                  className="preview-content"
                  dangerouslySetInnerHTML={{ __html: generatePreviewHTML() }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-base text-gray-600">
                  <span className="font-medium">Live Preview Mode</span> - This
                  is exactly how your website will look to visitors
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Close Preview
                  </button>
                  <button
                    onClick={() => {
                      // Navigate to editor
                      window.location.href = `/editor?template=${template.id}`;
                    }}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Start Customizing
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TemplatePreviewModal;
