<template>
    <div class="min-h-screen flex flex-col">
      <!-- HEADER -->

      <div
          class="sticky top-0 z-app-top border-b border-b-gray-400 bg-white transition duration-250 ease-in-out will-change-transform"
      >
        <div>
          <header class="page-header container is-wide relative grid items-center">
            <h1 class="sr-only">Hauptnavigation</h1>
            <div class="grid-area-l relative z-30 flex items-center">
              <a
                  class="nuxt-link-exact-active inline-block hover:opacity-80"
                  href="/"
              >
                <div
                    class="relative flex whitespace-nowrap text-base leading-none lg:text-lg xl:text-2xl"
                >
                  <IconSymbolBaselstab
                      aria-hidden="true"
                      class="translate-y-1 mt-[0.06em] text-[0.59em] w-[1em] h-[1.7em]"
                  ></IconSymbolBaselstab>
                  <span
                      class="ml-[0.3em] h-[1.2083em] border-l border-gray-900 pl-[0.25em] font-bold leading-[1.2em]"
                  >
                  <span class="sr-only">Herausgeber:</span>
                  Kanton Basel-Stadt
                </span>
                </div>
                <span class="sr-only">(Dieser Link führt zur Startseite)</span>
              </a>
            </div>
            <div class="grid-area-m flex justify-end gap-10">
              <div
                  class="absolute inset-x-0 top-0 z-20 flex w-auto flex-row items-center justify-end gap-10 bg-white px-15 pb-[14px] pt-60 md:static md:!flex md:size-auto md:overflow-visible md:p-0"
                  style="display: none;"
              >
                <div class="md:relative">
                  <button
                      aria-controls="language-switcher-list"
                      aria-expanded="false"
                      aria-label="Verfügbare Sprachen anzeigen. Aktuelle Sprache ist Deutsch"
                      class="button is-sm is-dropdown"
                      id="language-switcher-button"
                      type="button"
                  >
                  <span
                      class="inline-block min-w-20 text-left uppercase"
                      title="Deutsch"
                  >
                    de
                  </span>
                  </button>
                </div>
                <div>
                  <a
                      class="button is-sm is-link"
                      href="https://ekonto.egov.bs.ch"
                      target="_blank"
                  >
                    ePortal
                    <span class="sr-only">
                    Externer Link, wird in einem neuen Tab oder Fenster geöffnet
                  </span>
                  </a>
                </div>
              </div>
              <a class="button is-icon-only is-sm relative z-30" href="/suche">
              <span class="sr-only">
                Öffnet die Suchseite und fokussiert automatisch das Suchfeld
              </span>
                <IconSymbolSearch
                    aria-hidden="true"
                    class="translate-y-1"
                ></IconSymbolSearch>
              </a>
              <button
                  class="button is-icon-only is-sm relative z-20 flex !items-center justify-center !gap-0 !px-5 py-0 md:!hidden"
              >
                <span class="sr-only">Menü aufklappen</span>
                <IconSymbolDots
                    aria-hidden="true"
                    class="translate-y-1"
                ></IconSymbolDots>
              </button>
            </div>
            <div class="grid-area-n relative z-10 flex justify-center">
              <div
                  class="text-toggle-switch text-lg transition duration-300 ease-swing will-change-transform md:transition-none lg:text-sm xl:text-xl"
              >
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

    <h1 class="text-4xl font-bold">
      Hello, World!
    </h1>

    <IconSymbolPen />
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
                <IconSymbolXFormerlyTwitter aria-hidden="true"/>
                <span class="sr-only">Twitter <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
              </a></li>
              <li><a class="button is-sm is-icon-only" href="https://www.facebook.com/Rathaus.Basel" target="_blank">
                <IconSymbolFacebook aria-hidden="true"/>
                <span class="sr-only">Facebook <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
              </a></li>
              <li><a class="button is-sm is-icon-only" href="https://www.instagram.com/kantonbaselstadt/" target="_blank">
                <IconSymbolInstagram aria-hidden="true"/>
                <span class="sr-only">Instagram <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
              </a></li>
              <li><a class="button is-sm is-icon-only" href="https://www.youtube.com/user/kantonbaselstadt/videos"
                     target="_blank">
                <IconSymbolYoutube aria-hidden="true"/>
                <span class="sr-only">Youtube <span class="sr-only">Externer Link, wird in einem neuen Tab oder Fenster geöffnet</span></span>
              </a></li>
              <li><a class="button is-sm is-icon-only" href="https://www.linkedin.com/company/kanton-basel-stadt/"
                     target="_blank">
                <IconSymbolLinkedin aria-hidden="true"/>
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
</template>

<script lang="ts" setup>
import IconSymbolPen from '@kanton-basel-stadt/designsystem/icons/symbol/pen'
import IconSymbolBaselstab from '@kanton-basel-stadt/designsystem/icons/symbol/baselstab'
import IconSymbolSearch from '@kanton-basel-stadt/designsystem/icons/symbol/search'
import IconSymbolDots from '@kanton-basel-stadt/designsystem/icons/symbol/dots'
import IconSymbolXFormerlyTwitter from '@kanton-basel-stadt/designsystem/icons/symbol/x-formerly-twitter'
import IconSymbolFacebook from '@kanton-basel-stadt/designsystem/icons/symbol/facebook'
import IconSymbolInstagram from '@kanton-basel-stadt/designsystem/icons/symbol/instagram'
import IconSymbolYoutube from '@kanton-basel-stadt/designsystem/icons/symbol/youtube'
import IconSymbolLinkedin from '@kanton-basel-stadt/designsystem/icons/symbol/linkedin'
</script>
