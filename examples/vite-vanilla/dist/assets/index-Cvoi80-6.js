(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=l(e);fetch(e.href,s)}})();class o extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 34"><path fill="currentColor" d="M7.497 17.892h9.388c.235 3.254 3.063 15.924 3.063 15.924s-3.271-2.926-4.763-4.498c-.832 1.572-2.926 4.498-2.926 4.498s-2.153-2.962-3.064-4.498c-1.598 1.608-4.763 4.498-4.763 4.498s2.833-13.065 3.063-15.924h.002ZM4.714 11.015C2.36 11.472-.164 9.645.008 6.48.181 3.312 2.897.61 6.48.084c3.149-.465 6.745.995 8.38 4.595 1.02 2.249 1.014 4.625 1.387 7.02H8.48c.116-.48.433-1.836.521-3.144.175-2.598-1.752-3.996-3.388-3.81-1.515.171-2.35 1.235-2.402 2.219-.03.58.24 1.352.963 1.427.431.046.865-.266.894-.67.024-.333-.3-.633-.559-.633-.211 0-.357.172-.476.338-.153-.395.267-1.46 1.3-1.513.923-.047 1.945.79 2.027 1.97.11 1.566-.994 2.813-2.647 3.132ZM17.608 16.174H7.078a.593.593 0 0 0-.603.587c0 .325.326.586.657.586h10.42c.333 0 .656-.261.656-.586a.593.593 0 0 0-.601-.587h.001ZM16.951 12.217H7.422c-.333 0-.657.261-.657.586 0 .325.269.586.602.586h9.64a.593.593 0 0 0 .601-.586c0-.325-.325-.586-.657-.586ZM18.271 13.877H6.373c-.502 0-.965.395-.965.884s.463.884.965.884h11.898c.502 0 .965-.395.965-.884s-.463-.884-.965-.884Z"/></svg>
`}}customElements.define("icon-symbol-baselstab",o);class r extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12.917 12.917 2.916 2.916M4.167 9.167a5 5 0 1 0 10 0 5 5 0 0 0-10 0Z"/></svg>
`}}customElements.define("icon-symbol-search",r);class c extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" viewBox="0 0 20 20">
  <circle cx="10" cy="4" r="1.5" fill="currentColor" />
  <circle cx="10" cy="9" r="1.5" fill="currentColor" />
  <circle cx="10" cy="14" r="1.5" fill="currentColor" />
</svg>
`}}customElements.define("icon-symbol-dots",c);class d extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 18h16M10.197 4.514 12.71 2l4.4 4.4-2.514 2.514m-4.4-4.4-4.951 4.95a1 1 0 0 0-.293.708v3.986h3.986a1 1 0 0 0 .707-.293l4.95-4.951m-4.4-4.4 4.4 4.4"/></svg>
`}}customElements.define("icon-symbol-pen",d);class m extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="currentColor" fill-rule="evenodd" d="M7.994 10.448 2 3h4.748l3.7 4.603L14.4 3.021h2.615l-5.303 6.155L18 17h-4.733L9.26 12.022l-4.277 4.964H2.354l5.64-6.538Zm5.963 5.172L4.91 4.38h1.146l9.034 11.24h-1.134Z"/></svg>
`}}customElements.define("icon-symbol-x-formerly-twitter",m);class h extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M14.167 1.667h-2.5A4.167 4.167 0 0 0 7.5 5.833v2.5H5v3.334h2.5v6.666h3.333v-6.666h2.5l.834-3.334h-3.334v-2.5A.833.833 0 0 1 11.667 5h2.5V1.667Z"/></svg>
`}}customElements.define("icon-symbol-facebook",h);class u extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z"/></svg>
`}}customElements.define("icon-symbol-instagram",u);class b extends HTMLElement{connectedCallback(){this.innerHTML=`<svg width="1.2em" height="1.2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15 5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z"/></svg>
`}}customElements.define("icon-symbol-youtube",b);class f extends HTMLElement{connectedCallback(){this.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="-30 -30 508 572"><path fill="currentColor" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
`}}customElements.define("icon-symbol-linkedin",f);document.querySelector("#app").innerHTML=`
<div class="min-h-screen flex flex-col">
  <!-- HEADER -->

  <div
      class="border-b border-b-gray-400 bg-white transition ease-in-out duration-250 z-app-top will-change-transform top-0 sticky">
    <div>
      <header class="page-header grid items-center relative container is-wide"><h1 class="sr-only">Hauptnavigation</h1>
        <div class="flex items-center grid-area-l relative z-30"><a
            class="nuxt-link-exact-active inline-block hover:opacity-80" href="/">
          <div class="flex whitespace-nowrap leading-none relative text-base lg:text-lg xl:text-2xl">
            <icon-symbol-baselstab aria-hidden="true" class="[&>svg]:mt-[0.18em] [&>svg]:text-[0.59em] [&>svg]:w-[1em] [&>svg]:h-[1.7em]"></icon-symbol-baselstab>
            <span class="h-[1.2083em] ml-[0.3em] pl-[0.25em] leading-[1.2em] border-l border-gray-900 font-bold"><span
                class="sr-only">Herausgeber: </span> Kanton Basel-Stadt </span></div>
          <span class="sr-only"> (Dieser Link führt zur Startseite) </span></a></div>
        <div class="grid-area-m flex gap-10 justify-end">
          <div class="flex flex-row gap-10 justify-end items-center absolute top-0 bg-white pt-60 pb-[14px] inset-x-0 md:!flex w-auto px-15 z-20 md:static md:size-auto md:p-0 md:overflow-visible"
               style="display:none;">
            <div class="md:relative">
              <button aria-controls="language-switcher-list" aria-expanded="false"
                      aria-label="Verfügbare Sprachen anzeigen. Aktuelle Sprache ist Deutsch" class="button is-sm is-dropdown"
                      id="language-switcher-button" type="button"><span
                  class="uppercase inline-block min-w-20 text-left" title="Deutsch">de</span></button>
            </div>
            <div><a class="button is-sm is-link" href="https://ekonto.egov.bs.ch" target="_blank">ePortal <span
                class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></a></div>
          </div>
          <a class="button is-icon-only is-sm relative z-30" href="/suche">
            <span class="sr-only">Öffnet die Suchseite und fokussiert automatisch das Suchfeld</span>
            <icon-symbol-search aria-hidden="true" class="[&>svg]:translate-y-1"/>
          </a>
          <button class="button is-sm md:!hidden relative z-20 !px-5 py-0 !items-center flex justify-center !gap-0">
            <icon-symbol-dots aria-hidden="true" class="[&>svg]:translate-y-1"/>
          </button>
        </div>
        <div class="grid-area-n flex justify-center relative z-10">
          <div
              class="text-toggle-switch text-lg lg:text-sm xl:text-xl transition md:transition-none duration-300 ease-swing will-change-transform">
            <nav aria-label="Hauptnavigation" class="text-toggle-switch-inner">
              <a href="/themen"><span>Themen</span></a>
              <a href="/organisation"><span>Organisation</span></a>
            </nav>
          </div>
        </div>
      </header>
    </div>
  </div>
  
  <!-- END HEADER -->

  <main class="flex-1">
    <h1 class="font-bold text-4xl">Hello, World!</h1>
  
    <icon-symbol-pen></icon-symbol-pen>
  </main>

  <!-- FOOTER -->

  <div>
    <footer class="bg-gray-200 py-20 lg:py-40 print:hidden">
      <h1 class="sr-only">Fusszeile</h1>
      <div class="container flex flex-col gap-25">
        <nav aria-label="Schnellzugriffs-Navigationsmenü">
          <ul class="flex flex-wrap gap-5 font-medium">
            <li><a class="button is-sm is-link"
                            href="/themen/arbeit-steuern/stellenbesetzung-arbeitslosigkeit/offene-stellen/offene-stellen-beim-kanton">
              Kanton Basel-Stadt als Arbeitgeber</a></li>
            <li><a class="button is-sm is-link" href="https://map.geo.bs.ch/" target="_blank">Stadtplan
              &amp; Karte</a></li>
            <li><a class="button is-sm is-link" href="https://staatskalender.bs.ch" target="_blank">
              Kontakte &amp; Adressen</a></li>
            <li><a class="button is-sm is-link" href="https://www.gesetzessammlung.bs.ch/" target="_blank">
              Gesetzessammlung</a></li>
            <li><a class="button is-sm is-link" href="https://statistik.bs.ch" target="_blank">
              Statistiken</a></li>
            <li><a class="button is-sm is-link" href="https://www.basel.com/de" target="_blank">
              Tourismus</a></li>
            <li><a class="button is-sm is-link" href="/veranstaltungen">Veranstaltungen</a>
            </li>
            <li><a class="button is-sm is-link" href="/publikationen">Publikationen</a></li>
            <li><a class="button is-sm is-link" href="/medien/medienmitteilungen">Medien</a>
            </li>
            <li><a class="button is-sm is-link" href="https://kantonsblatt.ch" target="_blank">
              Kantonsblatt</a></li>
            <li><a class="button is-sm is-link" href="https://www.bs.ch/apps/multimedia-datenbank"
                            target="_blank">Bilddatenbank des Kanton Basel-Stadt</a></li>
          </ul>
        </nav>
        <nav aria-label="Menü für Soziale Medien">
          <ul class="flex flex-wrap gap-5 font-medium">
            <li><a class="button is-sm is-icon-only" href="https://twitter.com/baselstadt" target="_blank">
              <icon-symbol-x-formerly-twitter aria-hidden="true"/>
              <span class="sr-only">Twitter <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
            </a></li>
            <li><a class="button is-sm is-icon-only" href="https://www.facebook.com/Rathaus.Basel" target="_blank">
              <icon-symbol-facebook aria-hidden="true"/>
              <span class="sr-only">Facebook <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
            </a></li>
            <li><a class="button is-sm is-icon-only" href="https://www.instagram.com/kantonbaselstadt/" target="_blank">
              <icon-symbol-instagram aria-hidden="true"/>
              <span class="sr-only">Instagram <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
            </a></li>
            <li><a class="button is-sm is-icon-only" href="https://www.youtube.com/user/kantonbaselstadt/videos"
                   target="_blank">
              <icon-symbol-youtube aria-hidden="true"/>
              <span class="sr-only">Youtube <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
            </a></li>
            <li><a class="button is-sm is-icon-only" href="https://www.linkedin.com/company/kanton-basel-stadt/"
                   target="_blank">
              <icon-symbol-linkedin aria-hidden="true"/>
              <span class="sr-only">Linkedin <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
            </a></li>
          </ul>
        </nav>
        <nav aria-label="Metadatenmenü">
          <ul class="flex flex-wrap font-medium gap-x-15 gap-y-10">
            <li><a
                class="nuxt-link-exact-active link text-sm underline decoration-white underline-offset-4 hover:decoration-blue-700"
                href="/">Startseite</a></li>
            <li><a class="link text-sm underline decoration-white underline-offset-4 hover:decoration-blue-700"
                   href="/datenschutzerklaerung">Datenschutz</a></li>
            <li><a class="link text-sm underline decoration-white underline-offset-4 hover:decoration-blue-700"
                   href="/impressum">Impressum</a></li>
            <li><a class="link text-sm underline decoration-white underline-offset-4 hover:decoration-blue-700"
                   href="/taxonomy/term/1797">Ombudsstelle</a></li>
          </ul>
        </nav>
        <div class="font-bold text-blue-900 text-sm">© 2024 Basel-Stadt</div>
      </div>
    </footer>
  </div>
  
  <!-- END FOOTER -->
</div>
`;
