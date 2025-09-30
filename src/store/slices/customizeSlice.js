/**
 * Customize Redux Slice
 * Manages website customization state and editor data
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ========================================
// ASYNC THUNKS
// ========================================

// Save website customization
export const saveWebsiteCustomization = createAsyncThunk(
  "customize/saveWebsiteCustomization",
  async ({ websiteId, customizationData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/websites/${websiteId}/customize`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customizationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save customization");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load website for customization
export const loadWebsiteForCustomization = createAsyncThunk(
  "customize/loadWebsiteForCustomization",
  async (websiteId, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/websites/${websiteId}/customize`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to load website");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  // Editor state
  isEditing: false,
  hasUnsavedChanges: false,
  lastSaved: null,

  // Website data
  websiteData: null,
  originalData: null,

  // Editor components
  selectedComponent: null,
  componentHistory: [],
  historyIndex: -1,

  // UI state
  sidebarOpen: true,
  previewMode: "desktop", // desktop, tablet, mobile
  zoomLevel: 1,

  // Loading and error states
  loading: false,
  saving: false,
  error: null,
  saveError: null,
};

// ========================================
// SLICE
// ========================================

const customizeSlice = createSlice({
  name: "customize",
  initialState,
  reducers: {
    // Initialize editor
    initializeEditor: (state, action) => {
      state.websiteData = action.payload;
      state.originalData = JSON.parse(JSON.stringify(action.payload));
      state.isEditing = true;
      state.hasUnsavedChanges = false;
      state.lastSaved = null;
      state.componentHistory = [JSON.parse(JSON.stringify(action.payload))];
      state.historyIndex = 0;
    },

    // Update website data
    updateWebsiteData: (state, action) => {
      state.websiteData = { ...state.websiteData, ...action.payload };
      state.hasUnsavedChanges = true;
    },

    // Update page content
    updatePageContent: (state, action) => {
      const { pageId, content } = action.payload;

      if (state.websiteData && state.websiteData.pages) {
        const pageIndex = state.websiteData.pages.findIndex(
          (p) => p.id === pageId
        );
        if (pageIndex !== -1) {
          state.websiteData.pages[pageIndex].content = content;
          state.hasUnsavedChanges = true;
        }
      }
    },

    // Add component
    addComponent: (state, action) => {
      const { pageId, component, position } = action.payload;

      if (state.websiteData && state.websiteData.pages) {
        const pageIndex = state.websiteData.pages.findIndex(
          (p) => p.id === pageId
        );
        if (pageIndex !== -1) {
          const page = state.websiteData.pages[pageIndex];
          const content = Array.isArray(page.content) ? page.content : [];

          if (position !== undefined) {
            content.splice(position, 0, component);
          } else {
            content.push(component);
          }

          page.content = content;
          state.hasUnsavedChanges = true;
        }
      }
    },

    // Update component
    updateComponent: (state, action) => {
      const { pageId, componentId, updates } = action.payload;

      if (state.websiteData && state.websiteData.pages) {
        const pageIndex = state.websiteData.pages.findIndex(
          (p) => p.id === pageId
        );
        if (pageIndex !== -1) {
          const page = state.websiteData.pages[pageIndex];
          const content = Array.isArray(page.content) ? page.content : [];

          const componentIndex = content.findIndex((c) => c.id === componentId);
          if (componentIndex !== -1) {
            content[componentIndex] = {
              ...content[componentIndex],
              ...updates,
            };
            state.hasUnsavedChanges = true;
          }
        }
      }
    },

    // Remove component
    removeComponent: (state, action) => {
      const { pageId, componentId } = action.payload;

      if (state.websiteData && state.websiteData.pages) {
        const pageIndex = state.websiteData.pages.findIndex(
          (p) => p.id === pageId
        );
        if (pageIndex !== -1) {
          const page = state.websiteData.pages[pageIndex];
          const content = Array.isArray(page.content) ? page.content : [];

          page.content = content.filter((c) => c.id !== componentId);
          state.hasUnsavedChanges = true;
        }
      }
    },

    // Select component
    selectComponent: (state, action) => {
      state.selectedComponent = action.payload;
    },

    // Clear component selection
    clearComponentSelection: (state) => {
      state.selectedComponent = null;
    },

    // Toggle sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    // Set preview mode
    setPreviewMode: (state, action) => {
      state.previewMode = action.payload;
    },

    // Set zoom level
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },

    // Undo
    undo: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        state.websiteData = JSON.parse(
          JSON.stringify(state.componentHistory[state.historyIndex])
        );
        state.hasUnsavedChanges = true;
      }
    },

    // Redo
    redo: (state) => {
      if (state.historyIndex < state.componentHistory.length - 1) {
        state.historyIndex++;
        state.websiteData = JSON.parse(
          JSON.stringify(state.componentHistory[state.historyIndex])
        );
        state.hasUnsavedChanges = true;
      }
    },

    // Add to history
    addToHistory: (state) => {
      const newState = JSON.parse(JSON.stringify(state.websiteData));

      // Remove any history after current index
      state.componentHistory = state.componentHistory.slice(
        0,
        state.historyIndex + 1
      );

      // Add new state
      state.componentHistory.push(newState);
      state.historyIndex = state.componentHistory.length - 1;

      // Limit history size
      if (state.componentHistory.length > 50) {
        state.componentHistory.shift();
        state.historyIndex--;
      }
    },

    // Reset to original
    resetToOriginal: (state) => {
      state.websiteData = JSON.parse(JSON.stringify(state.originalData));
      state.hasUnsavedChanges = false;
      state.componentHistory = [JSON.parse(JSON.stringify(state.originalData))];
      state.historyIndex = 0;
    },

    // Mark as saved
    markAsSaved: (state) => {
      state.hasUnsavedChanges = false;
      state.lastSaved = new Date().toISOString();
      state.originalData = JSON.parse(JSON.stringify(state.websiteData));
    },

    // Clear editor
    clearEditor: (state) => {
      state.isEditing = false;
      state.hasUnsavedChanges = false;
      state.lastSaved = null;
      state.websiteData = null;
      state.originalData = null;
      state.selectedComponent = null;
      state.componentHistory = [];
      state.historyIndex = -1;
      state.sidebarOpen = true;
      state.previewMode = "desktop";
      state.zoomLevel = 1;
      state.loading = false;
      state.saving = false;
      state.error = null;
      state.saveError = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
      state.saveError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Load website for customization
      .addCase(loadWebsiteForCustomization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWebsiteForCustomization.fulfilled, (state, action) => {
        state.loading = false;
        state.websiteData = action.payload;
        state.originalData = JSON.parse(JSON.stringify(action.payload));
        state.isEditing = true;
        state.hasUnsavedChanges = false;
        state.componentHistory = [JSON.parse(JSON.stringify(action.payload))];
        state.historyIndex = 0;
      })
      .addCase(loadWebsiteForCustomization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save website customization
      .addCase(saveWebsiteCustomization.pending, (state) => {
        state.saving = true;
        state.saveError = null;
      })
      .addCase(saveWebsiteCustomization.fulfilled, (state, action) => {
        state.saving = false;
        state.hasUnsavedChanges = false;
        state.lastSaved = new Date().toISOString();
        state.originalData = JSON.parse(JSON.stringify(state.websiteData));
      })
      .addCase(saveWebsiteCustomization.rejected, (state, action) => {
        state.saving = false;
        state.saveError = action.payload;
      });
  },
});

// ========================================
// ACTIONS
// ========================================

export const {
  initializeEditor,
  updateWebsiteData,
  updatePageContent,
  addComponent,
  updateComponent,
  removeComponent,
  selectComponent,
  clearComponentSelection,
  toggleSidebar,
  setPreviewMode,
  setZoomLevel,
  undo,
  redo,
  addToHistory,
  resetToOriginal,
  markAsSaved,
  clearEditor,
  clearError,
} = customizeSlice.actions;

// ========================================
// SELECTORS
// ========================================

export const selectIsEditing = (state) => state.customize.isEditing;
export const selectHasUnsavedChanges = (state) =>
  state.customize.hasUnsavedChanges;
export const selectLastSaved = (state) => state.customize.lastSaved;
export const selectWebsiteData = (state) => state.customize.websiteData;
export const selectOriginalData = (state) => state.customize.originalData;
export const selectSelectedComponent = (state) =>
  state.customize.selectedComponent;
export const selectSidebarOpen = (state) => state.customize.sidebarOpen;
export const selectPreviewMode = (state) => state.customize.previewMode;
export const selectZoomLevel = (state) => state.customize.zoomLevel;
export const selectCanUndo = (state) => state.customize.historyIndex > 0;
export const selectCanRedo = (state) =>
  state.customize.historyIndex < state.customize.componentHistory.length - 1;
export const selectLoading = (state) => state.customize.loading;
export const selectSaving = (state) => state.customize.saving;
export const selectError = (state) => state.customize.error;
export const selectSaveError = (state) => state.customize.saveError;

// Select current page
export const selectCurrentPage = (state) => {
  const websiteData = state.customize.websiteData;
  if (!websiteData || !websiteData.pages) return null;
  return websiteData.pages.find((p) => p.isHomepage) || websiteData.pages[0];
};

// Select page by ID
export const selectPageById = (state, pageId) => {
  const websiteData = state.customize.websiteData;
  if (!websiteData || !websiteData.pages) return null;
  return websiteData.pages.find((p) => p.id === pageId);
};

export default customizeSlice.reducer;
