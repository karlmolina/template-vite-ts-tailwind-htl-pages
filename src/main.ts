import './style.css'

import { html } from 'htl'
import Navigo from 'navigo'
import home from './pages/home.ts'

const navigo = new Navigo('/')

navigo.on(() => {
    document.body.replaceChildren(home())
  })

navigo.resolve()
export default navigo
