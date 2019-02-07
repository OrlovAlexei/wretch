!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):(t=t||self).wretch=r()}(this,function(){"use strict";var i=function(){return(i=Object.assign||function(t){for(var r,e=1,o=arguments.length;e<o;e++)for(var n in r=arguments[e])Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);return t}).apply(this,arguments)},y=function(t,r,e){if(void 0===e&&(e=!1),!t||!r||"object"!=typeof t||"object"!=typeof r)return t;var o=i({},t);for(var n in r)r.hasOwnProperty(n)&&(r[n]instanceof Array&&t[n]instanceof Array?o[n]=e?t[n].concat(r[n]):r[n]:"object"==typeof r[n]&&"object"==typeof t[n]?o[n]=y(t[n],r[n],e):o[n]=r[n]);return o},v={defaults:{},errorType:null,polyfills:{fetch:null,FormData:null,URLSearchParams:null,performance:null,PerformanceObserver:null,AbortController:null},polyfill:function(t,r){for(var e=void 0===r?{}:r,o=e.doThrow,n=void 0===o||o,i=e.instance,s=void 0!==i&&i,u=[],a=2;a<arguments.length;a++)u[a-2]=arguments[a];var c=this.polyfills[t]||("undefined"!=typeof self?self[t]:null)||("undefined"!=typeof global?global[t]:null);if(n&&!c)throw new Error(t+" is not defined");return s&&c?new(c.bind.apply(c,[void 0].concat(u))):c}},s=function(t,r,e,o){if(!t.getEntriesByName)return!1;var n=t.getEntriesByName(r);return!!(n&&0<n.length)&&(e(n.reverse()[0]),o.clearMeasures&&o.clearMeasures(r),m.callbacks.delete(r),m.callbacks.size<1&&(m.observer.disconnect(),o.clearResourceTimings&&o.clearResourceTimings()),!0)},m={callbacks:new Map,observer:null,observe:function(t,r){if(t&&r){var o,e,n=v.polyfill("performance",{doThrow:!1}),i=v.polyfill("PerformanceObserver",{doThrow:!1});if(o=n,e=i,!m.observer&&o&&e&&(m.observer=new e(function(e){m.callbacks.forEach(function(t,r){s(e,r,t,o)})}),o.clearResourceTimings&&o.clearResourceTimings()),m.observer)s(n,t,r,n)||(m.callbacks.size<1&&m.observer.observe({entryTypes:["resource","measure"]}),m.callbacks.set(t,r))}}},t=function(){function h(t,r,e,o,n,i){void 0===e&&(e=new Map),void 0===o&&(o=[]),void 0===n&&(n=[]),void 0===i&&(i=[]),this._url=t,this._options=r,this._catchers=e,this._resolvers=o,this._middlewares=n,this._deferredChain=i}return h.factory=function(t,r){return void 0===t&&(t=""),void 0===r&&(r={}),new h(t,r)},h.prototype.selfFactory=function(t){var r=void 0===t?{}:t,e=r.url,o=void 0===e?this._url:e,n=r.options,i=void 0===n?this._options:n,s=r.catchers,u=void 0===s?this._catchers:s,a=r.resolvers,c=void 0===a?this._resolvers:a,f=r.middlewares,l=void 0===f?this._middlewares:f,p=r.deferredChain;return new h(o,i,u,c,l,void 0===p?this._deferredChain:p)},h.prototype.defaults=function(t,r){return void 0===r&&(r=!1),v.defaults=r?y(v.defaults,t):t,this},h.prototype.errorType=function(t){return v.errorType=t,this},h.prototype.polyfills=function(t){return v.polyfills=i({},v.polyfills,t),this},h.prototype.url=function(t,r){if(void 0===r&&(r=!1),r)return this.selfFactory({url:t});var e=this._url.split("?");return this.selfFactory({url:1<e.length?e[0]+t+"?"+e[1]:this._url+t})},h.prototype.options=function(t,r){return void 0===r&&(r=!0),this.selfFactory({options:r?y(this._options,t):t})},h.prototype.query=function(t,r){return void 0===r&&(r=!1),this.selfFactory({url:e(this._url,t,r)})},h.prototype.headers=function(t){return this.selfFactory({options:y(this._options,{headers:t})})},h.prototype.accept=function(t){return this.headers({Accept:t})},h.prototype.content=function(t){return this.headers({"Content-Type":t})},h.prototype.auth=function(t){return this.headers({Authorization:t})},h.prototype.catcher=function(t,r){var e=new Map(this._catchers);return e.set(t,r),this.selfFactory({catchers:e})},h.prototype.signal=function(t){return this.selfFactory({options:i({},this._options,{signal:t.signal})})},h.prototype.resolve=function(t,r){return void 0===r&&(r=!1),this.selfFactory({resolvers:r?[t]:this._resolvers.concat([t])})},h.prototype.defer=function(t,r){return void 0===r&&(r=!1),this.selfFactory({deferredChain:r?[t]:this._deferredChain.concat([t])})},h.prototype.middlewares=function(t,r){return void 0===r&&(r=!1),this.selfFactory({middlewares:r?t:this._middlewares.concat(t)})},h.prototype.method=function(t,r,e){void 0===r&&(r={}),void 0===e&&(e=null);var o=e?"object"==typeof e?this.json(e):this.body(e):this;return function(e){var t=e._url,o=e._catchers,r=e._resolvers,n=e._middlewares,i=e._options,s=y(v.defaults,i),u=v.polyfill("AbortController",{doThrow:!1,instance:!0});!s.signal&&u&&(s.signal=u.signal);var a,c,f=(c=n,a=v.polyfill("fetch"),(0===c.length?a:1===c.length?c[0](a):c.reduceRight(function(t,r,e){return e===c.length-2?r(t(a)):r(t)}))(t,s)),l=f.then(function(e){return e.ok?e:e[v.errorType||"text"]().then(function(t){var r=new Error(t);throw r[v.errorType||"text"]=t,r.status=e.status,r.response=e,r})}),p=function(t){return t.catch(function(t){if(o.has(t.status))return o.get(t.status)(t,e);if(o.has(t.name))return o.get(t.name)(t,e);throw t})},h=function(e){return function(r){return p(e?l.then(function(t){return t&&t[e]()}).then(function(t){return t&&r&&r(t)||t}):l.then(function(t){return t&&r&&r(t)||t}))}},d={res:h(null),json:h("json"),blob:h("blob"),formData:h("formData"),arrayBuffer:h("arrayBuffer"),text:h("text"),perfs:function(r){return f.then(function(t){return m.observe(t.url,r)}),d},setTimeout:function(t,r){return void 0===r&&(r=u),setTimeout(function(){return r.abort()},t),d},controller:function(){return[u,d]},error:function(t,r){return o.set(t,r),d},badRequest:function(t){return d.error(400,t)},unauthorized:function(t){return d.error(401,t)},forbidden:function(t){return d.error(403,t)},notFound:function(t){return d.error(404,t)},timeout:function(t){return d.error(408,t)},internalError:function(t){return d.error(500,t)},onAbort:function(t){return d.error("AbortError",t)}};return r.reduce(function(t,r){return r(t,e)},d)}(o._deferredChain.reduce(function(t,r){return r(t,t._url,t._options)},o).options(i({},r,{method:t})))},h.prototype.get=function(t){return this.method("GET",t)},h.prototype.delete=function(t){return this.method("DELETE",t)},h.prototype.put=function(t,r){return this.method("PUT",r,t)},h.prototype.post=function(t,r){return this.method("POST",r,t)},h.prototype.patch=function(t,r){return this.method("PATCH",r,t)},h.prototype.head=function(t){return this.method("HEAD",t)},h.prototype.opts=function(t){return this.method("OPTIONS",t)},h.prototype.body=function(t){return this.selfFactory({options:i({},this._options,{body:t})})},h.prototype.json=function(t){return this.content("application/json").body(JSON.stringify(t))},h.prototype.formData=function(t){return this.body(function(t){var r=v.polyfill("FormData",{instance:!0});for(var e in t)if(t[e]instanceof Array)for(var o=0,n=t[e];o<n.length;o++){var i=n[o];r.append(e+"[]",i)}else r.append(e,t[e]);return r}(t))},h.prototype.formUrl=function(t){return this.body("string"==typeof t?t:(e=t,Object.keys(e).map(function(r){var t=e[r];return t instanceof Array?t.map(function(t){return o(r,t)}).join("&"):o(r,t)}).join("&"))).content("application/x-www-form-urlencoded");var e},h}(),e=function(t,r,e){var o;if("string"==typeof r)o=r;else{var n=v.polyfill("URLSearchParams",{instance:!0});for(var i in r)if(r[i]instanceof Array)for(var s=0,u=r[i];s<u.length;s++){var a=u[s];n.append(i,a)}else n.append(i,r[i]);o=n.toString()}var c=t.split("?");return e||c.length<2?c[0]+"?"+o:t+"&"+o};function o(t,r){return encodeURIComponent(t)+"="+encodeURIComponent("object"==typeof r?JSON.stringify(r):""+r)}var r=t.factory;return r.default=t.factory,r});
//# sourceMappingURL=wretch.js.map
