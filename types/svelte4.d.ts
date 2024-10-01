declare module 'virtual:icons/*' {
  import { SvelteComponent } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  export default class extends SvelteComponent<SvelteHTMLElements['svg']> {}
}

declare module '@kanton-basel-stadt/designsystem/icons/symbol/*' {
  import { SvelteComponent } from 'svelte'
  import type { SvelteHTMLElements } from 'svelte/elements'

  export default class extends SvelteComponent<SvelteHTMLElements['svg']> {}
}
