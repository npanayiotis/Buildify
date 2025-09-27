import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  ArrowLeft,
  Save,
  Eye,
  Palette,
  Settings,
  Layers,
  Plus,
  Trash2,
  Copy,
  Move,
} from "lucide-react";
import PageBuilder from "../components/SAAS/PageBuilder";
import WidgetPanel from "../components/SAAS/PageBuilder/WidgetPanel";
import PropertyPanel from "../components/SAAS/PageBuilder/PropertyPanel";
import PreviewModal from "../components/SAAS/PageBuilder/PreviewModal";
import { SAAS_TEMPLATES, WIDGET_TYPES } from "../lib/saas/templates/templateData";

const BuilderPage = () => {
  const router = useRouter();
  const { template: templateId } = router.query;
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activePanel, setActivePanel] = useState("widgets");
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [widgets, setWidgets] = useState([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (templateId) {
      const template = SAAS_TEMPLATES.find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        // Initialize with template's default widgets
        initializeTemplate(template);
      }
    } else {
      // Load from localStorage if no template specified
      const savedTemplate = localStorage.getItem("selectedTemplate");
      if (savedTemplate) {
        const template = JSON.parse(savedTemplate);
        setSelectedTemplate(template);
        initializeTemplate(template);
      }
    }
  }, [templateId]);

  const initializeTemplate = (template) => {
    // Convert template components to widgets
    const initialWidgets = [
      {
        id: "hero-1",
        type: "hero",
        data: template.components.hero,
        position: 0,
      },
    ];

    if (template.components.features) {
      initialWidgets.push({
        id: "features-1",
        type: "features",
        data: { items: template.components.features },
        position: 1,
      });
    }

    if (template.components.portfolio) {
      initialWidgets.push({
        id: "portfolio-1",
        type: "portfolio",
        data: { items: template.components.portfolio },
        position: 2,
      });
    }

    if (template.components.menu) {
      initialWidgets.push({
        id: "menu-1",
        type: "menu",
        data: { items: template.components.menu },
        position: 3,
      });
    }

    if (template.components.products) {
      initialWidgets.push({
        id: "products-1",
        type: "products",
        data: { items: template.components.products },
        position: 4,
      });
    }

    if (template.components.services) {
      initialWidgets.push({
        id: "services-1",
        type: "services",
        data: { items: template.components.services },
        position: 5,
      });
    }

    if (template.components.posts) {
      initialWidgets.push({
        id: "posts-1",
        type: "posts",
        data: { items: template.components.posts },
        position: 6,
      });
    }

    setWidgets(initialWidgets);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      setHasUnsavedChanges(true);
    }
  };

  const addWidget = (widgetType) => {
    const newWidget = {
      id: `${widgetType}-${Date.now()}`,
      type: widgetType,
      data: getDefaultWidgetData(widgetType),
      position: widgets.length,
    };

    setWidgets([...widgets, newWidget]);
    setSelectedWidget(newWidget);
    setHasUnsavedChanges(true);
  };

  const getDefaultWidgetData = (type) => {
    const defaults = {
      hero: {
        title: "Your Amazing Title",
        subtitle: "Add your compelling subtitle here",
        buttonText: "Get Started",
        backgroundImage: "/api/placeholder/1200/600"
      },
      text: {
        content: "Add your text content here...",
        align: "left"
      },
      image: {
        src: "/api/placeholder/600/400",
        alt: "Image description",
        caption: ""
      },
      button: {
        text: "Click Me",
        link: "#",
        style: "primary"
      },
      features: {
        items: [
          { icon: "⭐", title: "Feature 1", description: "Description here" },
          { icon: "⭐", title: "Feature 2", description: "Description here" },
          { icon: "⭐", title: "Feature 3", description: "Description here" }
        ]
      },
      testimonials: {
        items: [
          { name: "John Doe", role: "CEO", content: "Amazing service!", avatar: "/api/placeholder/60/60" },
          { name: "Jane Smith", role: "Designer", content: "Love the results!", avatar: "/api/placeholder/60/60" }
        ]
      },
      contact: {
        title: "Get in Touch",
        description: "Send us a message",
        fields: ["name", "email", "message"]
      },
      pricing: {
        title: "Choose Your Plan",
        plans: [
          { name: "Basic", price: "$9", features: ["Feature 1", "Feature 2"] },
          { name: "Pro", price: "$19", features: ["Feature 1", "Feature 2", "Feature 3"] }
        ]
      }
    };

    return defaults[type] || {};
  };

  const updateWidget = (widgetId, data) => {
    setWidgets(widgets.map(widget => 
      widget.id === widgetId 
        ? { ...widget, data: { ...widget.data, ...data } }
        : widget
    ));
    setHasUnsavedChanges(true);
  };

  const deleteWidget = (widgetId) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
    if (selectedWidget?.id === widgetId) {
      setSelectedWidget(null);
    }
    setHasUnsavedChanges(true);
  };

  const duplicateWidget = (widgetId) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `${widget.type}-${Date.now()}`,
        position: widget.position + 1
      };
      const newWidgets = [...widgets];
      newWidgets.splice(widget.position + 1, 0, newWidget);
      setWidgets(newWidgets);
      setHasUnsavedChanges(true);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage or API
      const pageData = {
        template: selectedTemplate,
        widgets: widgets,
        lastModified: new Date().toISOString()
      };
      
      localStorage.setItem(`page-${templateId || 'custom'}`, JSON.stringify(pageData));
      setHasUnsavedChanges(false);
      
      // Show success message
      console.log("Page saved successfully!");
    } catch (error) {
      console.error("Error saving page:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirmed = confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmed) return;
    }
    router.push("/templates");
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading template...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Templates</span>
          </button>
          <div className="h-6 w-px bg-gray-300" />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {selectedTemplate.name}
            </h1>
            <p className="text-sm text-gray-500">
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePreview}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Saving..." : "Save"}</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Widgets */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex space-x-1">
              <button
                onClick={() => setActivePanel("widgets")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activePanel === "widgets"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Widgets</span>
              </button>
              <button
                onClick={() => setActivePanel("layers")}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activePanel === "layers"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Layers</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {activePanel === "widgets" && (
              <WidgetPanel
                widgets={WIDGET_TYPES}
                onAddWidget={addWidget}
              />
            )}
            {activePanel === "layers" && (
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Page Layers</h3>
                <div className="space-y-2">
                  {widgets.map((widget, index) => (
                    <div
                      key={widget.id}
                      className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedWidget?.id === widget.id
                          ? "bg-blue-100 text-blue-700"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => setSelectedWidget(widget)}
                    >
                      <div className="flex items-center space-x-2">
                        <Move className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">
                          {WIDGET_TYPES.find(w => w.id === widget.type)?.name || widget.type}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            duplicateWidget(widget.id);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteWidget(widget.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 flex flex-col">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <div className="flex-1 overflow-y-auto bg-gray-50 p-8">
              <div className="max-w-4xl mx-auto">
                <PageBuilder
                  widgets={widgets}
                  selectedWidget={selectedWidget}
                  onSelectWidget={setSelectedWidget}
                  onUpdateWidget={updateWidget}
                />
              </div>
            </div>
          </DndContext>
        </div>

        {/* Right Sidebar - Properties */}
        {selectedWidget && (
          <div className="w-80 bg-white border-l border-gray-200">
            <PropertyPanel
              widget={selectedWidget}
              onUpdate={(data) => updateWidget(selectedWidget.id, data)}
            />
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        widgets={widgets}
        template={selectedTemplate}
      />
    </div>
  );
};

export default BuilderPage;
