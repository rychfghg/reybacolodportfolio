import { useEffect, useState } from 'react'
import { profile, projects, certifications, stack } from './data.js'
import { Arrow, Icon } from './icons.jsx'
import Projects from './Projects.jsx'
import Cursor from './Cursor.jsx'
import ResumeButton from './Resume.jsx'

const ext = { target: '_blank', rel: 'noreferrer' }

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const show = (e) => e.classList.add('in')
    if (!('IntersectionObserver' in window)) return els.forEach(show)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target) } })
    }, { threshold: 0.1 })
    els.forEach((e) => io.observe(e))
    const fallback = setTimeout(() => els.forEach(show), 2500)
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])
}

function useClock() {
  const fmt = () => new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour: '2-digit', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 30000); return () => clearInterval(id) }, [])
  return t
}

function CopyEmail({ className = 'btn' }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  return <button className={className} onClick={copy}>{copied ? 'Copied ✓' : 'Copy'}</button>
}

export default function App() {
  useReveal()
  const time = useClock()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  const tools = stack.flatMap((g) => g.items)

  return (
    <>
      <Cursor />
      <div className="grain" aria-hidden="true" />

      <header className={'topbar' + (scrolled ? ' scrolled' : '')}>
        <div className="wrap topbar-inner">
          <a href="#top" className="brand">Rey Bacolod<span className="brand-dot" /></a>
          <nav className="topnav">
            <a href="#work">Work</a>
            <a href="#stack">Stack</a>
            <a href="#certs">Certificates</a>
            <a href="#contact">Contact</a>
            <ResumeButton className="topnav-resume" icon={false} />
          </nav>
        </div>
      </header>

      <main id="top" className="wrap">
        {/* ---------- HERO ---------- */}
        <section className="hero">
          <div className="hero-split">
            <div className="hero-copy reveal">
              <div className="intro-top">
                <span className="intro-loc">📍 {profile.location} · {time}</span>
              </div>
              <p className="intro-name">{profile.name}</p>
              <h1 className="hero-head">
                I design and build <span className="hl">clean, useful</span> digital experiences.
              </h1>
              <p className="hero-lead">
                {profile.title} creating web apps, mobile apps and interface designs.
              </p>
              <div className="hero-actions">
                <a className="btn dark" href="#work">View my work <Arrow /></a>
                <ResumeButton className="btn accent" />
                <a className="btn" href={profile.github} {...ext}><Icon.code /> GitHub</a>
              </div>
            </div>

            <a href="#work" className="collage reveal" aria-label="See my projects">
              {/* back → front: SyncShot, Palasyo, TrackUtang (phone), JapLearn */}
              {['SyncShot', 'Palasyo: A Political Story', 'JapLearn 2.0'].map((t, i) => {
                const p = projects.find((x) => x.title === t)
                return (
                  <figure key={t} className={`shot shot-${i}`} style={{ '--ac': p.theme.accent }}>
                    <div className="shot-bar"><i /><i /><i /></div>
                    <img src={p.theme.image} alt="" />
                    <figcaption>{p.title.split(':')[0]}</figcaption>
                  </figure>
                )
              })}
              <figure className="shot-phone">
                <img src="/shots/trackutang-home.png" alt="" />
                <figcaption>TrackUtang</figcaption>
              </figure>
              <figure className="shot-phone2">
                <div className="p2-body">
                  <span className="p2-notch" />
                  <img src="/shots/japlearn-app.png" alt="" />
                </div>
                <figcaption>JapLearn App</figcaption>
              </figure>
              <span className="collage-chip chip-a">✦ Full-Stack</span>
              <span className="collage-chip chip-b">🎨 UI/UX</span>
              <span className="collage-chip chip-c">☁ AWS Certified</span>
            </a>
          </div>

          <div className="facts reveal">
            <div className="fact"><strong>{projects.length}</strong><span>Projects</span></div>
            <div className="fact"><strong>{certifications.length}</strong><span>Certifications</span></div>
            <div className="fact"><strong>{tools.length}+</strong><span>Tools &amp; skills</span></div>
            <a className="fact-email" href={'mailto:' + profile.email}>
              <span>Email</span>
              {profile.email} <Arrow s={13} />
            </a>
          </div>

          <div className="toolrow reveal">
            <span className="toolrow-label">Tools I use</span>
            <div className="toolrow-mask" aria-hidden="true">
              <div className="track">
                {[...tools, ...tools].map((t, i) => <span key={i}>{t}</span>)}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ---------- WORK (full-bleed dark) ---------- */}
      <section id="work" className="work">
        <div className="wrap">
          <div className="work-head reveal">
            <span className="eyebrow light">Selected work · {projects.length} projects</span>
            <h2>Things I&rsquo;ve <em>built</em><br />&amp; <em>designed</em>.</h2>
            <p className="work-sub">Scroll through: each project stacks on the last. Click any preview to open it live.</p>
          </div>
          <Projects />
        </div>
      </section>

      <main className="wrap">
        {/* ---------- STACK ---------- */}
        <section id="stack" className="section split-section">
          <div className="side-head reveal">
            <span className="eyebrow">Toolbox</span>
            <h2>Tech stack &amp; tools</h2>
            <p className="side-sub">The languages, frameworks and apps I use to design, build and ship.</p>
          </div>
          <div className="stack-list">
            {stack.map((g, i) => (
              <div key={g.group} className="stack-row reveal">
                <div className="stack-row-head">
                  <span className="row-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{g.group}</h3>
                </div>
                <p className="stack-items">
                  {g.items.map((t) => <span key={t}>{t}</span>)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- CERTS ---------- */}
        <section id="certs" className="section split-section">
          <div className="side-head reveal">
            <span className="eyebrow">Credentials</span>
            <h2>Certifications</h2>
            <p className="side-sub">Verified badges from AWS Academy and Credly. Click any one to verify it.</p>
          </div>
          <div className="cert-list">
            {certifications.map((c) => (
              <a key={c.title} href={c.link} {...ext} className="cert-row reveal" data-cursor="Verify">
                <span className={`cert-logo ${c.tag.toLowerCase()}`}>{c.tag}</span>
                <span className="cert-main">
                  <span className="cert-name">{c.title}</span>
                  <span className="cert-sub">{c.issuer} · {c.date}</span>
                </span>
                <span className="cert-go">Verify <Arrow s={12} /></span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="contact reveal">
          <div className="contact-left">
            <span className="eyebrow">Get in touch</span>
            <h2>Let&rsquo;s work <em>together</em>.</h2>
            <p className="contact-sub">
              Open to internships, freelance projects and collaborations. Send me a message and I&rsquo;ll get back to you as soon as I can.
            </p>
            <div className="hero-actions">
              <a className="btn dark" href={`mailto:${profile.email}`}>Send me an email <Arrow /></a>
              <ResumeButton className="btn" />
            </div>
          </div>

          <ul className="contact-list">
            <li>
              <span className="cl-label">Email</span>
              <a className="cl-value" href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail className="cl-action" />
            </li>
            <li>
              <span className="cl-label">GitHub</span>
              <a className="cl-value" href={profile.github} {...ext}>github.com/rychfghg</a>
              <a className="cl-action" href={profile.github} {...ext} aria-label="Open GitHub"><Arrow s={14} /></a>
            </li>
            <li>
              <span className="cl-label">Location</span>
              <span className="cl-value">{profile.location}</span>
              <span className="cl-action muted">{time}</span>
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer wrap">
        <span>&copy; {new Date().getFullYear()} {profile.name}</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </>
  )
}
