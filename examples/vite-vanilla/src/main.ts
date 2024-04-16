import './index.css'
import '@kanton-basel-stadt/designsystem/icons/symbol/pen';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1 class="font-bold text-4xl">Hello, World!</h1>

    <icon-symbol-pen />
  </div>
`
