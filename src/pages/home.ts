import { html } from 'htl'

const background = () => {
  return html`<div class="fixed bottom-0 left-0 right-0 top-0 flex">
      <div class="w-1/6 bg-red-500"></div>
      <div class="w-1/6 bg-orange-500"></div>
      <div class="w-1/6 bg-yellow-500"></div>
      <div class="w-1/6 bg-green-500"></div>
      <div class="w-1/6 bg-blue-500"></div>
      <div class="w-1/6 bg-violet-500"></div>
    </div>`
}

const page = (children: HTMLElement) => {
  return html`<div class="p-20">${children}</div>`
}

export default () => {
  return page(html`${background()}<h1 class="text-4xl md:text-6xl font-bold text-center text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Template</h1>
  `)
}
