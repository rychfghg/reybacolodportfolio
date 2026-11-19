// Edit this file to update your portfolio content.
export const profile = {
  name: 'Rey Christian E. Bacolod',
  short: 'Rey Bacolod',
  title: 'Full-Stack Developer & UI/UX Designer',
  tagline:
    'I build thoughtful digital work, from full-stack and mobile apps to interactive stories and clean interface design.',
  location: 'Philippines',
  email: 'bacolodreychristian0@gmail.com',
  github: 'https://github.com/rychfghg',
  // Paste your resume link here (Google Drive, PDF, etc.). While empty, the
  // Resume button shows a "coming soon" message instead.
  resume: '',
}

// links: { live, code, design } - leave out any that don't apply
export const projects = [
  {
    title: 'JapLearn 2.0',
    kicker: 'Capstone · Team of 5',
    role: 'Full-Stack Developer',
    year: '2026',
    description:
      'An interactive Japanese learning platform with structured lessons, gamified practice, speaking activities, progress tracking, and dedicated student and teacher experiences. Available on Android.',
    tags: ['React Native', 'Expo', 'TypeScript', 'Python', 'Vercel'],
    links: {
      live: 'https://portal.japlearn.com/',
      code: 'https://github.com/rychfghg/JapLearn-2.0',
    },
    theme: { bg: '#2a1259', accent: '#b794ff', image: '/shots/japlearn.jpg', appImage: '/shots/japlearn-app.png', glyph: '日本語' },
  },
  {
    title: 'Palasyo: A Political Story',
    kicker: 'Solo Project',
    role: 'Designer & Developer',
    year: '2026',
    description:
      'Six years. One nation. Every decision has a price. An interactive political story game set on a fictional archipelago, where your choices shape the country.',
    tags: ['React', 'TypeScript', 'Zustand', 'Java', 'Spring Boot'],
    links: {
      live: 'https://frontend-gamma-one-39.vercel.app',
      code: 'https://github.com/rychfghg/Palasyo---Political-Story',
    },
    theme: { bg: '#0a1f2e', accent: '#e2bd6f', image: '/shots/palasyo.jpg', glyph: 'Palasyo' },
  },
  {
    title: 'SyncShot',
    kicker: 'Subtitle QA Made Visual',
    role: 'Developer',
    year: '2026',
    description:
      'A lightweight tool for subtitle reviewers, translators and QA teams. Upload a video and an SRT file, sync the subtitles, auto-capture screenshots at key timestamps and export to Excel.',
    tags: ['React', 'Vite', 'JavaScript'],
    links: {
      live: 'https://sync-shot-zeta.vercel.app',
      code: 'https://github.com/rychfghg/SyncShot',
    },
    theme: { bg: '#10215c', accent: '#7aa2ff', image: '/shots/syncshot.jpg', glyph: 'SRT' },
  },
  {
    title: 'TrackUtang',
    kicker: 'Android App · Solo',
    role: 'Android Developer',
    year: '2026',
    description:
      'An offline, privacy-first Android debt tracker for money you lend or borrow. All debts and payments are stored in the device’s local database, with no login or account. Includes a dashboard of totals, partial payments and per-debt payment history.',
    tags: ['Java', 'Android SDK', 'SQLite', 'Gradle', 'Offline-first'],
    links: {
      download: 'https://rychfghg.github.io/TrackUtang/',
      code: 'https://github.com/rychfghg/TrackUtang',
    },
    theme: {
      bg: '#06302f', accent: '#2dd4bf', image: null, glyph: '₱',
      phones: ['/shots/trackutang-lent.png', '/shots/trackutang-home.png', '/shots/trackutang-insights.png'],
    },
  },
  {
    title: 'CampusReserve',
    kicker: 'UI/UX Case Study',
    role: 'UI/UX Designer',
    year: '2026',
    description:
      'A campus facility reservation experience designed in Figma, with clear user flows, an easy booking journey and a consistent component system.',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'Wireframing'],
    links: {
      design: 'https://www.figma.com/design/kZhUDkGrcNsaPFKlHxxcjD/CampusReserve?t=1GPyyPzW7W9gw3Ir-0',
    },
    theme: { bg: '#3a1608', accent: '#ff8a4c', image: null, glyph: 'UI/UX' },
  },
]

export const stack = [
  {
    group: 'Development',
    icon: '</>',
    items: ['TypeScript', 'JavaScript', 'React', 'React Native', 'Expo', 'Vite', 'Zustand', 'React Router', 'HTML', 'CSS', 'Java', 'Spring Boot', 'Python', 'Android (Java)'],
  },
  {
    group: 'Databases & Backend',
    icon: '⛁',
    items: ['Supabase', 'MongoDB', 'SQLite'],
  },
  {
    group: 'Cloud & Tools',
    icon: '☁',
    items: ['AWS', 'Vercel', 'GitHub Pages', 'Git', 'GitHub', 'VS Code', 'Android Studio', 'Gradle', 'Google Sign-In', 'Generative AI'],
  },
  {
    group: 'AI Tools',
    icon: '✦',
    items: ['Claude', 'OpenAI Codex', 'ChatGPT', 'Gemini', 'DeepSeek'],
  },
  {
    group: 'Design',
    icon: '✎',
    items: ['Figma', 'Canva', 'Adobe Photoshop', 'UI/UX Design', 'Prototyping', 'Wireframing'],
  },
  {
    group: 'Productivity',
    icon: '▦',
    items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Microsoft Teams', 'Outlook', 'Google Docs', 'Google Sheets', 'Google Slides'],
  },
]

export const certifications = [
  {
    title: 'AWS Academy Graduate: Generative AI Foundations',
    issuer: 'Amazon Web Services',
    date: 'Nov 2026',
    link: 'https://www.credly.com/badges/4a5f0cc9-07ef-4df3-84d5-bf51d7cc5482',
    tag: 'AWS',
  },
  {
    title: 'AWS Academy Graduate: Cloud Foundations',
    issuer: 'Amazon Web Services',
    date: 'Oct 2026',
    link: 'https://www.credly.com/badges/99b2c286-68d9-479f-be17-b4dec1e98e89',
    tag: 'AWS',
  },
  {
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'Credly',
    date: 'Aug 2026',
    link: 'https://www.credly.com/earner/earned/badge/adfd6866-e006-4568-a487-ab81a73f27ab',
    tag: 'AI',
  },
]
