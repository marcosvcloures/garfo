"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["index.html","a82f1e98bfcd081b86b36e5c0b03026d"],["static/css/main.8596292a.css","ee00d16f8ac0bc2ff4edfb6aaaed68c5"],["static/js/main.2225b3f9.js","44b6e81f3a8ca88a1b7d9948b32d6a08"],["static/media/MaterialIcons-Regular.012cf6a1.woff","012cf6a10129e2275d79d6adac7f3b02"],["static/media/MaterialIcons-Regular.570eb838.woff2","570eb83859dc23dd0eec423a49e147fe"],["static/media/MaterialIcons-Regular.a37b0c01.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["static/media/MaterialIcons-Regular.e79bfd88.eot","e79bfd88537def476913f3ed52f4f4b3"],["static/media/josefin-sans-latin-100.470d5b45.woff","470d5b45865edf78777e4fd30370ebb8"],["static/media/josefin-sans-latin-100.91aa4e7e.eot","91aa4e7e8ea18655b03b9a7a55cc9cec"],["static/media/josefin-sans-latin-100.d59ed154.woff2","d59ed1543ef132d2e10012e3822ef341"],["static/media/josefin-sans-latin-100.e0ae958d.svg","e0ae958de7151f6e6f4635d5229eed3b"],["static/media/josefin-sans-latin-100italic.4f3b347f.eot","4f3b347f53cab8d3c23fdbdd8d4f98b8"],["static/media/josefin-sans-latin-100italic.57c71f37.woff","57c71f37141da0db141f74d7c8dc14ad"],["static/media/josefin-sans-latin-100italic.58183f2c.svg","58183f2cfa0646bf806e3684389413a3"],["static/media/josefin-sans-latin-100italic.8583b83e.woff2","8583b83e71986d5350666b6f40b1d30b"],["static/media/josefin-sans-latin-300.2f0567cc.eot","2f0567cc32454758394772c91b8b2c14"],["static/media/josefin-sans-latin-300.3174f212.woff","3174f212b6f095b9239c7674122a68cd"],["static/media/josefin-sans-latin-300.6a6b4d48.woff2","6a6b4d48d3990297f8feb86f96e8386e"],["static/media/josefin-sans-latin-300.ae403b9e.svg","ae403b9efb645481545c44dcdf907b58"],["static/media/josefin-sans-latin-300italic.1a01d80c.woff","1a01d80c283c30778e0ea5ddaa01b628"],["static/media/josefin-sans-latin-300italic.477bc298.svg","477bc2980df417d7f74aa0ba29657048"],["static/media/josefin-sans-latin-300italic.7e9a7ce8.eot","7e9a7ce81b9d09a333b73d8dac49d366"],["static/media/josefin-sans-latin-300italic.9ee4c02d.woff2","9ee4c02db364fa1772b9d07d744871d4"],["static/media/josefin-sans-latin-400.5cf347d1.eot","5cf347d17dac69546a6fc3dad255a2e1"],["static/media/josefin-sans-latin-400.6b63b8aa.svg","6b63b8aae8475f3366fa57422435e6bf"],["static/media/josefin-sans-latin-400.7270440b.woff2","7270440b8ddb42ebfe9fba9297a3563d"],["static/media/josefin-sans-latin-400.b9982a3c.woff","b9982a3cd86be8433f9f335ce17b66d4"],["static/media/josefin-sans-latin-400italic.0d08a3b3.woff2","0d08a3b3f3dbeb0ac62ab638c7cea709"],["static/media/josefin-sans-latin-400italic.1ba88d3e.woff","1ba88d3ea4cbef9b36de8f9eb2ad0a1e"],["static/media/josefin-sans-latin-400italic.6c191970.eot","6c19197058a1ae1a402bd431686148b8"],["static/media/josefin-sans-latin-400italic.6da2c1b9.svg","6da2c1b9bda4a26623896423883b9355"],["static/media/josefin-sans-latin-600.467a436c.woff","467a436cf1fa0484861cf95bc2e62ae6"],["static/media/josefin-sans-latin-600.632c9aaa.eot","632c9aaa0fd0b35c9db6f7535158e708"],["static/media/josefin-sans-latin-600.69c29549.svg","69c29549edc12be52f038e8ac255abaf"],["static/media/josefin-sans-latin-600.af86d657.woff2","af86d6574d51038df8d81be89a173206"],["static/media/josefin-sans-latin-600italic.470d7d6d.woff2","470d7d6daae05f39507100d8ccb01c46"],["static/media/josefin-sans-latin-600italic.8d0a62ef.eot","8d0a62efde65662ec6cb75ffe78db7d3"],["static/media/josefin-sans-latin-600italic.e84af17a.svg","e84af17a3a6f81b44824f957c9a757aa"],["static/media/josefin-sans-latin-600italic.f43f7f04.woff","f43f7f04251fc5977e72dbfa7502dc30"],["static/media/josefin-sans-latin-700.5aa538f0.woff2","5aa538f09ae2024b4b62170a7b8e0576"],["static/media/josefin-sans-latin-700.844df4e5.svg","844df4e5c071dcb6b04faaaf2df3b900"],["static/media/josefin-sans-latin-700.afdbc440.eot","afdbc440e7b1d820ee67124dd2f6fc21"],["static/media/josefin-sans-latin-700.e6a7cdaf.woff","e6a7cdaf67fbdc2811571eee408b2f36"],["static/media/josefin-sans-latin-700italic.4e16cb28.woff2","4e16cb283e6dd2888659f9fed4b94cd3"],["static/media/josefin-sans-latin-700italic.51a5ce33.svg","51a5ce3322cda9c9a3e0c87878297d15"],["static/media/josefin-sans-latin-700italic.cf0a7e48.eot","cf0a7e480e6bf160f011a2dc0767f401"],["static/media/josefin-sans-latin-700italic.da3dbbd4.woff","da3dbbd4873387f960f168ec9e652658"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,i){var n=new URL(e);return i&&n.pathname.match(i)||(n.search+=(n.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),n.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],i=new URL(a,self.location),n=createCacheKey(i,hashParamName,t,/\.\w{8}\./);return[i.toString(),n]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var i=new Request(t,{credentials:"same-origin"});return fetch(i).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);a=urlsToCacheKeys.has(t);a||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(t=new URL("/garfo/index.html",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});