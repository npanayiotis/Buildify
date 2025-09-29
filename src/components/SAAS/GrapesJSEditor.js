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
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentTemplate, setCurrentTemplate] = useState(templateData);
  const [loadError, setLoadError] = useState(null);
  const [refReady, setRefReady] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [contentModified, setContentModified] = useState(false);
  const contentInitialized = useRef(false);

  // Check if ref is ready
  useEffect(() => {
    if (editorRef.current) {
      console.log("✅ Editor ref is ready!");
      setRefReady(true);
    }
  }, []);

  // Generate website HTML
  const generateWebsiteHTML = useCallback((website) => {
    console.log("🎨 Generating HTML for:", website.name);

    const content = website.fullWebsite || website.components || {};

    return `
      <div class="website-container">
        <!-- Navigation -->
        <nav style="background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100;">
          <div style="max-width: 1200px; margin: 0 auto; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="font-size: 1.5rem; font-weight: bold; color: #2d3748;">${
              website.name
            }</div>
            <div style="display: flex; gap: 2rem;">
              <a href="#home" style="text-decoration: none; color: #4a5568; font-weight: 500;">Home</a>
              <a href="#about" style="text-decoration: none; color: #4a5568; font-weight: 500;">About</a>
              <a href="#blog" style="text-decoration: none; color: #4a5568; font-weight: 500;">Blog</a>
              <a href="#contact" style="text-decoration: none; color: #4a5568; font-weight: 500;">Contact</a>
            </div>
          </div>
        </nav>

        <!-- Hero Section -->
        <section id="home" class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white; min-height: 500px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1.5rem;">${
              content.hero?.title || "Welcome to My Blog"
            }</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95; max-width: 600px; margin-left: auto; margin-right: auto;">${
              content.hero?.subtitle ||
              "Thoughts, stories, and insights from my journey. Join me as I share experiences, lessons learned, and discoveries along the way."
            }</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;">Read Latest Posts</button>
              <button style="background: transparent; color: white; border: 2px solid white; padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;">Subscribe</button>
            </div>
          </div>
        </section>
        
        <!-- About Section -->
        <section id="about" style="padding: 80px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748;">About Me</h2>
            <p style="font-size: 1.1rem; color: #4a5568; max-width: 800px; margin: 0 auto 2rem;">${
              content.about?.content ||
              "I'm a passionate writer, traveler, and lifelong learner. Through this blog, I share my experiences, insights, and the lessons I've learned along my journey."
            }</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin-top: 3rem;">
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Travel</h3>
                <p style="color: #4a5568;">Exploring new places and cultures</p>
              </div>
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Photography</h3>
                <p style="color: #4a5568;">Capturing moments and memories</p>
              </div>
              <div style="padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Writing</h3>
                <p style="color: #4a5568;">Sharing stories and insights</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Blog Section -->
        <section id="blog" style="padding: 80px 20px; background: white;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="font-size: 2.5rem; margin-bottom: 3rem; color: #2d3748; text-align: center;">Latest Posts</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem;">
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #667eea, #764ba2);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">My Journey Through Europe</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">Discovering hidden gems and local cultures across different European cities...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Travel</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 15, 2023</span>
                  </div>
                </div>
              </article>
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #ff6b6b, #ffa500);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">The Art of Mindful Living</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">How practicing mindfulness has transformed my daily routine and perspective...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Lifestyle</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 10, 2023</span>
                  </div>
                </div>
              </article>
              <article style="background: #f8f9fa; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="height: 200px; background: linear-gradient(45deg, #4ecdc4, #44a08d);"></div>
                <div style="padding: 1.5rem;">
                  <h3 style="font-size: 1.25rem; margin-bottom: 1rem; color: #2d3748;">Photography Tips for Beginners</h3>
                  <p style="color: #4a5568; margin-bottom: 1rem;">Essential techniques and equipment recommendations for starting your photography journey...</p>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #667eea; font-size: 0.9rem;">Photography</span>
                    <span style="color: #4a5568; font-size: 0.9rem;">Dec 5, 2023</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" style="padding: 80px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2.5rem; margin-bottom: 2rem; color: #2d3748;">Get In Touch</h2>
            <p style="font-size: 1.1rem; color: #4a5568; margin-bottom: 3rem;">I'd love to hear from you! Send me a message and I'll respond as soon as possible.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem;">
              <div>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #2d3748;">Contact Information</h3>
                <div style="text-align: left;">
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📧 hello@myblog.com</p>
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📱 +1 (555) 123-4567</p>
                  <p style="color: #4a5568; margin-bottom: 0.5rem;">📍 New York, NY</p>
              </div>
              </div>
              <div>
                <form style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                  <input type="text" placeholder="Your Name" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                  <input type="email" placeholder="Your Email" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px;">
                  <textarea placeholder="Your Message" rows="4" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid #e2e8f0; border-radius: 4px; resize: vertical;"></textarea>
                  <button type="submit" style="background: #667eea; color: white; border: none; padding: 0.75rem 2rem; border-radius: 4px; cursor: pointer; width: 100%;">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer style="background: #2d3748; color: white; padding: 2rem; text-align: center;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <p style="margin-bottom: 1rem;">© 2023 ${
              website.name
            }. All rights reserved.</p>
            <div style="display: flex; justify-content: center; gap: 1rem;">
              <a href="#" style="color: white; text-decoration: none;">Twitter</a>
              <a href="#" style="color: white; text-decoration: none;">Instagram</a>
              <a href="#" style="color: white; text-decoration: none;">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    `;
  }, []);

  const generateWebsiteCSS = useCallback(() => {
    return `
      * { box-sizing: border-box; }
      body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
      .website-container { width: 100%; }
      .gjs-selected { outline: 3px solid #3b82f6 !important; }
    `;
  }, []);

  // Load website into editor
  const loadWebsite = useCallback(
    (editorInstance, website) => {
      if (!editorInstance) {
        console.error("❌ No editor instance");
        setLoadError("Editor not ready");
        setIsLoading(false);
        return;
      }

      // Check if editor is fully initialized
      if (!editorInstance.DomComponents || !editorInstance.CssComposer) {
        console.error("❌ Editor not fully initialized");
        setLoadError("Editor not fully initialized");
        setIsLoading(false);
        return;
      }

      console.log("📥 Loading website:", website.name);

      try {
        console.log("🗑️  Clearing old content...");

        // Safe clearing with null checks
        if (
          editorInstance.DomComponents &&
          typeof editorInstance.DomComponents.clear === "function"
        ) {
          editorInstance.DomComponents.clear();
        }

        if (
          editorInstance.CssComposer &&
          typeof editorInstance.CssComposer.clear === "function"
        ) {
          editorInstance.CssComposer.clear();
        }

        const html = generateWebsiteHTML(website);
        const css = generateWebsiteCSS();

        console.log("✅ Generated HTML (", html.length, "chars)");
        console.log("✅ Generated CSS (", css.length, "chars)");
        console.log("🔍 HTML content preview:", html.substring(0, 200) + "...");

        // Simple approach - just use setComponents
        console.log("📝 Setting components...");

        try {
          editorInstance.setComponents(html);
          console.log("✅ Components set");
        } catch (error) {
          console.error("❌ Error setting components:", error);
        }

        if (typeof editorInstance.setStyle === "function") {
          console.log("🎨 Setting styles...");
          editorInstance.setStyle(css);
          console.log("✅ Styles set");
        }

        if (typeof editorInstance.refresh === "function") {
          console.log("🔄 Refreshing editor...");
          editorInstance.refresh();
          console.log("✅ Editor refreshed");
        }

        // Force a render after a short delay
        setTimeout(() => {
          console.log("🔄 Force rendering after delay...");

          // Multiple render approaches
          try {
            if (typeof editorInstance.render === "function") {
              editorInstance.render();
              console.log("✅ Force render completed");
            }

            // Force canvas update
            if (
              editorInstance.Canvas &&
              typeof editorInstance.Canvas.updateCanvas === "function"
            ) {
              editorInstance.Canvas.updateCanvas();
              console.log("✅ Canvas updated");
            }

            // Force component render
            if (
              editorInstance.DomComponents &&
              typeof editorInstance.DomComponents.render === "function"
            ) {
              editorInstance.DomComponents.render();
              console.log("✅ Components rendered");
            }

            // Force style render
            if (
              editorInstance.CssComposer &&
              typeof editorInstance.CssComposer.render === "function"
            ) {
              editorInstance.CssComposer.render();
              console.log("✅ Styles rendered");
            }

            // Trigger a custom event to force refresh
            editorInstance.trigger("change:canvasOffset");
            editorInstance.trigger("component:update");
            console.log("✅ Events triggered");

            // Final attempt: Force iframe content update
            const canvas = editorInstance.Canvas?.getFrameEl?.();
            if (canvas && canvas.contentDocument) {
              const iframeDoc = canvas.contentDocument;
              const iframeBody = iframeDoc.body;

              if (iframeBody) {
                // Get fresh content from GrapesJS
                const freshHtml = editorInstance.getHtml();
                const freshCss = editorInstance.getCss();

                console.log(
                  "🔄 Final iframe update - HTML:",
                  freshHtml.length,
                  "CSS:",
                  freshCss.length
                );

                // Update iframe content
                iframeBody.innerHTML = freshHtml;

                // Add CSS to head
                let styleEl = iframeDoc.querySelector("style#gjs-css");
                if (!styleEl) {
                  styleEl = iframeDoc.createElement("style");
                  styleEl.id = "gjs-css";
                  iframeDoc.head.appendChild(styleEl);
                }
                styleEl.textContent = freshCss;

                console.log("✅ Final iframe content updated");
              }
            }
          } catch (renderError) {
            console.warn("⚠️ Render error:", renderError);
          }

          // Check if canvas has content - try multiple methods
          let canvas = null;
          let canvasContent = "";

          // Method 1: Try getFrameEl
          try {
            canvas = editorInstance.Canvas?.getFrameEl?.();
            if (canvas) {
              canvasContent = canvas.innerHTML;
              console.log("🔍 Canvas found via getFrameEl:", canvas);
            }
          } catch (e) {
            console.log("🔍 getFrameEl failed:", e.message);
          }

          // Method 2: Try getCanvas
          if (!canvas) {
            try {
              canvas = editorInstance.Canvas?.getCanvas?.();
              if (canvas) {
                canvasContent = canvas.innerHTML;
                console.log("🔍 Canvas found via getCanvas:", canvas);
              }
            } catch (e) {
              console.log("🔍 getCanvas failed:", e.message);
            }
          }

          // Method 3: Try getBody
          if (!canvas) {
            try {
              const body = editorInstance.Canvas?.getBody?.();
              if (body) {
                canvas = body;
                canvasContent = body.innerHTML;
                console.log("🔍 Canvas found via getBody:", body);
              }
            } catch (e) {
              console.log("🔍 getBody failed:", e.message);
            }
          }

          // Method 4: Try container query
          if (!canvas) {
            try {
              const container = editorInstance.getContainer?.();
              if (container) {
                canvas =
                  container.querySelector(".gjs-cv-canvas") ||
                  container.querySelector("iframe");
                if (canvas) {
                  canvasContent = canvas.innerHTML;
                  console.log("🔍 Canvas found via container query:", canvas);
                }
              }
            } catch (e) {
              console.log("🔍 container query failed:", e.message);
            }
          }

          if (canvas) {
            console.log("🔍 Canvas element found:", canvas);
            console.log(
              "🔍 Canvas content:",
              canvasContent.substring(0, 200) + "..."
            );
            console.log(
              "🔍 Canvas children count:",
              canvas.children?.length || 0
            );

            // If canvas is empty, try to force content update
            if (canvasContent.length < 100) {
              console.log("🔄 Canvas appears empty, forcing content update...");

              // Try to get the iframe and update its content directly
              if (canvas.tagName === "IFRAME" && canvas.contentDocument) {
                try {
                  const iframeDoc = canvas.contentDocument;
                  const iframeBody = iframeDoc.body;

                  if (iframeBody) {
                    // Get the current HTML and CSS from GrapesJS
                    const currentHtml = editorInstance.getHtml();
                    const currentCss = editorInstance.getCss();

                    console.log("🔍 Current HTML length:", currentHtml.length);
                    console.log("🔍 Current CSS length:", currentCss.length);

                    // Update iframe content
                    iframeBody.innerHTML = currentHtml;

                    // Add CSS to iframe head
                    let styleEl = iframeDoc.querySelector("style#gjs-css");
                    if (!styleEl) {
                      styleEl = iframeDoc.createElement("style");
                      styleEl.id = "gjs-css";
                      iframeDoc.head.appendChild(styleEl);
                    }
                    styleEl.textContent = currentCss;

                    console.log("✅ Iframe content updated directly");
                  }
                } catch (iframeError) {
                  console.warn("⚠️ Iframe update failed:", iframeError);
                }
              }
            }
          } else {
            console.warn("⚠️ Canvas element not found with any method");
            console.log("🔍 Editor instance:", editorInstance);
            console.log("🔍 Canvas object:", editorInstance.Canvas);
          }

          // Check components
          const components = editorInstance.DomComponents?.getComponents?.();
          if (components) {
            console.log("🔍 Components count:", components.length);
            console.log("🔍 Components:", components);
          }
        }, 100);

        console.log("✅ Website loaded successfully!");

        // Force iframe content update as fallback
        setTimeout(() => {
          const canvas = editorInstance.Canvas?.getFrameEl?.();
          if (canvas && canvas.contentDocument) {
            const iframeDoc = canvas.contentDocument;
            const iframeBody = iframeDoc.body;

            if (iframeBody && iframeBody.innerHTML.length < 100) {
              console.log("🔄 Canvas appears empty, forcing content...");
              iframeBody.innerHTML = html;

              // Add CSS
              let styleEl = iframeDoc.querySelector("style#gjs-css");
              if (!styleEl) {
                styleEl = iframeDoc.createElement("style");
                styleEl.id = "gjs-css";
                iframeDoc.head.appendChild(styleEl);
              }
              styleEl.textContent = css;

              console.log("✅ Content forced to iframe");
            }
          }
        }, 500);

        setIsLoading(false);
        setLoadError(null);
      } catch (error) {
        console.error("❌ Error loading website:", error);
        setLoadError(error.message);
        setIsLoading(false);
      }
    },
    [generateWebsiteHTML, generateWebsiteCSS]
  );

  // Initialize editor - ONLY when ref is ready
  useEffect(() => {
    console.log("🔍 Checking initialization conditions...");
    console.log("- refReady:", refReady);
    console.log("- editorRef.current:", !!editorRef.current);
    console.log("- editor exists:", !!editor);

    if (!refReady || !editorRef.current) {
      console.log("⏳ Not ready to initialize yet - ref not ready");
      return;
    }

    if (editor || isInitializing) {
      console.log("⏳ Editor already exists or initializing, skipping");
      return;
    }

    console.log("🚀 Skipping GrapesJS - using simple HTML preview");
    setIsInitializing(false);
    setIsLoading(false);
    return;

    const timeout = setTimeout(() => {
      console.warn("⏰ Loading timeout!");
      setLoadError("Loading timeout - GrapesJS may not have loaded");
      setIsLoading(false);
    }, 15000);

    try {
      const editorInstance = grapesjs.init({
        container: editorRef.current,
        height: "100%",
        width: "100%",
        storageManager: false,
        fromElement: false,
        showOffsets: true,
        noticeOnUnload: false,
        allowScripts: 1,
        avoidInlineStyle: false,

        canvas: {
          styles: [
            "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap",
          ],
        },

        deviceManager: {
          devices: [
            { name: "Desktop", width: "" },
            { name: "Tablet", width: "768px" },
            { name: "Mobile", width: "320px" },
          ],
        },

        panels: { defaults: [] },
        styleManager: { appendTo: "#style-manager-container" },
        layerManager: { appendTo: "#layer-manager-container" },
        traitManager: { appendTo: "#trait-manager-container" },
        blockManager: { appendTo: "#blocks-container" },

        // Simplified configuration - no plugins for now
        plugins: [],
      });

      console.log("✅ GrapesJS instance created");

      editorInstance.on("component:selected", (comp) => {
        console.log("📌 Component selected");
        setSelectedElement(comp);
      });

      editorInstance.on("component:deselected", () => {
        console.log("📌 Component deselected");
        setSelectedElement(null);
      });

      // Add canvas ready event
      editorInstance.on("canvas:ready", () => {
        console.log("🎨 Canvas is ready!");
      });

      // Add canvas frame load event
      editorInstance.on("canvas:frame:load", () => {
        console.log("🎨 Canvas frame loaded!");
      });

      // Add component add event
      editorInstance.on("component:add", (component) => {
        console.log("➕ Component added:", component);
      });

      // Add component update event
      editorInstance.on("component:update", (component) => {
        console.log("🔄 Component updated:", component);
      });

      editorInstance.on("load", () => {
        console.log("✅ Editor LOADED!");
        clearTimeout(timeout);
        setEditor(editorInstance);
        setIsInitializing(false);

        // Wait for editor to be fully initialized
        const waitForInitialization = () => {
          if (editorInstance.DomComponents && editorInstance.CssComposer) {
            console.log("✅ Editor fully initialized!");

            // Wait for canvas to be ready
            const waitForCanvas = () => {
              const canvas = editorInstance.Canvas?.getFrameEl?.();
              if (canvas && canvas.contentDocument) {
                console.log("✅ Canvas is ready!");
                if (currentTemplate) {
                  console.log("📦 Loading template:", currentTemplate.name);
                  // Add a small delay to ensure editor is completely ready
                  setTimeout(() => {
                    loadWebsite(editorInstance, currentTemplate);
                  }, 200);
                } else {
                  console.log("⚠️  No template to load");
                  setIsLoading(false);
                }
              } else {
                console.log("⏳ Waiting for canvas to be ready...");
                setTimeout(waitForCanvas, 100);
              }
            };

            // Start waiting for canvas
            setTimeout(waitForCanvas, 100);
          } else {
            console.log("⏳ Waiting for editor initialization...");
            setTimeout(waitForInitialization, 100);
          }
        };

        // Start checking for full initialization
        setTimeout(waitForInitialization, 100);
      });

      editorInstance.on("error", (err) => {
        console.error("❌ GrapesJS error:", err);
        setLoadError(err.message || "Unknown GrapesJS error occurred");
        setIsLoading(false);
        setIsInitializing(false);
      });

      // Add additional error handling for WebGL issues
      try {
        const canvas =
          editorInstance.Canvas?.getFrameEl?.() ||
          editorInstance.Canvas?.getCanvas?.() ||
          editorInstance.Canvas?.getBody?.()?.querySelector?.("canvas") ||
          editorInstance.getContainer?.()?.querySelector?.("canvas");

        if (canvas && typeof canvas.getContext === "function") {
          canvas.addEventListener("webglcontextlost", (event) => {
            console.warn("⚠️ WebGL context lost");
            event.preventDefault();
            setLoadError("WebGL context lost. Please refresh the page.");
            setIsLoading(false);
          });

          canvas.addEventListener("webglcontextrestored", () => {
            console.log("✅ WebGL context restored");
            // Optionally reload the editor
          });
        }
      } catch (e) {
        console.warn("Could not access canvas for WebGL error handling:", e);
      }

      return () => {
        console.log("🧹 Cleaning up editor");
        clearTimeout(timeout);
        if (editorInstance) {
          try {
            // Clean up WebGL contexts
            try {
              const canvas =
                editorInstance.Canvas?.getFrameEl?.() ||
                editorInstance.Canvas?.getCanvas?.() ||
                editorInstance.Canvas?.getBody?.()?.querySelector?.("canvas") ||
                editorInstance.getContainer?.()?.querySelector?.("canvas");

              if (canvas && typeof canvas.getContext === "function") {
                const gl =
                  canvas.getContext("webgl") || canvas.getContext("webgl2");
                if (gl) {
                  const ext = gl.getExtension("WEBGL_lose_context");
                  if (ext) {
                    ext.loseContext();
                  }
                }
              }
            } catch (e) {
              console.warn("Could not access canvas for WebGL cleanup:", e);
            }

            // Destroy GrapesJS editor
            editorInstance.destroy();
          } catch (e) {
            console.error("Error destroying editor:", e);
          }
        }
      };
    } catch (error) {
      console.error("❌ Init error:", error);
      clearTimeout(timeout);
      setLoadError(error.message);
      setIsLoading(false);
      setIsInitializing(false);
    }
  }, [refReady, currentTemplate, loadWebsite]); // eslint-disable-line react-hooks/exhaustive-deps
  // Note: We intentionally exclude 'editor' and 'isInitializing' from dependencies
  // to prevent re-initialization when editor state changes

  // Handle template changes
  useEffect(() => {
    if (!editor || !templateData || templateData.id === currentTemplate?.id)
      return;

    console.log("🔄 Template changed:", templateData.name);
    setCurrentTemplate(templateData);
    setIsLoading(true);

    // Use setTimeout to ensure editor is ready
    setTimeout(() => {
      if (editor && editor.DomComponents && editor.CssComposer) {
        loadWebsite(editor, templateData);
      } else {
        console.log("⏳ Editor not ready for template loading");
        setIsLoading(false);
      }
    }, 100);
  }, [editor, templateData, currentTemplate, loadWebsite]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (editor) {
        try {
          console.log("🧹 Component unmounting - cleaning up editor");

          // Clean up WebGL contexts
          try {
            const canvas =
              editor.Canvas?.getFrameEl?.() ||
              editor.Canvas?.getCanvas?.() ||
              editor.Canvas?.getBody?.()?.querySelector?.("canvas") ||
              editor.getContainer?.()?.querySelector?.("canvas");

            if (canvas && typeof canvas.getContext === "function") {
              const gl =
                canvas.getContext("webgl") || canvas.getContext("webgl2");
              if (gl) {
                const ext = gl.getExtension("WEBGL_lose_context");
                if (ext) {
                  ext.loseContext();
                }
              }
            }
          } catch (e) {
            console.warn(
              "Could not access canvas for WebGL cleanup on unmount:",
              e
            );
          }

          // Destroy GrapesJS editor
          editor.destroy();
        } catch (e) {
          console.error("Error cleaning up editor on unmount:", e);
        }
      }
    };
  }, [editor, currentTemplate, loadWebsite]);

  const handleSave = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      const data = {
        html: editor.getHtml(),
        css: editor.getCss(),
        website: currentTemplate,
      };
      if (onSave) await onSave(data);
      alert("Saved!");
    } catch (error) {
      alert("Save failed!");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!editor) return;
    setIsSaving(true);
    try {
      const data = {
        html: editor.getHtml(),
        css: editor.getCss(),
        website: currentTemplate,
      };
      if (onPublish) await onPublish(data);
      alert("Published!");
    } catch (error) {
      alert("Publish failed!");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateStyle = useCallback(
    (property, value) => {
      if (!editor || !selectedElement) return;

      const map = {
        backgroundColor: "background-color",
        fontFamily: "font-family",
        fontSize: "font-size",
        fontWeight: "font-weight",
      };

      const prop = map[property] || property;
      selectedElement.setStyle({
        ...selectedElement.getStyle(),
        [prop]: value,
      });
      editor.render();
    },
    [editor, selectedElement]
  );

  const handleUpdateContent = useCallback(
    (field, value, isModified = false) => {
      if (isModified) {
        setContentModified(true);
        console.log(
          "📝 Content marked as modified - preventing HTML regeneration"
        );
      }

      if (!editor || !selectedElement) return;
      if (field === "text") {
        selectedElement.set("content", value);
        editor.render();
      }
    },
    [editor, selectedElement]
  );

  // Loading overlay with better error handling
  const LoadingOverlay = () => (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-50">
      <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
        {loadError ? (
          <>
            <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Loading Error
            </h2>
            <p className="text-gray-600 mb-4">
              There was an issue loading the editor
            </p>
            <div className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3 mb-4">
              {loadError}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reload Page
            </button>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Loading Editor
            </h2>
            <p className="text-gray-600 mb-4">
              Setting up your website builder...
            </p>
            {currentTemplate && (
              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-2 mb-2">
                Loading: {currentTemplate.name}
              </div>
            )}
            <div className="text-xs text-gray-400 bg-gray-50 rounded-lg px-4 py-2 mb-2">
              Ref Ready: {refReady ? "✅" : "⏳"} | Editor:{" "}
              {editor ? "✅" : "⏳"} | Initializing:{" "}
              {isInitializing ? "⏳" : "✅"}
            </div>
            <div className="text-xs text-gray-400 mt-2">
              This may take a few moments...
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 relative">
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900">
            {currentTemplate?.name || "Website Builder"}
          </h2>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md">
              Desktop
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Tablet
            </button>
            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
              Mobile
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto bg-gray-100 p-4">
          <div
            className="bg-white shadow-lg mx-auto"
            style={{ maxWidth: "1400px" }}
          >
            <div
              ref={editorRef}
              style={{ height: "calc(100vh - 160px)", minHeight: "600px" }}
            >
              {/* Interactive website preview */}
              {currentTemplate && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    overflow: "auto",
                    position: "relative",
                  }}
                >
                  <style>{`
                    ${generateWebsiteCSS()}
                    
                    /* Interactive styles */
                    .editable {
                      cursor: pointer;
                      transition: all 0.2s ease;
                      position: relative;
                    }
                    
                    .editable:hover {
                      outline: 2px solid #667eea;
                      outline-offset: 2px;
                    }
                    
                    .editable.selected {
                      outline: 3px solid #ff6b6b;
                      outline-offset: 2px;
                    }
                    
                    .editable::after {
                      content: '✏️';
                      position: absolute;
                      top: -10px;
                      right: -10px;
                      background: #667eea;
                      color: white;
                      border-radius: 50%;
                      width: 20px;
                      height: 20px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 10px;
                      opacity: 0;
                      transition: opacity 0.2s ease;
                    }
                    
                    .editable:hover::after {
                      opacity: 1;
                    }
                  `}</style>

                  <div
                    ref={(containerRef) => {
                      if (containerRef && currentTemplate) {
                        // Only set content if not already initialized and not modified
                        if (!contentInitialized.current && !contentModified) {
                          console.log("🔄 Setting initial HTML content");
                          containerRef.innerHTML =
                            generateWebsiteHTML(currentTemplate);
                          contentInitialized.current = true;

                          // Add editable classes to all interactive elements
                          setTimeout(() => {
                            const textElements = containerRef.querySelectorAll(
                              "h1, h2, h3, h4, h5, h6, p, span, a, button, div"
                            );
                            textElements.forEach((element) => {
                              element.classList.add("editable");
                            });
                          }, 100);
                        } else if (contentModified) {
                          console.log(
                            "🚫 Skipping HTML regeneration - content modified"
                          );
                        } else if (contentInitialized.current) {
                          console.log(
                            "🚫 Skipping HTML regeneration - already initialized"
                          );
                        }
                      }
                    }}
                    onClick={(e) => {
                      // Remove previous selections
                      document.querySelectorAll(".editable").forEach((el) => {
                        el.classList.remove("selected");
                      });

                      // Find the clicked element
                      const target = e.target;
                      if (target) {
                        target.classList.add("selected");
                        setSelectedElement({
                          tagName: target.tagName,
                          textContent: target.textContent,
                          className: target.className,
                          id: target.id,
                          style: target.style.cssText,
                          element: target,
                        });
                        console.log("Element selected:", target);
                      }
                    }}
                  />
                </div>
              )}

              {/* Debug info */}
              {process.env.NODE_ENV === "development" && (
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "rgba(0,0,0,0.8)",
                    color: "white",
                    padding: "10px",
                    fontSize: "12px",
                    zIndex: 1000,
                    borderRadius: "4px",
                  }}
                >
                  <div>Editor: {editor ? "✅" : "❌"}</div>
                  <div>Loading: {isLoading ? "⏳" : "✅"}</div>
                  <div>Template: {currentTemplate?.name || "None"}</div>
                  <div>Mode: Simple HTML Preview</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CustomizationPanel
          selectedElement={selectedElement}
          onUpdateStyle={handleUpdateStyle}
          onUpdateContent={handleUpdateContent}
          editor={editor}
        />
      </div>

      <div id="style-manager-container" style={{ display: "none" }}></div>
      <div id="layer-manager-container" style={{ display: "none" }}></div>
      <div id="trait-manager-container" style={{ display: "none" }}></div>
      <div id="blocks-container" style={{ display: "none" }}></div>
    </div>
  );
};

export default GrapesJSEditor;
