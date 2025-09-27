import React from "react";
import { motion } from "framer-motion";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  CSS,
} from "@dnd-kit/utilities";
import { GripVertical, Edit, Eye, EyeOff } from "lucide-react";

// Import widget components
import HeroWidget from "./Widgets/HeroWidget";
import TextWidget from "./Widgets/TextWidget";
import ImageWidget from "./Widgets/ImageWidget";
import ButtonWidget from "./Widgets/ButtonWidget";
import FeaturesWidget from "./Widgets/FeaturesWidget";
import TestimonialsWidget from "./Widgets/TestimonialsWidget";
import ContactWidget from "./Widgets/ContactWidget";
import PricingWidget from "./Widgets/PricingWidget";

const WidgetComponents = {
  hero: HeroWidget,
  text: TextWidget,
  image: ImageWidget,
  button: ButtonWidget,
  features: FeaturesWidget,
  testimonials: TestimonialsWidget,
  contact: ContactWidget,
  pricing: PricingWidget,
};

const SortableWidget = ({ widget, isSelected, onSelect, onUpdate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const WidgetComponent = WidgetComponents[widget.type];

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? "z-50" : ""}`}
    >
      {/* Widget Controls */}
      <div
        className={`absolute -left-10 top-0 z-10 flex flex-col space-y-1 transition-opacity duration-200 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <button
          {...attributes}
          {...listeners}
          className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-gray-600 hover:text-gray-900"
          title="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <button
          onClick={() => onSelect(widget)}
          className={`p-1 border rounded shadow-sm hover:bg-gray-50 ${
            isSelected
              ? "bg-blue-100 border-blue-300 text-blue-700"
              : "bg-white border-gray-300 text-gray-600 hover:text-gray-900"
          }`}
          title="Edit widget"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      {/* Widget Content */}
      <div
        className={`relative transition-all duration-200 ${
          isSelected
            ? "ring-2 ring-blue-500 ring-opacity-50"
            : "hover:ring-1 hover:ring-gray-300 hover:ring-opacity-50"
        } ${isDragging ? "opacity-50" : ""}`}
        onClick={() => onSelect(widget)}
      >
        {WidgetComponent ? (
          <WidgetComponent
            data={widget.data}
            isSelected={isSelected}
            onUpdate={(newData) => onUpdate(widget.id, newData)}
          />
        ) : (
          <div className="p-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg text-center">
            <p className="text-gray-500">Unknown widget type: {widget.type}</p>
          </div>
        )}
      </div>

      {/* Widget Label */}
      <div
        className={`absolute -top-6 left-0 px-2 py-1 bg-gray-800 text-white text-xs rounded transition-opacity duration-200 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {widget.type.charAt(0).toUpperCase() + widget.type.slice(1)} Widget
      </div>
    </div>
  );
};

const PageBuilder = ({ widgets, selectedWidget, onSelectWidget, onUpdateWidget }) => {
  return (
    <div className="space-y-8">
      <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SortableWidget
              widget={widget}
              isSelected={selectedWidget?.id === widget.id}
              onSelect={onSelectWidget}
              onUpdate={onUpdateWidget}
            />
          </motion.div>
        ))}
      </SortableContext>

      {/* Empty State */}
      {widgets.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Edit className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Start Building Your Page
          </h3>
          <p className="text-gray-600 mb-6">
            Add widgets from the sidebar to create your amazing page
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PageBuilder;
