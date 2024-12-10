/// <reference types="astro/astro-jsx" />

declare module '@kanton-basel-stadt/designsystem/icons/symbol/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
  export default component
}
declare module 'virtual:@kanton-basel-stadt/designsystem/icons/symbol/*' {
  const component: (props: astroHTML.JSX.SVGAttributes) => astroHTML.JSX.Element
  export default component
}
