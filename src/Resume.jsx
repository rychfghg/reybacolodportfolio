import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { profile } from './data.js'
import { Arrow } from './icons.jsx'

const DocIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z" strokeLinejoin="round" />
    <path d="M14 3v6h6M8 13h8M8 17h5" strokeLinecap="round" />
  </svg>
)

// Opens the resume if a link is set in data.js, otherwise shows a "coming soon" popup.
export default function ResumeButton({ className = 'btn', icon = true }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (profile.resume) {
    return (
      <a className={className} href={profile.resume} target="_blank" rel="noreferrer">
        {icon && <DocIcon />} Resume <Arrow s={12} />
      </a>
    )
  }

  return (
    <>
      <button className={className} onClick={() => setOpen(true)}>
        {icon && <DocIcon />} Resume
      </button>
      {open && createPortal(
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="resume-title" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon"><DocIcon /></div>
            <span className="modal-tag">Coming soon</span>
            <h3 id="resume-title">My resume is on its way</h3>
            <p>
              I&rsquo;m putting the finishing touches on my resume, and it will be available here soon.
              In the meantime, feel free to reach out by email and I&rsquo;ll send you a copy directly.
            </p>
            <div className="modal-actions">
              <a className="btn dark" href={`mailto:${profile.email}?subject=Resume%20request`}>Request via email <Arrow s={12} /></a>
              <button className="btn" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
