import { useEffect, useRef } from 'react'
import { projects } from './data.js'
import { Arrow, Icon } from './icons.jsx'

const LABEL = { live: 'Live site', download: 'Download app', code: 'Source code', design: 'View Figma prototype' }
const ext = { target: '_blank', rel: 'noreferrer' }
const host = (u) => (u || '').replace(/^https?:\/\/(www\.)?/, '').split('/')[0]

function FigmaMock({ accent }) {
  return (
    <div className="figma">
      <div className="figma-bar"><Icon.design /><span>CampusEvent Reserve</span><em>Design</em><em>Prototype</em></div>
      <div className="figma-canvas">
        {['Login', 'Browse events', 'Reserve a venue'].map((t, i) => (
          <div key={t} className="frame" style={{ '--d': `${i * 0.15}s` }}>
            <span className="frame-label">{t}</span>
            <div className="phone">
              <b style={{ background: accent }} />
              <i /><i className="s" />
              <div className="cards"><u /><u /></div>
              <b className="cta" style={{ background: accent }} />
            </div>
          </div>
        ))}
        <span className="cursor-tag" style={{ background: accent }}>Rey</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const refs = useRef([])

  // Scale & dim each card as the next one stacks over it
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const cards = refs.current
      cards.forEach((el, i) => {
        const next = cards[i + 1]
        if (!el || !next) return
        const top = el.getBoundingClientRect().top
        const nextTop = next.getBoundingClientRect().top
        const gap = Math.max(0, Math.min(1, 1 - (nextTop - top) / el.offsetHeight))
        el.style.setProperty('--p', gap.toFixed(3))
      })
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="stackwrap">
      {projects.map((p, i) => {
        const main = p.links.live || p.links.download || p.links.design || p.links.code
        const mediaUrl = p.theme.media ? p.links[p.theme.media] : main
        const mediaTag = p.theme.media === 'design' || !p.links.live ? 'FIGMA' : 'LIVE'
        return (
          <article
            key={p.title}
            ref={(el) => (refs.current[i] = el)}
            className="pcard"
            data-cursor="Open"
            style={{ '--bg': p.theme.bg, '--ac': p.theme.accent, '--i': i, zIndex: i + 1 }}
          >
            <div className="pcard-inner">
              <div className="pcard-glow" />
              <span className="pcard-glyph" aria-hidden="true">{p.theme.glyph}</span>

              <div className="pcard-info">
                <div className="pcard-top">
                  <span className="pnum">{String(i + 1).padStart(2, '0')}<small>/{String(projects.length).padStart(2, '0')}</small></span>
                  <span className="pkicker">{p.kicker}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="prole">{p.role} · {p.year}</p>
                <p className="pdesc">{p.description}</p>
                <ul className="ptags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <div className="plinks">
                  {Object.entries(p.links).map(([k, url], j) => {
                    const I = Icon[k]
                    return (
                      <a key={k} href={url} {...ext} className={`plink ${j === 0 ? 'primary' : ''}`}>
                        <I /> {LABEL[k]} <Arrow s={12} />
                      </a>
                    )
                  })}
                </div>
              </div>

              <a className={`pcard-media ${p.theme.appImage ? 'has-phone' : ''}`} href={mediaUrl} {...ext} aria-label={`Open ${p.title}`}>
                {p.theme.phones ? (
                  <div className="phone-trio">
                    {p.theme.phones.map((src, k) => (
                      <img key={src} className={`trio trio-${k}`} src={src} alt={`${p.title} screen ${k + 1}`} loading="lazy" />
                    ))}
                    <span className="trio-badge">Android · Free download</span>
                  </div>
                ) : (
                <div className="browser">
                  <div className="browser-bar">
                    <span className="dots"><i /><i /><i /></span>
                    <span className="url">{host(mediaUrl)}</span>
                    <span className={`live-dot ${mediaTag === 'FIGMA' ? 'figma' : ''}`}>{mediaTag}</span>
                  </div>
                  <div className="browser-view">
                    {p.theme.image
                      ? <img src={p.theme.image} alt={`${p.title} screenshot`} loading="lazy" />
                      : <FigmaMock accent={p.theme.accent} />}
                  </div>
                </div>
                )}
                {p.theme.appImage && (
                  <div className="phone-frame">
                    <span className="phone-notch" />
                    <img src={p.theme.appImage} alt={`${p.title} mobile app`} loading="lazy" />
                    <span className="phone-label">Android app</span>
                  </div>
                )}
              </a>
            </div>
          </article>
        )
      })}
    </div>
  )
}
