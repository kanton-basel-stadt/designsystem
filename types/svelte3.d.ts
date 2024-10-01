declare module 'virtual:icons/*' {
  export { SvelteComponentDev as default } from 'svelte/internal'
}

declare module '@kanton-basel-stadt/designsystem/icons/symbol/*' {
  import { SvelteComponentTyped } from 'svelte'

  export default class extends SvelteComponentTyped<svelte.JSX.IntrinsicElements['svg']> {}
}
