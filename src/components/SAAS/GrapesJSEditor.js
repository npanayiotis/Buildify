import React, { useEffect, useRef, useState, useCallback } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage";
import "grapesjs-blocks-basic";
import "grapesjs-plugin-forms";
import "grapesjs-component-countdown";
import "grapesjs-plugin-export";
import "grapesjs-plugin-ckeditor";

const GrapesJSEditor = ({ templateData, onSave, onPublish }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const generateTemplateHTML = useCallback((template) => {
    const content = template.fullContent || template.components;

    switch (template.category) {
      case "saas":
        return `
          <div class="hero-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px 20px; text-align: center; color: white;">
            <div style="max-width: 1200px; margin: 0 auto;">
              <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">${
                content.hero?.title || "Build Something Amazing"
              }</h1>
              <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">${
                content.hero?.subtitle ||
                "The easiest way to create stunning websites for your business."
              }</p>
              <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">${
                content.hero?.buttonText || "Get Started Free"
              }</button>
            </div>
          </div>
          <div class="features-section" style="padding: 80px 20px; background: #f8f9fa;">
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
        `;
      default:
        return `
          <div style="padding: 80px 20px; text-align: center; background: #f8f9fa;">
            <h1 style="font-size: 3rem; margin-bottom: 1rem; color: #333;">Welcome to Your Website</h1>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 2rem;">Start customizing your page by adding components from the left panel.</p>
            <button style="background: #007bff; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">Get Started</button>
          </div>
        `;
    }
  }, []);

  const generateTemplateCSS = useCallback((template) => {
    return `
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .hero-section {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .features-section {
        background: #f8f9fa;
      }
    `;
  }, []);

  const loadTemplate = useCallback(
    (editorInstance, template) => {
      const templateHTML = generateTemplateHTML(template);
      const templateCSS = generateTemplateCSS(template);

      editorInstance.setComponents(templateHTML);
      editorInstance.setStyle(templateCSS);
    },
    [generateTemplateHTML, generateTemplateCSS]
  );

  useEffect(() => {
    if (!editorRef.current) return;

    const loadingTimeout = setTimeout(() => {
      if (isLoading) {
        console.warn("Editor loading timeout - forcing completion");
        setIsLoading(false);
      }
    }, 5000);

    const initEditor = async () => {
      try {
        console.log("Initializing GrapesJS editor...");
        const editorInstance = grapesjs.init({
          container: editorRef.current,
          height: "100vh",
          width: "100%",
          storageManager: false,
          plugins: [
            "gjs-preset-webpage",
            "gjs-blocks-basic",
            "gjs-plugin-forms",
            "gjs-component-countdown",
            "gjs-plugin-export",
            "gjs-plugin-ckeditor",
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
            "gjs-plugin-forms": {
              blocks: [
                "form",
                "input",
                "textarea",
                "select",
                "button",
                "label",
                "checkbox",
                "radio",
              ],
            },
            "gjs-plugin-ckeditor": {
              position: "center",
              options: {
                startupFocus: true,
                extraAllowedContent: "*(*);*{*}",
              },
            },
          },
          blockManager: {
            appendTo: ".blocks-container",
          },
          layerManager: {
            appendTo: ".layers-container",
          },
          traitManager: {
            appendTo: ".traits-container",
          },
          selectorManager: {
            appendTo: ".styles-container",
          },
        });

        editorInstance.on("load", () => {
          console.log("GrapesJS editor loaded successfully");

          if (templateData) {
            try {
              loadTemplate(editorInstance, templateData);
              console.log("Template loaded successfully");
            } catch (templateError) {
              console.error("Failed to load template:", templateError);
            }
          }

          try {
            addCustomBlocks(editorInstance);
            console.log("Custom blocks added successfully");
          } catch (blocksError) {
            console.error("Failed to add custom blocks:", blocksError);
          }

          setEditor(editorInstance);
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        });

        editorInstance.on("error", (error) => {
          console.error("GrapesJS editor error:", error);
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        });
      } catch (error) {
        console.error("Failed to initialize GrapesJS editor:", error);
        setIsLoading(false);
        clearTimeout(loadingTimeout);
      }
    };

    initEditor();

    return () => {
      clearTimeout(loadingTimeout);
      if (editor) {
        editor.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateData, loadTemplate]);

  const addCustomBlocks = (editorInstance) => {
    const blockManager = editorInstance.BlockManager;

    blockManager.add("hero-block", {
      label: "Hero Section",
      content: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 100px 20px; text-align: center; color: white;">
          <h1 style="font-size: 3rem; font-weight: bold; margin-bottom: 1rem;">Your Amazing Title</h1>
          <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">Your compelling subtitle goes here</p>
          <button style="background: #ff6b6b; color: white; border: none; padding: 15px 30px; font-size: 1.1rem; border-radius: 8px; cursor: pointer;">Get Started</button>
              </div>
      `,
      category: "Custom Blocks",
    });

    blockManager.add("features-block", {
      label: "Features Section",
      content: `
        <div style="padding: 80px 20px; background: #f8f9fa;">
          <div style="max-width: 1200px; margin: 0 auto;">
            <h2 style="text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Features</h2>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
              <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">🚀</div>
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #333;">Fast</h3>
                <p style="color: #666; line-height: 1.6;">Lightning fast performance</p>
                  </div>
              </div>
            </div>
          </div>
      `,
      category: "Custom Blocks",
    });
  };

  const handleSave = async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();

      console.log("Saving page:", { html, css });

      if (onSave) {
        onSave({ html, css });
      }

      editor.Modal.setTitle("Success");
      editor.Modal.setContent("Page saved successfully!");
      editor.Modal.open();
    } catch (error) {
      console.error("Failed to save:", error);
      editor.Modal.setTitle("Error");
      editor.Modal.setContent("Failed to save page. Please try again.");
      editor.Modal.open();
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!editor) return;

    setIsSaving(true);
    try {
      const html = editor.getHtml();
      const css = editor.getCss();

      console.log("Publishing page:", { html, css });

      if (onPublish) {
        onPublish({ html, css });
      }

      editor.Modal.setTitle("Success");
      editor.Modal.setContent("Page published successfully!");
      editor.Modal.open();
    } catch (error) {
      console.error("Failed to publish:", error);
      editor.Modal.setTitle("Error");
      editor.Modal.setContent("Failed to publish page. Please try again.");
      editor.Modal.open();
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading Editor
          </h2>
          <p className="text-gray-600 mb-4">
            Setting up your website builder...
          </p>
          <div className="text-sm text-gray-500">
            {templateData
              ? `Loading ${templateData.name} template`
              : "Initializing blank canvas"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-wrapper">
      <div className="editor-toolbar bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {templateData ? templateData.name : "Website Editor"}
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={handlePublish}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isSaving ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="editor-content flex h-full">
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Blocks</h3>
            <div className="blocks-container"></div>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="editor-row h-full">
            <div className="gjs-editor" style={{ height: "100%" }}>
              <div ref={editorRef} className="h-full"></div>
            </div>
          </div>
        </div>

        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="layers-container">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Layers</h3>
            </div>
            <div className="styles-container" style={{ display: "none" }}>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Styles</h3>
            </div>
            <div className="traits-container" style={{ display: "none" }}>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Settings
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrapesJSEditor;
