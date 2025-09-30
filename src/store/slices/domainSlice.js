/**
 * Domain Redux Slice
 * Manages domain-related state and operations
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ========================================
// ASYNC THUNKS
// ========================================

// Fetch user's domains
export const fetchDomains = createAsyncThunk(
  "domain/fetchDomains",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/domains");
      if (!response.ok) {
        throw new Error("Failed to fetch domains");
      }
      const data = await response.json();
      return data.domains;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add custom domain
export const addCustomDomain = createAsyncThunk(
  "domain/addCustomDomain",
  async ({ websiteId, domain }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/domains/${websiteId}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add domain");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Verify domain
export const verifyDomain = createAsyncThunk(
  "domain/verifyDomain",
  async ({ websiteId, domain }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/domains/${websiteId}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Domain verification failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove domain
export const removeDomain = createAsyncThunk(
  "domain/removeDomain",
  async ({ websiteId, domain }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/domains/${websiteId}/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove domain");
      }

      return { websiteId, domain };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Check domain availability
export const checkDomainAvailability = createAsyncThunk(
  "domain/checkDomainAvailability",
  async (domain, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/domains/check-availability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Domain availability check failed");
      }

      const data = await response.json();
      return { domain, ...data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  domains: [],
  loading: false,
  error: null,

  // Domain validation state
  validation: {
    isValidating: false,
    isValid: null,
    error: null,
    suggestions: [],
  },

  // Domain availability check
  availability: {
    isChecking: false,
    results: {},
    error: null,
  },
};

// ========================================
// SLICE
// ========================================

const domainSlice = createSlice({
  name: "domain",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },

    clearValidation: (state) => {
      state.validation = {
        isValidating: false,
        isValid: null,
        error: null,
        suggestions: [],
      };
    },

    clearAvailability: (state) => {
      state.availability = {
        isChecking: false,
        results: {},
        error: null,
      };
    },

    setDomainStatus: (state, action) => {
      const { domain, status } = action.payload;
      const domainObj = state.domains.find((d) => d.domain === domain);
      if (domainObj) {
        domainObj.status = status;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch domains
      .addCase(fetchDomains.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.loading = false;
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add custom domain
      .addCase(addCustomDomain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCustomDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.domains.push(action.payload);
      })
      .addCase(addCustomDomain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Verify domain
      .addCase(verifyDomain.pending, (state) => {
        state.validation.isValidating = true;
        state.validation.error = null;
      })
      .addCase(verifyDomain.fulfilled, (state, action) => {
        state.validation.isValidating = false;
        state.validation.isValid = action.payload.verified;

        // Update domain status
        const domainObj = state.domains.find(
          (d) => d.domain === action.payload.domain
        );
        if (domainObj) {
          domainObj.status = action.payload.verified ? "VERIFIED" : "PENDING";
        }
      })
      .addCase(verifyDomain.rejected, (state, action) => {
        state.validation.isValidating = false;
        state.validation.error = action.payload;
      })

      // Remove domain
      .addCase(removeDomain.fulfilled, (state, action) => {
        state.domains = state.domains.filter(
          (d) =>
            !(
              d.websiteId === action.payload.websiteId &&
              d.domain === action.payload.domain
            )
        );
      })

      // Check domain availability
      .addCase(checkDomainAvailability.pending, (state) => {
        state.availability.isChecking = true;
        state.availability.error = null;
      })
      .addCase(checkDomainAvailability.fulfilled, (state, action) => {
        state.availability.isChecking = false;
        state.availability.results[action.payload.domain] = action.payload;
      })
      .addCase(checkDomainAvailability.rejected, (state, action) => {
        state.availability.isChecking = false;
        state.availability.error = action.payload;
      });
  },
});

// ========================================
// ACTIONS
// ========================================

export const {
  clearError,
  clearValidation,
  clearAvailability,
  setDomainStatus,
} = domainSlice.actions;

// ========================================
// SELECTORS
// ========================================

export const selectDomains = (state) => state.domain.domains;
export const selectDomainLoading = (state) => state.domain.loading;
export const selectDomainError = (state) => state.domain.error;
export const selectDomainValidation = (state) => state.domain.validation;
export const selectDomainAvailability = (state) => state.domain.availability;

// Select domains by website ID
export const selectDomainsByWebsiteId = (state, websiteId) =>
  state.domain.domains.filter((d) => d.websiteId === websiteId);

// Select verified domains
export const selectVerifiedDomains = (state) =>
  state.domain.domains.filter((d) => d.status === "VERIFIED");

// Select pending domains
export const selectPendingDomains = (state) =>
  state.domain.domains.filter((d) => d.status === "PENDING");

export default domainSlice.reducer;
