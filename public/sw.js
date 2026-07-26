const CACHE_NAME = "typebangla-v2";
const OFFLINE_URLS = [
  "/",
  "/practice",
  "/practice/test",
  "/keyboards",
  "/tools",
  "/manifest.json"
];

// Instantly self-unregister on localhost / development environment
const isDev = typeof location !== "undefined" && (
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname.startsWith("192.168.")
);

self.addEventListener("install", (event) => {
  if (isDev) {
    self.registration.unregister();
    return;
  }
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  if (isDev) {
    self.registration.unregister();
    return;
  }
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (isDev || event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        return caches.match("/");
      });
    })
  );
});
