!function(e){function t(u){if(n[u])return n[u].exports;var o=n[u]={i:u,l:!1,exports:{}};return e[u].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,u){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:u})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=0)}([function(e,t,n){"use strict";function u(e){return e&&e.__esModule?e:{default:e}}var o=n(1),r=u(o),l=n(2),a=u(l),c=n(3),i=u(c),f=(0,a.default)("#app");r.default.base("/chatRoom"),(0,r.default)("/",function(){console.log(1),f.html(i.default)}),(0,r.default)("/test",function(){console.log(2)}),(0,r.default)()},function(e,t){e.exports=page},function(e,t){e.exports=jQuery},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(4);var u=template.compile("<ul>{{each list value i}}<li>索引 {{i + 1}} ：{{value}}</li>{{/each}}</ul>"),o=u({list:["摄影","电影","民谣","旅行","吉他"]});t.default=o},function(e,t){}]);