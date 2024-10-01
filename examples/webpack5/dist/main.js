(() => {
  "use strict";
  (() => {
    class e extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '<svg width="1.2em" height="1.2em" data-symbol="pen" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <path d="M2 18L10 18H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n    <path d="M10.1969 4.51381L12.7111 1.99966L17.1108 6.39941L14.5967 8.91356M10.1969 4.51381L5.24587 9.46488C5.05833 9.65242 4.95297 9.90677 4.95297 10.172L4.95298 14.1575L8.93851 14.1575C9.20373 14.1575 9.45808 14.0522 9.64562 13.8646L14.5967 8.91356M10.1969 4.51381L14.5967 8.91356" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n'
      }
    }

    customElements.define("icon-symbol-pen", e)
  })()
})();
