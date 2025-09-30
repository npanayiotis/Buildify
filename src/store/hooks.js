/**
 * Redux Hooks
 * Typed hooks for Redux store access
 */

import { useDispatch, useSelector } from "react-redux";

// ========================================
// TYPED HOOKS
// ========================================

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// ========================================
// CUSTOM HOOKS
// ========================================

// Auth hooks
export const useAuth = () => {
  const user = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
  };
};

// Website hooks
export const useWebsites = () => {
  const websites = useAppSelector((state) => state.website.websites);
  const currentWebsite = useAppSelector(
    (state) => state.website.currentWebsite
  );
  const loading = useAppSelector((state) => state.website.loading);
  const error = useAppSelector((state) => state.website.error);
  const publishStatus = useAppSelector((state) => state.website.publishStatus);

  return {
    websites,
    currentWebsite,
    loading,
    error,
    publishStatus,
  };
};

// Customize hooks
export const useCustomize = () => {
  const isEditing = useAppSelector((state) => state.customize.isEditing);
  const hasUnsavedChanges = useAppSelector(
    (state) => state.customize.hasUnsavedChanges
  );
  const lastSaved = useAppSelector((state) => state.customize.lastSaved);
  const websiteData = useAppSelector((state) => state.customize.websiteData);
  const selectedComponent = useAppSelector(
    (state) => state.customize.selectedComponent
  );
  const sidebarOpen = useAppSelector((state) => state.customize.sidebarOpen);
  const previewMode = useAppSelector((state) => state.customize.previewMode);
  const zoomLevel = useAppSelector((state) => state.customize.zoomLevel);
  const canUndo = useAppSelector((state) => state.customize.historyIndex > 0);
  const canRedo = useAppSelector(
    (state) =>
      state.customize.historyIndex < state.customize.componentHistory.length - 1
  );
  const loading = useAppSelector((state) => state.customize.loading);
  const saving = useAppSelector((state) => state.customize.saving);
  const error = useAppSelector((state) => state.customize.error);
  const saveError = useAppSelector((state) => state.customize.saveError);

  return {
    isEditing,
    hasUnsavedChanges,
    lastSaved,
    websiteData,
    selectedComponent,
    sidebarOpen,
    previewMode,
    zoomLevel,
    canUndo,
    canRedo,
    loading,
    saving,
    error,
    saveError,
  };
};

// Publish hooks
export const usePublish = () => {
  const cart = useAppSelector((state) => state.publish.cart);
  const cartTotal = useAppSelector((state) => state.publish.cartTotal);
  const currentStep = useAppSelector((state) => state.publish.currentStep);
  const steps = useAppSelector((state) => state.publish.steps);
  const selectedDomain = useAppSelector(
    (state) => state.publish.selectedDomain
  );
  const domainType = useAppSelector((state) => state.publish.domainType);
  const customDomain = useAppSelector((state) => state.publish.customDomain);
  const domainValidation = useAppSelector(
    (state) => state.publish.domainValidation
  );
  const paymentMethod = useAppSelector((state) => state.publish.paymentMethod);
  const paymentDetails = useAppSelector(
    (state) => state.publish.paymentDetails
  );
  const paymentValidation = useAppSelector(
    (state) => state.publish.paymentValidation
  );
  const isPublishing = useAppSelector((state) => state.publish.isPublishing);
  const publishProgress = useAppSelector(
    (state) => state.publish.publishProgress
  );
  const publishStatus = useAppSelector((state) => state.publish.publishStatus);
  const pricing = useAppSelector((state) => state.publish.pricing);
  const loading = useAppSelector((state) => state.publish.loading);
  const error = useAppSelector((state) => state.publish.error);

  return {
    cart,
    cartTotal,
    currentStep,
    steps,
    selectedDomain,
    domainType,
    customDomain,
    domainValidation,
    paymentMethod,
    paymentDetails,
    paymentValidation,
    isPublishing,
    publishProgress,
    publishStatus,
    pricing,
    loading,
    error,
  };
};

// Domain hooks
export const useDomains = () => {
  const domains = useAppSelector((state) => state.domain.domains);
  const loading = useAppSelector((state) => state.domain.loading);
  const error = useAppSelector((state) => state.domain.error);
  const validation = useAppSelector((state) => state.domain.validation);
  const availability = useAppSelector((state) => state.domain.availability);

  return {
    domains,
    loading,
    error,
    validation,
    availability,
  };
};

// UI hooks
export const useUI = () => {
  const modals = useAppSelector((state) => state.ui.modals);
  const toasts = useAppSelector((state) => state.ui.toasts);
  const loading = useAppSelector((state) => state.ui.loading);
  const sidebar = useAppSelector((state) => state.ui.sidebar);
  const theme = useAppSelector((state) => state.ui.theme);
  const navigation = useAppSelector((state) => state.ui.navigation);
  const mobile = useAppSelector((state) => state.ui.mobile);
  const search = useAppSelector((state) => state.ui.search);

  return {
    modals,
    toasts,
    loading,
    sidebar,
    theme,
    navigation,
    mobile,
    search,
  };
};

// Modal hooks
export const useModal = (modalName) => {
  const isOpen = useAppSelector((state) => state.ui.modals[modalName]);
  const dispatch = useAppDispatch();

  const open = () => dispatch({ type: "ui/openModal", payload: modalName });
  const close = () => dispatch({ type: "ui/closeModal", payload: modalName });

  return {
    isOpen,
    open,
    close,
  };
};

// Toast hooks
export const useToast = () => {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const dispatch = useAppDispatch();

  const addToast = (toast) => dispatch({ type: "ui/addToast", payload: toast });
  const removeToast = (id) => dispatch({ type: "ui/removeToast", payload: id });
  const clearToasts = () => dispatch({ type: "ui/clearToasts" });

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
};
