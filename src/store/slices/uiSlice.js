/**
 * UI Redux Slice
 * Manages global UI state and interactions
 */

import { createSlice } from "@reduxjs/toolkit";

// ========================================
// INITIAL STATE
// ========================================

const initialState = {
  // Modal states
  modals: {
    websiteSelector: false,
    templateSwitcher: false,
    domainManager: false,
    publishCart: false,
    paymentModal: false,
    confirmationModal: false,
  },

  // Toast notifications
  toasts: [],

  // Loading states
  loading: {
    global: false,
    page: false,
    api: false,
  },

  // Sidebar states
  sidebar: {
    isOpen: false,
    activeTab: "components",
  },

  // Theme and appearance
  theme: {
    mode: "dark", // dark, light
    primaryColor: "#667eea",
    secondaryColor: "#764ba2",
  },

  // Navigation
  navigation: {
    currentPage: null,
    breadcrumbs: [],
    showBackButton: false,
  },

  // Mobile responsive
  mobile: {
    isMobile: false,
    sidebarCollapsed: true,
  },

  // Search and filters
  search: {
    query: "",
    filters: {},
    sortBy: "newest",
  },
};

// ========================================
// SLICE
// ========================================

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Modal management
    openModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = true;
      }
    },

    closeModal: (state, action) => {
      const modalName = action.payload;
      if (state.modals.hasOwnProperty(modalName)) {
        state.modals[modalName] = false;
      }
    },

    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal] = false;
      });
    },

    // Toast notifications
    addToast: (state, action) => {
      const toast = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        ...action.payload,
      };
      state.toasts.push(toast);
    },

    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },

    clearToasts: (state) => {
      state.toasts = [];
    },

    // Loading states
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },

    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },

    setApiLoading: (state, action) => {
      state.loading.api = action.payload;
    },

    // Sidebar management
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },

    setSidebarOpen: (state, action) => {
      state.sidebar.isOpen = action.payload;
    },

    setActiveSidebarTab: (state, action) => {
      state.sidebar.activeTab = action.payload;
    },

    // Theme management
    setThemeMode: (state, action) => {
      state.theme.mode = action.payload;
    },

    setPrimaryColor: (state, action) => {
      state.theme.primaryColor = action.payload;
    },

    setSecondaryColor: (state, action) => {
      state.theme.secondaryColor = action.payload;
    },

    // Navigation management
    setCurrentPage: (state, action) => {
      state.navigation.currentPage = action.payload;
    },

    setBreadcrumbs: (state, action) => {
      state.navigation.breadcrumbs = action.payload;
    },

    setShowBackButton: (state, action) => {
      state.navigation.showBackButton = action.payload;
    },

    // Mobile responsive
    setMobile: (state, action) => {
      state.mobile.isMobile = action.payload;
    },

    setSidebarCollapsed: (state, action) => {
      state.mobile.sidebarCollapsed = action.payload;
    },

    // Search and filters
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },

    setSearchFilters: (state, action) => {
      state.search.filters = action.payload;
    },

    setSortBy: (state, action) => {
      state.search.sortBy = action.payload;
    },

    clearSearch: (state) => {
      state.search.query = "";
      state.search.filters = {};
      state.search.sortBy = "newest";
    },

    // Reset UI state
    resetUI: (state) => {
      state.modals = Object.keys(state.modals).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      state.toasts = [];
      state.loading = {
        global: false,
        page: false,
        api: false,
      };
      state.sidebar = {
        isOpen: false,
        activeTab: "components",
      };
      state.navigation = {
        currentPage: null,
        breadcrumbs: [],
        showBackButton: false,
      };
      state.search = {
        query: "",
        filters: {},
        sortBy: "newest",
      };
    },
  },
});

// ========================================
// ACTIONS
// ========================================

export const {
  openModal,
  closeModal,
  closeAllModals,
  addToast,
  removeToast,
  clearToasts,
  setGlobalLoading,
  setPageLoading,
  setApiLoading,
  toggleSidebar,
  setSidebarOpen,
  setActiveSidebarTab,
  setThemeMode,
  setPrimaryColor,
  setSecondaryColor,
  setCurrentPage,
  setBreadcrumbs,
  setShowBackButton,
  setMobile,
  setSidebarCollapsed,
  setSearchQuery,
  setSearchFilters,
  setSortBy,
  clearSearch,
  resetUI,
} = uiSlice.actions;

// ========================================
// SELECTORS
// ========================================

export const selectModals = (state) => state.ui.modals;
export const selectModal = (state, modalName) => state.ui.modals[modalName];
export const selectToasts = (state) => state.ui.toasts;
export const selectLoading = (state) => state.ui.loading;
export const selectSidebar = (state) => state.ui.sidebar;
export const selectTheme = (state) => state.ui.theme;
export const selectNavigation = (state) => state.ui.navigation;
export const selectMobile = (state) => state.ui.mobile;
export const selectSearch = (state) => state.ui.search;

// Select if any modal is open
export const selectAnyModalOpen = (state) => {
  return Object.values(state.ui.modals).some((isOpen) => isOpen);
};

// Select loading state (any type of loading)
export const selectIsLoading = (state) => {
  return Object.values(state.ui.loading).some((isLoading) => isLoading);
};

export default uiSlice.reducer;
