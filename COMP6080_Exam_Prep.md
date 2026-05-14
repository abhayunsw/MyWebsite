# COMP6080 Exam Prep Cheatsheet
> Keep updating this as you learn more!

---

## STEP 1 — Project Setup (Do this EVERY time, same steps always)

```bash
mkdir project-name
cd project-name
npm create vite@latest ./ -- --template react
npm install
npm install react-router-dom
npm run dev
```

---

## STEP 2 — Clean Up Boilerplate (Do this EVERY time)

Delete these files:
```bash
rm src/App.css
rm src/index.css
rm -rf src/assets
```

Remove the CSS import from `src/main.jsx`:
```jsx
// DELETE this line:
import './index.css'
```

Replace `src/App.jsx` with blank slate:
```jsx
function App() {
  return <div>Hello</div>
}
export default App
```

---

## STEP 3 — Folder Structure (Do this EVERY time)

```bash
mkdir src/pages
mkdir src/components
```

Your src folder should always look like:
```
src/
  pages/
    Home.jsx
    Game1.jsx
    Game2.jsx
    Game3.jsx
  components/
    Header.jsx    (or Sidebar.jsx)
    Footer.jsx
  App.jsx
  main.jsx
```

---

## STEP 4 — Routing Setup (Do this EVERY time)

Always goes in `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Game1 from './pages/Game1'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game1" element={<Game1 />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
```

---

## STEP 5 — Navigation Links (React Router way)

NEVER use `<a href="">` — always use `<Link>`:

```jsx
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/game1">Game 1</Link>
    </nav>
  )
}
```

---

## EXAM SPECIFIC — Header Requirements (10 marks)

```jsx
// Header.jsx
function Header() {
  return (
    <div style={{
      height: '80px',
      width: '100%',
      position: 'fixed',
      top: 0,
      backgroundColor: '#eeeeee',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 1000,
    }}>
      {/* Logo - top left, 50x50, 15px margin */}
      <img
        src="/logo.png"
        style={{ width: '50px', height: '50px', margin: '15px' }}
      />

      {/* Nav - right side, responsive text */}
      <nav style={{ marginRight: '20px' }}>
        {/* See responsive nav pattern below */}
      </nav>
    </div>
  )
}
```

---

## EXAM SPECIFIC — Footer Requirements

```jsx
// Footer.jsx
function Footer() {
  return (
    <div style={{
      height: '50px',
      width: '100%',
      backgroundColor: '#999999',
      // NOT position:fixed — sits at bottom of page content
    }}>
    </div>
  )
}
```

---

## EXAM SPECIFIC — Responsive Nav (viewport width check)

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header() {
  const [isNarrow, setIsNarrow] = useState(window.innerWidth <= 800)

  useEffect(() => {
    const handleResize = () => setIsNarrow(window.innerWidth <= 800)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ height: '80px', position: 'fixed', width: '100%',
      backgroundColor: '#eeeeee', display: 'flex',
      alignItems: 'center', justifyContent: 'space-between' }}>
      <img src="/logo.png" style={{ width: '50px', height: '50px', margin: '15px' }} />
      <nav style={{ marginRight: '20px' }}>
        <Link to="/">{isNarrow ? 'H' : 'Home'}</Link> |
        <Link to="/game1">{isNarrow ? 'G1' : 'Game 1'}</Link>
      </nav>
    </div>
  )
}
```

---

## EXAM SPECIFIC — localStorage (persisting data)

```jsx
// Save to localStorage
localStorage.setItem('gamesWon', JSON.stringify(5))

// Read from localStorage
const saved = localStorage.getItem('gamesWon')
const gamesWon = saved ? JSON.parse(saved) : 0

// In a component with useState
const [gamesWon, setGamesWon] = useState(() => {
  const saved = localStorage.getItem('gamesWon')
  return saved ? JSON.parse(saved) : 0
})

// Update and save at same time
const addWin = () => {
  const newCount = gamesWon + 1
  setGamesWon(newCount)
  localStorage.setItem('gamesWon', JSON.stringify(newCount))
}
```

---

## EXAM SPECIFIC — Fetch from URL on load

```jsx
import { useEffect, useState } from 'react'

function Dashboard() {
  const [score, setScore] = useState(0)

  useEffect(() => {
    // Check localStorage first
    const saved = localStorage.getItem('gamesWon')
    if (saved) {
      setScore(JSON.parse(saved))
    } else {
      // First time — fetch from URL
      fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
        .then(res => res.json())
        .then(data => {
          setScore(data.score)
          localStorage.setItem('gamesWon', JSON.stringify(data.score))
        })
    }
  }, [])

  const handleReset = () => {
    fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json')
      .then(res => res.json())
      .then(data => {
        setScore(data.score)
        localStorage.setItem('gamesWon', JSON.stringify(data.score))
      })
  }

  return (
    <div>
      <p>Games won: {score} <button onClick={handleReset}>(reset)</button></p>
    </div>
  )
}
```

---

## EXAM SPECIFIC — Keyboard Events (arrow keys)

```jsx
import { useEffect } from 'react'

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft')  { /* move left */ }
    if (e.key === 'ArrowRight') { /* move right */ }
    if (e.key === 'ArrowUp')    { /* move up */ }
    if (e.key === 'ArrowDown')  { /* move down */ }
  }

  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [/* dependencies */])
```

---

## EXAM SPECIFIC — Timer (for Tetris-style games)

```jsx
import { useEffect, useRef } from 'react'

const intervalRef = useRef(null)

// Start timer
intervalRef.current = setInterval(() => {
  // runs every 1 second
  moveBlockDown()
}, 1000)

// Stop timer (important! clean up)
useEffect(() => {
  return () => clearInterval(intervalRef.current)
}, [])
```

---

## EXAM SPECIFIC — Grid Layout (for puzzle/tetris games)

```jsx
// 3x3 grid example (Slido)
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 150px)',
  gridTemplateRows: 'repeat(3, 150px)',
}}>
  {cells.map((cell, index) => (
    <div key={index} style={{
      width: '150px',
      height: '150px',
      border: '1px solid #333',
      margin: '0px',
    }}>
      {cell}
    </div>
  ))}
</div>
```

---

## COMMON MISTAKES TO AVOID

- Forgetting `npm install react-router-dom` before writing App.jsx
- Using `<a href="">` instead of `<Link to="">`
- Forgetting to add `80px` padding-top to main content (so header doesn't cover it)
- Using `position: fixed` on footer (it should scroll with page)
- Forgetting to clean up event listeners and timers in useEffect return
- Not saving to localStorage after every state change

---

## Things to add as I learn more...
