if (workbox) {
  console.log(`Workbox is loaded`);
} else {
  console.log(`Workbox didn't load`);
}

self.addEventListener("message", e => {
  if (e.data.action === "skipWaiting") {
    console.log("skip waiting is called");
    self.skipWaiting();
  }
});

// self.addEventListener("fetch", e => {
//   console.log("event is: ", e);
// });

workbox.precaching.precacheAndRoute([
  {
    revision: "17ecfaee522eaf5b3ad9c9aa1b2973cc",
    url: "/manifest.json"
  }
]);

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(
  "https://api.thecatapi.com/v1/images/search",
  workbox.strategies.cacheFirst({
    cacheName: "placeholder-cache"
  })
);

const placeholderHandler = workbox.strategies.cacheFirst({
	cacheName: 'placeholder-cache',
});

workbox.routing.registerRoute('https://api.thecatapi.com/v1/images/search', args => {
	return placeholderHandler.handle(args).then(response => {
			console.log("Online: Fetch was called successful");
			return response;
	}).catch(err => {
			console.log("no cache data");
	});
});
