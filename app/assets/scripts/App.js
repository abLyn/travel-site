import "../styles/styles.css"
require.context("../images", true)

import MobileMenu from "./modules/MobileMenu"

let mobileMenu = new MobileMenu()

//---------------------------------------------------------------------------------------
if (module.hot) {
  module.hot.accept()
}
