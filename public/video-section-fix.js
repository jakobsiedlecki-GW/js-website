(() => {
  const videos = [
    ['Mit Jean Pütz: Die altersbedingte Makuladegeneration (AMD) – weit verbreitet, aber kaum bekannt.', 'https://www.youtube.com/embed/MrGrB5dzV0U'],
    ['Checker Tobi (KiKA/Das Erste): Der Augen-Check', 'https://www.youtube.com/embed/N9L75KJIktk'],
    ['Galileo (ProSieben): Verbessert Schokolade wirklich das Sehvermögen?', 'https://www.youtube.com/embed/Nr7ryyeRcdE'],
    ['Retina-Sprechstunde (Teil 1)', 'https://www.youtube.com/embed/VjFzIsMXSnk'],
  ]

  const activateVideo = (card, title, url) => {
    const frame = card.querySelector('.video-frame')
    if (!frame) return
    frame.textContent = ''
    const iframe = document.createElement('iframe')
    iframe.src = url
    iframe.title = title
    iframe.loading = 'lazy'
    iframe.allowFullscreen = true
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
    frame.appendChild(iframe)
  }

  const applyVideoFix = () => {
    const section = document.getElementById('videos')
    if (!section) return

    const heading = section.querySelector('.section-title')
    if (heading) {
      heading.textContent = 'Videos: PD Dr. med. Siedlecki bei Checker Tobi, Galileo & Co'
    }

    const cards = [...section.querySelectorAll('.video-grid .card')]
    if (cards.length < 4) return

    cards.slice(0, 4).forEach((card, index) => {
      const [title, url] = videos[index]
      const titleNode = card.querySelector('.video-title')
      if (titleNode) titleNode.textContent = title

      const oldButton = card.querySelector('.video-activate')
      if (!oldButton || oldButton.dataset.fixedVideoButton === 'true') return

      const button = oldButton.cloneNode(true)
      button.dataset.fixedVideoButton = 'true'
      button.addEventListener('click', (event) => {
        event.preventDefault()
        event.stopPropagation()
        activateVideo(card, title, url)
      })
      oldButton.replaceWith(button)
    })

    cards.slice(4).forEach((card) => card.remove())
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyVideoFix)
  } else {
    applyVideoFix()
  }

  window.setTimeout(applyVideoFix, 250)
})()
