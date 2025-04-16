// Export all stores for easy importing throughout the application
export { authStore } from './authStore';
export { progressStore } from './progressStore';
export { userStore } from './userStore';
export { chatStore } from './chatStore';
export { gameStore } from './gameStore';

// Re-export create function from zustand for any custom stores needed outside this folder
export { create } from 'zustand';

// Export some utilities for the stores
export const clearAllStores = () => {
  // Import and call clear functions for each store
  const { clearAuth } = authStore.getState();
  const { resetProgress } = progressStore.getState();
  const { clearProfile } = userStore.getState();
  const { clearMessages } = chatStore.getState();
  const { resetGameState } = gameStore.getState();
  
  // Clear all stores
  clearAuth();
  resetProgress();
  clearProfile();
  clearMessages();
  resetGameState();
};

// Hook for subscribing to store changes (useful for debugging)
export const subscribeToStore = (
  store: any, 
  selector: (state: any) => any, 
  callback: (selectedState: any, prevSelectedState: any) => void
) => {
  let currentState = selector(store.getState());
  
  return store.subscribe((state: any) => {
    const nextState = selector(state);
    if (nextState !== currentState) {
      const prevState = currentState;
      currentState = nextState;
      callback(currentState, prevState);
    }
  });
};

// Debug helper - logs all store changes to console when in development
if (process.env.NODE_ENV === 'development') {
  // Optional: Uncomment to enable store debugging in development
  /*
  [authStore, progressStore, userStore, chatStore, gameStore].forEach((store, index) => {
    const storeNames = ['auth', 'progress', 'user', 'chat', 'game'];
    store.subscribe((state: any, prevState: any) => {
      console.log(`[Store: ${storeNames[index]}]`, state);
    });
  });
  */
}