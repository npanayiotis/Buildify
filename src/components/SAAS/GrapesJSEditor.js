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
        <section class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white; min-height: 400px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1.5rem;">${
              content.hero?.title || website.name || "Welcome"
            }</h1>
            <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">${
              content.hero?.subtitle ||
              website.description ||
              "Customize this website"
            }</p>
            <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 50px; cursor: pointer;">Get Started</button>
          </div>
        </section>
        
        <section style="padding: 60px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
            <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: #2d3748;">About</h2>
            <p style="font-size: 1.1rem; color: #4a5568; max-width: 800px; margin: 0 auto;">Customize this section with your content.</p>
          </div>
        </section>

        <section style="padding: 60px 20px;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="font-size: 2rem; margin-bottom: 2rem; color: #2d3748; text-align: center;">Features</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem;">
              <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Feature 1</h3>
                <p style="color: #4a5568;">Description here</p>
              </div>
              <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Feature 2</h3>
                <p style="color: #4a5568;">Description here</p>
              </div>
              <div style="padding: 2rem; background: #f8f9fa; border-radius: 8px;">
                <h3 style="font-size: 1.25rem; margin-bottom: 1rem;">Feature 3</h3>
                <p style="color: #4a5568;">Description here</p>
              </div>
            </div>
          </div>
        </section>
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

        // Enhanced approach - use multiple methods to ensure content loads
        console.log("📝 Setting components...");

        try {
          // Method 1: Use setComponents
          if (typeof editorInstance.setComponents === "function") {
            editorInstance.setComponents(html);
            console.log("✅ Components set via setComponents");
          } else {
            console.warn("⚠️ setComponents method not available");
          }

          // Method 2: Try setHtml if available
          if (typeof editorInstance.setHtml === "function") {
            editorInstance.setHtml(html);
            console.log("✅ HTML set via setHtml");
          }

          // Method 3: Try direct canvas manipulation
          const canvas = editorInstance.Canvas?.getFrameEl?.();
          if (canvas && canvas.contentDocument) {
            const iframeDoc = canvas.contentDocument;
            const iframeBody = iframeDoc.body;

            if (iframeBody) {
              iframeBody.innerHTML = html;
              console.log("✅ Content set directly to iframe");
            }
          }
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

    console.log("🚀 Initializing GrapesJS NOW!");
    setIsInitializing(true);

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
    (field, value) => {
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
            ></div>
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
