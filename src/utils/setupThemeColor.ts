// Change <meta name="theme-color"> on prefers-color-scheme change and on app load
let isSetUp = false

function changeThemeColor() {
  const backgroundColor = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--background')

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', backgroundColor)
}

export default function setupThemeColor() {
  if (isSetUp) {
    return
  }

  isSetUp = true

  changeThemeColor()

  const media = window.matchMedia('(prefers-color-scheme: dark)')
  media.addEventListener('change', () => {
    changeThemeColor()
  })
}
