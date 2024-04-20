import './style.css'

import { html } from 'htl'
import Navigo from 'navigo'

const navigo = new Navigo('/')

navigo.on(() => {
    document.body.replaceChildren(html`<button id="sketches">What</button>`)
  })

navigo.resolve()
export default navigo
