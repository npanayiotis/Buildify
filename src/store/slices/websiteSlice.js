/**
 * Website Redux Slice
 * Manages website data, templates, and publishing state
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ========================================
// ASYNC THUNKS
// ========================================

// Fetch user's websites
export const fetchWebsites = createAsyncThunk(
  "website/fetchWebsites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/websites");
      if (!response.ok) {
        throw new Error("Failed to fetch websites");
      }
      const data = await response.json();
      return data.websites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Create new website
export const createWebsite = createAsyncThunk(
  "website/createWebsite",
  async (websiteData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/websites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(websiteData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create website");
      }

      const data = await response.json();
      return data.website;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update website
export const updateWebsite = createAsyncThunk(
  "website/updateWebsite",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/websites/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update website");
      }

      const data = await response.json();
      return data.website;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Publish website
export const publishWebsite = createAsyncThunk(
  "website/publishWebsite",
  async ({ id, force = false }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/websites/${id}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ force }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to publish website");
      }

      const data = await response.json();
      return { id, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  websites: [],
  currentWebsite: null,
  templates: [],
  loading: false,
  error: null,
  publishStatus: {
    isPublishing: false,
    publishError: null,
    lastPublished: null,
  },
};

// ========================================
// SLICE
// ========================================

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    // Set current website
    setCurrentWebsite: (state, action) => {
      state.currentWebsite = action.payload;
    },

    // Clear current website
    clearCurrentWebsite: (state) => {
      state.currentWebsite = null;
    },

    // Update website locally (for real-time updates)
    updateWebsiteLocally: (state, action) => {
      const { id, updates } = action.payload;
      const website = state.websites.find((w) => w.id === id);
      if (website) {
        Object.assign(website, updates);
      }

      if (state.currentWebsite && state.currentWebsite.id === id) {
        Object.assign(state.currentWebsite, updates);
      }
    },

    // Add website to list
    addWebsite: (state, action) => {
      state.websites.unshift(action.payload);
    },

    // Remove website from list
    removeWebsite: (state, action) => {
      state.websites = state.websites.filter((w) => w.id !== action.payload);
      if (state.currentWebsite && state.currentWebsite.id === action.payload) {
        state.currentWebsite = null;
      }
    },

    // Set templates
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Clear publish status
    clearPublishStatus: (state) => {
      state.publishStatus = {
        isPublishing: false,
        publishError: null,
        lastPublished: null,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch websites
      .addCase(fetchWebsites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWebsites.fulfilled, (state, action) => {
        state.loading = false;
        state.websites = action.payload;
      })
      .addCase(fetchWebsites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create website
      .addCase(createWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createWebsite.fulfilled, (state, action) => {
        state.loading = false;
        state.websites.unshift(action.payload);
        state.currentWebsite = action.payload;
      })
      .addCase(createWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update website
      .addCase(updateWebsite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWebsite.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.websites.findIndex(
          (w) => w.id === action.payload.id
        );
        if (index !== -1) {
          state.websites[index] = action.payload;
        }
        if (
          state.currentWebsite &&
          state.currentWebsite.id === action.payload.id
        ) {
          state.currentWebsite = action.payload;
        }
      })
      .addCase(updateWebsite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Publish website
      .addCase(publishWebsite.pending, (state) => {
        state.publishStatus.isPublishing = true;
        state.publishStatus.publishError = null;
      })
      .addCase(publishWebsite.fulfilled, (state, action) => {
        state.publishStatus.isPublishing = false;
        state.publishStatus.lastPublished = action.payload;

        // Update website published status
        const website = state.websites.find((w) => w.id === action.payload.id);
        if (website) {
          website.published = true;
          website.publishedAt = new Date().toISOString();
        }

        if (
          state.currentWebsite &&
          state.currentWebsite.id === action.payload.id
        ) {
          state.currentWebsite.published = true;
          state.currentWebsite.publishedAt = new Date().toISOString();
        }
      })
      .addCase(publishWebsite.rejected, (state, action) => {
        state.publishStatus.isPublishing = false;
        state.publishStatus.publishError = action.payload;
      });
  },
});

// ========================================
// ACTIONS
// ========================================

export const {
  setCurrentWebsite,
  clearCurrentWebsite,
  updateWebsiteLocally,
  addWebsite,
  removeWebsite,
  setTemplates,
  clearError,
  clearPublishStatus,
} = websiteSlice.actions;

// ========================================
// SELECTORS
// ========================================

export const selectWebsites = (state) => state.website.websites;
export const selectCurrentWebsite = (state) => state.website.currentWebsite;
export const selectTemplates = (state) => state.website.templates;
export const selectWebsiteLoading = (state) => state.website.loading;
export const selectWebsiteError = (state) => state.website.error;
export const selectPublishStatus = (state) => state.website.publishStatus;

// Select website by ID
export const selectWebsiteById = (state, id) =>
  state.website.websites.find((w) => w.id === id);

// Select published websites
export const selectPublishedWebsites = (state) =>
  state.website.websites.filter((w) => w.published);

// Select draft websites
export const selectDraftWebsites = (state) =>
  state.website.websites.filter((w) => !w.published);

export default websiteSlice.reducer;
