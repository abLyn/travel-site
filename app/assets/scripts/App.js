import "../styles/styles.css"
require.context("../images", true)

import MobileMenu from "./modules/MobileMenu"
import RevealOnScroll from "./modules/RevealOnScroll"
import StickyHeader from "./modules/StickyHeader"

new RevealOnScroll(document.querySelectorAll(".feature-item"), 75)
new RevealOnScroll(document.querySelectorAll(".testimonial"), 60)

let mobileMenu = new MobileMenu()
let stickyHeader = new StickyHeader()

//---------------------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept()
}
