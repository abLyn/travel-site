import "../styles/styles.css"
require.context("../images", true)

import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new MobileMenu()
StickyHeader()

let modal

document.querySelectorAll(".open-modal").forEach((elt) => {
  elt.addEventListener("click", (e) => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
        .then((x) => {
          modal = new x.default()
          setTimeout(() => modal.openTheModal(), 20)
        })
        .catch(() => console.log("There's was a problem"))
    } else {
      modal.openTheModal()
    }
  })
})

//---------------------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept()
}
