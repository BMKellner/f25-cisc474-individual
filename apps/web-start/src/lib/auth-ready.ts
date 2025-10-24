// Track when Auth0 token getter is ready
let isTokenGetterReady = false;
let readyCallbacks: Array<() => void> = [];

export function setTokenGetterReady(ready: boolean) {
  console.log('[AuthReady] Token getter ready:', ready);
  isTokenGetterReady = ready;
  
  if (ready) {
    // Call all waiting callbacks
    readyCallbacks.forEach(cb => cb());
    readyCallbacks = [];
  }
}

export function isAuthReady(): boolean {
  return isTokenGetterReady;
}

export function waitForAuthReady(): Promise<void> {
  if (isTokenGetterReady) {
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    readyCallbacks.push(() => resolve());
  });
}

