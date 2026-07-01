const CACHE_NAME = "bite-club-pwa-v3";
const ASSETS = [
  "/app/index.html",
  "/app/manifest.json",
  "/app/assets/icons/pwa/icon-192.png",
  "/app/assets/icons/pwa/icon-512.png",
  "/app/assets/icons/pwa/apple-touch-icon.png",
  "/app/assets/css/tokens.css",
  "/app/assets/css/app.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return Promise.resolve();
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
