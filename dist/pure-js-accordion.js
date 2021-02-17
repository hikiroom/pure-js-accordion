!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.PJSAccordion=e():t.PJSAccordion=e()}(this,(function(){return(()=>{"use strict";var t={751:(t,e)=>{var i=function(){function t(t){var e;this.activeClass="is-active",this.animationClass="is-animation",this.inactiveClass="is-inactive";var i=Object.assign({trigger:null,target:null,isOpen:!1,duration:.2},t);this.trigger=i.trigger,this.triggerState=i.isOpen,this.trigger.classList.add("pjsa-trigger"),this.target=i.target||i.trigger.nextElementSibling,null===(e=this.target)||void 0===e||e.classList.add("pjsa-target"),this.targetState=i.isOpen,this.duration=i.duration,this.pjsaStyle=document.querySelector(".pjsa-style"),this.pjsaStyle||this.appendPJSAStyle(),this.writePJSAStyle(),this.applyStateClass(this.trigger,this.triggerState),this.applyStateClass(this.target,this.targetState),this.setEvent()}return t.prototype.appendPJSAStyle=function(){var t=document.createElement("style"),e="\n        .pjsa-target."+this.inactiveClass+" {\n            visibility: hidden !important;\n            height: 0 !important;\n        }\n        .pjsa-target."+this.inactiveClass+" .pjsa-target."+this.inactiveClass+" {\n            display: none;\n        }",i=document.createTextNode(e);t.classList.add("pjsa-style"),t.dataset.pjsaLen="0",t.appendChild(i),document.head.appendChild(t),this.pjsaStyle=t},t.prototype.writePJSAStyle=function(){var t=this.pjsaStyle,e=parseInt(t.dataset.pjsaLen,10),i="\n        .pjsa-target."+this.animationClass+'[data-index="'+e+'"] {\n            transition: height '+this.duration+"s, visibility "+this.duration+"s, margin "+this.duration+"s, padding "+this.duration+"s;\n        }",s=document.createTextNode(i);t.appendChild(s),this.target.dataset.index=String(e),t.dataset.pjsaLen=String(e+1)},t.prototype.applyStateClass=function(t,e){e?(t.classList.remove(this.inactiveClass),t.classList.add(this.activeClass)):(t.classList.remove(this.activeClass),t.classList.add(this.inactiveClass))},t.prototype.setEvent=function(){this.trigger.addEventListener("click",this.toggle.bind(this)),this.target.addEventListener("transitionend",this.removeStyle.bind(this))},t.prototype.open=function(){var t=this.target,e=t.scrollHeight;t.style.height="0",t.style.overflow="hidden",t.offsetHeight,t.style.height=e+"px",t.classList.add(this.animationClass),this.triggerState=!0,this.targetState=!0,this.applyStateClass(this.trigger,this.triggerState),this.applyStateClass(t,this.targetState)},t.prototype.close=function(){var t=this.target,e=t.offsetHeight;t.style.height=e+"px",t.offsetHeight,t.style.height="0",t.style.overflow="hidden",t.classList.add(this.animationClass),this.triggerState=!1,this.targetState=!1,this.applyStateClass(this.trigger,this.triggerState),this.applyStateClass(t,this.targetState)},t.prototype.toggle=function(){this.triggerState?this.close():this.open()},t.prototype.removeStyle=function(t){if(t.stopPropagation(),"height"===t.propertyName){var e=t.target;e.style.height="",e.style.overflow="",e.classList.remove(this.animationClass)}},t}();e.default=i}},e={};return function i(s){if(e[s])return e[s].exports;var a=e[s]={exports:{}};return t[s](a,a.exports,i),a.exports}(751)})().default}));