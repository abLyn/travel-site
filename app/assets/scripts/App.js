import "../styles/styles.css"
import "lazysizes"
require.context("../images", true)
//-----------------------------------------------------------------------------------------------
import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"
import ClientArea from "./modules/ClientArea"
//-----------------------------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept()
}

new StickyHeader()
new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)
new MobileMenu()
new ClientArea()
let modal

document.querySelectorAll(".open-modal").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault()
    if (typeof modal == "undefined") {
      import(/* webpackChunkName: "modal" */ "./modules/Modal")
        .then((x) => {
          modal = new x.default()
          setTimeout(() => modal.openTheModal(), 20)
        })
        .catch(() => console.log("There was a problem."))
    } else {
      modal.openTheModal()
    }
  })
})
