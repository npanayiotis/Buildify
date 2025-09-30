/**
 * Publish Redux Slice
 * Manages publishing flow, cart, and checkout process
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ========================================
// ASYNC THUNKS
// ========================================

// Add item to publish cart
export const addToPublishCart = createAsyncThunk(
  "publish/addToPublishCart",
  async (item, { rejectWithValue }) => {
    try {
      // This would typically make an API call to validate the item
      // For now, we'll just return the item
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from publish cart
export const removeFromPublishCart = createAsyncThunk(
  "publish/removeFromPublishCart",
  async (itemId, { rejectWithValue }) => {
    try {
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  "publish/updateCartItem",
  async ({ itemId, updates }, { rejectWithValue }) => {
    try {
      return { itemId, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Validate domain
export const validateDomain = createAsyncThunk(
  "publish/validateDomain",
  async (domain, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/domains/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ domain }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Domain validation failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Process payment
export const processPayment = createAsyncThunk(
  "publish/processPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/payments/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment processing failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Finalize publishing
export const finalizePublishing = createAsyncThunk(
  "publish/finalizePublishing",
  async (publishData, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/publish/finalize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(publishData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Publishing failed");
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
  // Cart state
  cart: [],
  cartTotal: 0,

  // Publishing flow state
  currentStep: "template", // template, cart, domain, payment, review, publishing
  steps: [
    { id: "template", title: "Select Template", completed: false },
    { id: "cart", title: "Review & Customize", completed: false },
    { id: "domain", title: "Choose Domain", completed: false },
    { id: "payment", title: "Payment", completed: false },
    { id: "review", title: "Review & Confirm", completed: false },
    { id: "publishing", title: "Publishing", completed: false },
  ],

  // Template selection
  selectedTemplate: null,
  selectedServices: [],

  // Domain selection
  selectedDomain: null,
  domainType: "subdomain", // subdomain, custom
  customDomain: "",
  domainValidation: {
    isValidating: false,
    isValid: null,
    error: null,
    suggestions: [],
  },

  // Payment state
  paymentMethod: null,
  paymentDetails: {},
  paymentValidation: {
    isValidating: false,
    isValid: null,
    error: null,
  },

  // Publishing state
  isPublishing: false,
  publishProgress: 0,
  publishStatus: null, // preparing, building, deploying, completed, failed

  // Loading and error states
  loading: false,
  error: null,

  // Pricing
  pricing: {
    website: 399, // Base website price (one-time)
    monthlySupport: 39.99, // Monthly hosting & support
    customDomainSetup: 49, // One-time custom domain setup
    ssl: 0, // SSL is free
    hosting: 0, // Hosting included in monthly support
    total: 399,
  },
};

// ========================================
// SLICE
// ========================================

const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    // Navigation
    goToStep: (state, action) => {
      state.currentStep = action.payload;
    },

    nextStep: (state) => {
      const currentIndex = state.steps.findIndex(
        (step) => step.id === state.currentStep
      );
      if (currentIndex < state.steps.length - 1) {
        // Mark current step as completed
        state.steps[currentIndex].completed = true;
        // Go to next step
        state.currentStep = state.steps[currentIndex + 1].id;
      }
    },

    previousStep: (state) => {
      const currentIndex = state.steps.findIndex(
        (step) => step.id === state.currentStep
      );
      if (currentIndex > 0) {
        state.currentStep = state.steps[currentIndex - 1].id;
      }
    },

    // Template selection
    selectTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
      // Add template to cart if not already there
      const existingTemplate = state.cart.find(
        (item) => item.type === "template"
      );
      if (!existingTemplate) {
        state.cart.push({
          id: action.payload.id,
          name: action.payload.name,
          price: state.pricing.website,
          type: "template",
          data: action.payload,
          quantity: 1,
        });
      }
      // Recalculate total
      state.cartTotal = calculateCartTotal(state.cart);
    },

    // Service selection
    addService: (state, action) => {
      const service = action.payload;
      const existingService = state.cart.find(
        (cartItem) => cartItem.id === service.id
      );

      if (existingService) {
        existingService.quantity += 1;
      } else {
        state.cart.push({ ...service, quantity: 1 });
      }

      // Recalculate total
      state.cartTotal = calculateCartTotal(state.cart);
    },

    removeService: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      // Recalculate total
      state.cartTotal = calculateCartTotal(state.cart);
    },

    // Cart management
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...item, quantity: 1 });
      }

      state.cartTotal = calculateCartTotal(state.cart);
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      state.cartTotal = calculateCartTotal(state.cart);
    },

    updateCartItemQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const item = state.cart.find((cartItem) => cartItem.id === itemId);

      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter((cartItem) => cartItem.id !== itemId);
        } else {
          item.quantity = quantity;
        }
      }

      state.cartTotal = calculateCartTotal(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      state.cartTotal = 0;
    },

    // Domain management
    setDomainType: (state, action) => {
      state.domainType = action.payload;
      if (action.payload === "subdomain") {
        state.customDomain = "";
        state.selectedDomain = null;
      }
    },

    setCustomDomain: (state, action) => {
      state.customDomain = action.payload;
    },

    setSelectedDomain: (state, action) => {
      state.selectedDomain = action.payload;
    },

    clearDomainValidation: (state) => {
      state.domainValidation = {
        isValidating: false,
        isValid: null,
        error: null,
        suggestions: [],
      };
    },

    // Payment management
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    updatePaymentDetails: (state, action) => {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
    },

    clearPaymentValidation: (state) => {
      state.paymentValidation = {
        isValidating: false,
        isValid: null,
        error: null,
      };
    },

    // Publishing management
    setPublishProgress: (state, action) => {
      state.publishProgress = action.payload;
    },

    setPublishStatus: (state, action) => {
      state.publishStatus = action.payload;
    },

    // Pricing
    updatePricing: (state, action) => {
      state.pricing = { ...state.pricing, ...action.payload };
      state.pricing.total = calculateTotal(state.pricing);
    },

    // Reset state
    resetPublishFlow: (state) => {
      state.cart = [];
      state.cartTotal = 0;
      state.currentStep = "cart";
      state.steps = state.steps.map((step) => ({ ...step, completed: false }));
      state.selectedDomain = null;
      state.domainType = "subdomain";
      state.customDomain = "";
      state.domainValidation = {
        isValidating: false,
        isValid: null,
        error: null,
        suggestions: [],
      };
      state.paymentMethod = null;
      state.paymentDetails = {};
      state.paymentValidation = {
        isValidating: false,
        isValid: null,
        error: null,
      };
      state.isPublishing = false;
      state.publishProgress = 0;
      state.publishStatus = null;
      state.loading = false;
      state.error = null;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Add to publish cart
      .addCase(addToPublishCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.cart.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cart.push({ ...item, quantity: 1 });
        }

        state.cartTotal = calculateCartTotal(state.cart);
      })
      .addCase(addToPublishCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Remove from publish cart
      .addCase(removeFromPublishCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.cartTotal = calculateCartTotal(state.cart);
      })

      // Update cart item
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const { itemId, updates } = action.payload;
        const item = state.cart.find((cartItem) => cartItem.id === itemId);

        if (item) {
          Object.assign(item, updates);
          state.cartTotal = calculateCartTotal(state.cart);
        }
      })

      // Validate domain
      .addCase(validateDomain.pending, (state) => {
        state.domainValidation.isValidating = true;
        state.domainValidation.error = null;
      })
      .addCase(validateDomain.fulfilled, (state, action) => {
        state.domainValidation.isValidating = false;
        state.domainValidation.isValid = action.payload.valid;
        state.domainValidation.suggestions = action.payload.suggestions || [];
      })
      .addCase(validateDomain.rejected, (state, action) => {
        state.domainValidation.isValidating = false;
        state.domainValidation.isValid = false;
        state.domainValidation.error = action.payload;
      })

      // Process payment
      .addCase(processPayment.pending, (state) => {
        state.paymentValidation.isValidating = true;
        state.paymentValidation.error = null;
      })
      .addCase(processPayment.fulfilled, (state, action) => {
        state.paymentValidation.isValidating = false;
        state.paymentValidation.isValid = true;
      })
      .addCase(processPayment.rejected, (state, action) => {
        state.paymentValidation.isValidating = false;
        state.paymentValidation.isValid = false;
        state.paymentValidation.error = action.payload;
      })

      // Finalize publishing
      .addCase(finalizePublishing.pending, (state) => {
        state.isPublishing = true;
        state.publishProgress = 0;
        state.publishStatus = "preparing";
        state.error = null;
      })
      .addCase(finalizePublishing.fulfilled, (state, action) => {
        state.isPublishing = false;
        state.publishProgress = 100;
        state.publishStatus = "completed";

        // Mark all steps as completed
        state.steps = state.steps.map((step) => ({ ...step, completed: true }));
      })
      .addCase(finalizePublishing.rejected, (state, action) => {
        state.isPublishing = false;
        state.publishStatus = "failed";
        state.error = action.payload;
      });
  },
});

// ========================================
// HELPER FUNCTIONS
// ========================================

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

function calculateTotal(pricing) {
  return (
    pricing.website + pricing.customDomainSetup + pricing.ssl + pricing.hosting
  );
}

// ========================================
// ACTIONS
// ========================================

export const {
  goToStep,
  nextStep,
  previousStep,
  selectTemplate,
  addService,
  removeService,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  setDomainType,
  setCustomDomain,
  setSelectedDomain,
  clearDomainValidation,
  setPaymentMethod,
  updatePaymentDetails,
  clearPaymentValidation,
  setPublishProgress,
  setPublishStatus,
  updatePricing,
  resetPublishFlow,
  clearError,
} = publishSlice.actions;

// ========================================
// SELECTORS
// ========================================

export const selectCart = (state) => state.publish.cart;
export const selectCartTotal = (state) => state.publish.cartTotal;
export const selectCurrentStep = (state) => state.publish.currentStep;
export const selectSteps = (state) => state.publish.steps;
export const selectSelectedDomain = (state) => state.publish.selectedDomain;
export const selectDomainType = (state) => state.publish.domainType;
export const selectCustomDomain = (state) => state.publish.customDomain;
export const selectDomainValidation = (state) => state.publish.domainValidation;
export const selectPaymentMethod = (state) => state.publish.paymentMethod;
export const selectPaymentDetails = (state) => state.publish.paymentDetails;
export const selectPaymentValidation = (state) =>
  state.publish.paymentValidation;
export const selectIsPublishing = (state) => state.publish.isPublishing;
export const selectPublishProgress = (state) => state.publish.publishProgress;
export const selectPublishStatus = (state) => state.publish.publishStatus;
export const selectPricing = (state) => state.publish.pricing;
export const selectLoading = (state) => state.publish.loading;
export const selectError = (state) => state.publish.error;

// Select cart item count
export const selectCartItemCount = (state) =>
  state.publish.cart.reduce((total, item) => total + item.quantity, 0);

// Select if can proceed to next step
export const selectCanProceedToNext = (state) => {
  const {
    currentStep,
    selectedTemplate,
    cart,
    domainType,
    customDomain,
    selectedDomain,
    paymentMethod,
  } = state.publish;

  switch (currentStep) {
    case "template":
      return selectedTemplate !== null;
    case "cart":
      return cart.length > 0;
    case "domain":
      return (
        domainType === "subdomain" || (domainType === "custom" && customDomain)
      );
    case "payment":
      return paymentMethod !== null;
    case "review":
      return true;
    default:
      return false;
  }
};

// Select current step index
export const selectCurrentStepIndex = (state) => {
  return state.publish.steps.findIndex(
    (step) => step.id === state.publish.currentStep
  );
};

export const selectSelectedTemplate = (state) => state.publish.selectedTemplate;
export const selectSelectedServices = (state) => state.publish.selectedServices;

export default publishSlice.reducer;
