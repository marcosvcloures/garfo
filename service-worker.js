"use strict";function setOfCachedUrls(a){return a.keys().then(function(a){return a.map(function(a){return a.url})}).then(function(a){return new Set(a)})}var precacheConfig=[["index.html","fddd072f3ab39a56ab6547589b14d944"],["static/css/main.a48fa23a.css","3df51363ce30b121fa42ccb45cd05333"],["static/js/main.73885ded.js","716c5d98ed08328766b451fd6f178b9b"],["static/media/MaterialIcons-Regular.012cf6a1.woff","012cf6a10129e2275d79d6adac7f3b02"],["static/media/MaterialIcons-Regular.570eb838.woff2","570eb83859dc23dd0eec423a49e147fe"],["static/media/MaterialIcons-Regular.a37b0c01.ttf","a37b0c01c0baf1888ca812cc0508f6e2"],["static/media/MaterialIcons-Regular.e79bfd88.eot","e79bfd88537def476913f3ed52f4f4b3"],["static/media/Roboto-Bold.c0f1e4a4.woff2","c0f1e4a4fdfb8048c72e86aadb2a247d"],["static/media/Roboto-Bold.eed9aab5.woff","eed9aab5449cc9c8430d7d258108f602"],["static/media/Roboto-Light.3c37aa69.woff2","3c37aa69cd77e6a53a067170fa8fe2e9"],["static/media/Roboto-Light.ea36cd9a.woff","ea36cd9a0e9eee97012a67b8a4570d7b"],["static/media/Roboto-Medium.1561b424.woff2","1561b424aaef2f704bbd89155b3ce514"],["static/media/Roboto-Medium.cf4d60bc.woff","cf4d60bc0b1d4b2314085919a00e1724"],["static/media/Roboto-Regular.3cf6adf6.woff","3cf6adf61054c328b1b0ddcd8f9ce24d"],["static/media/Roboto-Regular.5136cbe6.woff2","5136cbe62a63604402f2fedb97f246f8"],["static/media/Roboto-Thin.1f35e6a1.woff2","1f35e6a11d27d2e10d28946d42332dc5"],["static/media/Roboto-Thin.44b78f14.woff","44b78f142603eb69f593ed4002ed7a4a"],["static/media/josefin-sans-latin-100.470d5b45.woff","470d5b45865edf78777e4fd30370ebb8"],["static/media/josefin-sans-latin-100.91aa4e7e.eot","91aa4e7e8ea18655b03b9a7a55cc9cec"],["static/media/josefin-sans-latin-100.d59ed154.woff2","d59ed1543ef132d2e10012e3822ef341"],["static/media/josefin-sans-latin-100.e0ae958d.svg","e0ae958de7151f6e6f4635d5229eed3b"],["static/media/josefin-sans-latin-100italic.4f3b347f.eot","4f3b347f53cab8d3c23fdbdd8d4f98b8"],["static/media/josefin-sans-latin-100italic.57c71f37.woff","57c71f37141da0db141f74d7c8dc14ad"],["static/media/josefin-sans-latin-100italic.58183f2c.svg","58183f2cfa0646bf806e3684389413a3"],["static/media/josefin-sans-latin-100italic.8583b83e.woff2","8583b83e71986d5350666b6f40b1d30b"],["static/media/josefin-sans-latin-300.2f0567cc.eot","2f0567cc32454758394772c91b8b2c14"],["static/media/josefin-sans-latin-300.3174f212.woff","3174f212b6f095b9239c7674122a68cd"],["static/media/josefin-sans-latin-300.6a6b4d48.woff2","6a6b4d48d3990297f8feb86f96e8386e"],["static/media/josefin-sans-latin-300.ae403b9e.svg","ae403b9efb645481545c44dcdf907b58"],["static/media/josefin-sans-latin-300italic.1a01d80c.woff","1a01d80c283c30778e0ea5ddaa01b628"],["static/media/josefin-sans-latin-300italic.477bc298.svg","477bc2980df417d7f74aa0ba29657048"],["static/media/josefin-sans-latin-300italic.7e9a7ce8.eot","7e9a7ce81b9d09a333b73d8dac49d366"],["static/media/josefin-sans-latin-300italic.9ee4c02d.woff2","9ee4c02db364fa1772b9d07d744871d4"],["static/media/josefin-sans-latin-400.5cf347d1.eot","5cf347d17dac69546a6fc3dad255a2e1"],["static/media/josefin-sans-latin-400.6b63b8aa.svg","6b63b8aae8475f3366fa57422435e6bf"],["static/media/josefin-sans-latin-400.7270440b.woff2","7270440b8ddb42ebfe9fba9297a3563d"],["static/media/josefin-sans-latin-400.b9982a3c.woff","b9982a3cd86be8433f9f335ce17b66d4"],["static/media/josefin-sans-latin-400italic.0d08a3b3.woff2","0d08a3b3f3dbeb0ac62ab638c7cea709"],["static/media/josefin-sans-latin-400italic.1ba88d3e.woff","1ba88d3ea4cbef9b36de8f9eb2ad0a1e"],["static/media/josefin-sans-latin-400italic.6c191970.eot","6c19197058a1ae1a402bd431686148b8"],["static/media/josefin-sans-latin-400italic.6da2c1b9.svg","6da2c1b9bda4a26623896423883b9355"],["static/media/josefin-sans-latin-600.467a436c.woff","467a436cf1fa0484861cf95bc2e62ae6"],["static/media/josefin-sans-latin-600.632c9aaa.eot","632c9aaa0fd0b35c9db6f7535158e708"],["static/media/josefin-sans-latin-600.69c29549.svg","69c29549edc12be52f038e8ac255abaf"],["static/media/josefin-sans-latin-600.af86d657.woff2","af86d6574d51038df8d81be89a173206"],["static/media/josefin-sans-latin-600italic.470d7d6d.woff2","470d7d6daae05f39507100d8ccb01c46"],["static/media/josefin-sans-latin-600italic.8d0a62ef.eot","8d0a62efde65662ec6cb75ffe78db7d3"],["static/media/josefin-sans-latin-600italic.e84af17a.svg","e84af17a3a6f81b44824f957c9a757aa"],["static/media/josefin-sans-latin-600italic.f43f7f04.woff","f43f7f04251fc5977e72dbfa7502dc30"],["static/media/josefin-sans-latin-700.5aa538f0.woff2","5aa538f09ae2024b4b62170a7b8e0576"],["static/media/josefin-sans-latin-700.844df4e5.svg","844df4e5c071dcb6b04faaaf2df3b900"],["static/media/josefin-sans-latin-700.afdbc440.eot","afdbc440e7b1d820ee67124dd2f6fc21"],["static/media/josefin-sans-latin-700.e6a7cdaf.woff","e6a7cdaf67fbdc2811571eee408b2f36"],["static/media/josefin-sans-latin-700italic.4e16cb28.woff2","4e16cb283e6dd2888659f9fed4b94cd3"],["static/media/josefin-sans-latin-700italic.51a5ce33.svg","51a5ce3322cda9c9a3e0c87878297d15"],["static/media/josefin-sans-latin-700italic.cf0a7e48.eot","cf0a7e480e6bf160f011a2dc0767f401"],["static/media/josefin-sans-latin-700italic.da3dbbd4.woff","da3dbbd4873387f960f168ec9e652658"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(a,e){var t=new URL(a);return"/"===t.pathname.slice(-1)&&(t.pathname+=e),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(a,e,t,i){var s=new URL(a);return i&&s.pathname.match(i)||(s.search+=(s.search?"&":"")+encodeURIComponent(e)+"="+encodeURIComponent(t)),s.toString()},isPathWhitelisted=function(a,e){if(0===a.length)return!0;var t=new URL(e).pathname;return a.some(function(a){return t.match(a)})},stripIgnoredUrlParameters=function(a,e){var t=new URL(a);return t.hash="",t.search=t.search.slice(1).split("&").map(function(a){return a.split("=")}).filter(function(a){return e.every(function(e){return!e.test(a[0])})}).map(function(a){return a.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(a){var e=a[0],t=a[1],i=new URL(e,self.location),s=createCacheKey(i,hashParamName,t,/\.\w{8}\./);return[i.toString(),s]}));self.addEventListener("install",function(a){a.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(e){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!e.has(t)){var i=new Request(t,{credentials:"same-origin"});return fetch(i).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return a.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(a){var e=new Set(urlsToCacheKeys.values());a.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(t){return Promise.all(t.map(function(t){if(!e.has(t.url))return a.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching);e=urlsToCacheKeys.has(t);e||(t=addDirectoryIndex(t,"index.html"),e=urlsToCacheKeys.has(t));!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL("/garfo/index.html",self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(a){return a.match(urlsToCacheKeys.get(t)).then(function(a){if(a)return a;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});