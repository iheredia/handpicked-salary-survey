!function(){"use strict";var i=window.location,r=window.document,o=r.getElementById("plausible"),p=o.getAttribute("data-api")||(w=(w=o).src.split("/"),c=w[0],w=w[2],c+"//"+w+"/api/event");function l(e,t){e&&console.warn("Ignoring Event: "+e),t&&t.callback&&t.callback()}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(i.hostname)||"file:"===i.protocol)return l("localhost",t);if(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)return l(null,t);try{if("true"===window.localStorage.plausible_ignore)return l("localStorage flag",t)}catch(e){}var a={},n=(a.n=e,a.u=i.href,a.d=o.getAttribute("data-domain"),a.r=r.referrer||null,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=t.props),new XMLHttpRequest);n.open("POST",p,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4===n.readyState&&t&&t.callback&&t.callback()}}var t=window.plausible&&window.plausible.q||[];window.plausible=e;for(var a,n=0;n<t.length;n++)e.apply(this,t[n]);function s(){a!==i.pathname&&(a=i.pathname,e("pageview"))}var u,c=window.history;function f(e){return e&&e.tagName&&"a"===e.tagName.toLowerCase()}c.pushState&&(u=c.pushState,c.pushState=function(){u.apply(this,arguments),s()},window.addEventListener("popstate",s)),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){a||"visible"!==r.visibilityState||s()}):s();var d=1;function m(e){if("auxclick"!==e.type||e.button===d){var t,a,n=function(e){for(;e&&(void 0===e.tagName||!f(e)||!e.href);)e=e.parentNode;return e}(e.target),r=n&&n.href&&n.href.split("?")[0];if(!function e(t,a){if(!t||k<a)return!1;if(x(t))return!0;return e(t.parentNode,a+1)}(n,0))return(t=n)&&t.href&&t.host&&t.host!==i.host?v(e,n,{name:"Outbound Link: Click",props:{url:n.href}}):(t=r)&&(a=t.split(".").pop(),b.some(function(e){return e===a}))?v(e,n,{name:"File Download",props:{url:r}}):void 0}}function v(e,t,a){var n,r=!1;function i(){r||(r=!0,window.location=t.href)}!function(e,t){if(!e.defaultPrevented)return t=!t.target||t.target.match(/^_(self|parent|top)$/i),e=!(e.ctrlKey||e.metaKey||e.shiftKey)&&"click"===e.type,t&&e}(e,t)?(n={props:a.props},plausible(a.name,n)):(n={props:a.props,callback:i},plausible(a.name,n),setTimeout(i,5e3),e.preventDefault())}r.addEventListener("click",m),r.addEventListener("auxclick",m);var w=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],g=o.getAttribute("file-types"),h=o.getAttribute("add-file-types"),b=g&&g.split(",")||h&&h.split(",").concat(w)||w;function y(e){var e=x(e)?e:e&&e.parentNode,t={name:null,props:{}},a=e&&e.classList;if(a)for(var n=0;n<a.length;n++){var r,i=a.item(n).match(/plausible-event-(.+)(=|--)(.+)/);i&&(r=i[1],i=i[3].replace(/\+/g," "),"name"==r.toLowerCase()?t.name=i:t.props[r]=i)}return t}var k=3;function L(e){if("auxclick"!==e.type||e.button===d){for(var t,a,n,r,i=e.target,o=0;o<=k&&i;o++){if((n=i)&&n.tagName&&"form"===n.tagName.toLowerCase())return;f(i)&&(t=i),x(i)&&(a=i),i=i.parentNode}a&&(r=y(a),t?(r.props.url=t.href,v(e,t,r)):((e={}).props=r.props,plausible(r.name,e)))}}function x(e){var t=e&&e.classList;if(t)for(var a=0;a<t.length;a++)if(t.item(a).match(/plausible-event-name(=|--)(.+)/))return!0;return!1}r.addEventListener("submit",function(e){var t,a=e.target,n=y(a);function r(){t||(t=!0,a.submit())}n.name&&(e.preventDefault(),t=!1,setTimeout(r,5e3),e={props:n.props,callback:r},plausible(n.name,e))}),r.addEventListener("click",L),r.addEventListener("auxclick",L)}();