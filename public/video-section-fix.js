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

  const updateInfoBannerStyle = (section) => {
    const banner = section.querySelector('.video-info-banner')
    if (!banner) return

    const isMobile = window.matchMedia('(max-width: 760px)').matches

    if (isMobile) {
      banner.style.background = '#f7fbfa'
      banner.style.border = '1px solid #d8e6e2'
      banner.style.boxShadow = 'none'
      banner.style.borderRadius = '14px'
      banner.style.color = '#6b8f88'
      banner.style.maxHeight = '76px'
      banner.style.overflowY = 'auto'
      banner.style.padding = '9px 34px 9px 12px'
      banner.style.marginTop = '10px'
      banner.style.WebkitOverflowScrolling = 'touch'
      banner.style.scrollbarWidth = 'thin'
    } else {
      banner.style.background = 'transparent'
      banner.style.border = '0'
      banner.style.boxShadow = 'none'
      banner.style.borderRadius = ''
      banner.style.color = '#6b8f88'
      banner.style.maxHeight = ''
      banner.style.overflowY = ''
      banner.style.padding = ''
      banner.style.marginTop = ''
      banner.style.WebkitOverflowScrolling = ''
      banner.style.scrollbarWidth = ''
    }

    const headline = banner.querySelector('strong')
    if (headline) {
      headline.style.color = '#6b8f88'
    }
  }

  const updatePlaceholderText = (card) => {
    const placeholderTitle = card.querySelector('.video-placeholder-title')
    if (placeholderTitle) {
      placeholderTitle.textContent = 'Externer YouTube-Inhalt (Google Ireland Limited)'
    }

    const placeholderText = card.querySelector('.video-placeholder-text')
    if (placeholderText) {
      placeholderText.innerHTML = 'Beim Laden wird eine Verbindung zu Google-Servern hergestellt, wobei Daten ggf. auch in die USA übertragen werden. Dabei werden personenbezogene Daten (z.B. IP-Adresse) übertragen und ggf. Cookies gesetzt. Mehr dazu in unserer <a href="/datenschutz.html">Datenschutzerklärung</a>.'
    }
  }

  const applyVideoFix = () => {
    const section = document.getElementById('videos')
    if (!section) return

    updateInfoBannerStyle(section)

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

      updatePlaceholderText(card)

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

  window.addEventListener('resize', applyVideoFix)
  window.setTimeout(applyVideoFix, 250)
})()
