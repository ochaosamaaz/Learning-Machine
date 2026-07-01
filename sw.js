const CACHE_NAME = 'learning-machine-v3';
const ASSETS = [
    '/', '/index.html', '/css/style.css', '/css/components.css', '/css/responsive.css',
    '/js/app.js', '/js/translations.js', '/js/quiz-data.js', '/js/features.js', '/js/playground.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request).catch(() => caches.match('/index.html'))));
});
