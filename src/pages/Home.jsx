import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function Home() {
  const [init, setInit] = useState(false)
  const [displayText, setDisplayText] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const fullText = "HELLO, I'M"

  // particles init
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => setInit(true))
  }, [])

  // detect mobile on resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // typewriter effect
  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setDisplayText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      backgroundColor: 'black',
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* Particles */}
      {init && (
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: 'transparent' } },
            particles: {
              number: { value: isMobile ? 30 : 100 },
              color: { value: ['#a855f7', '#ec4899', '#3b82f6'] },
              links: {
                enable: true,
                color: '#a855f7',
                opacity: 0.3,
                distance: 250,
                width: 1,
              },
              move: {
                enable: true,
                speed: 0.5,
              },
              size: { value: { min: 1, max: 3 } },
              opacity: { value: { min: 0.3, max: 0.8 } },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: 'grab',
                },
              },
              modes: {
                grab: {
                  distance: 300,
                  links: { opacity: 0.5 },
                },
              },
            },
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Background Image */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          left: isMobile ? '-10%' : '-35%',
          bottom: '0%',
          height: isMobile ? '60%' : '110%',
          zIndex: 1,
          opacity: isMobile ? 0.08 : 0.15,
        }}
      >
        <img
          src="/abhay.png"
          alt="Abhay"
          style={{
            height: '100%',
            filter: 'saturate(1) brightness(2)',
          }}
        />
      </motion.div>

      {/* Text Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        padding: '0 20px',
      }}>

        {/* HELLO I'M — typewriter */}
        <h2 style={{
          color: '#a855f7',
          fontSize: isMobile ? '1em' : '1.5em',
          fontWeight: 'normal',
          marginBottom: '10px',
          letterSpacing: '6px',
          minHeight: '30px',
        }}>
          {displayText}
          <span style={{
            borderRight: '2px solid #a855f7',
            marginLeft: '2px',
            animation: 'blink 1s infinite',
          }} />
        </h2>

        {/* Abhay Sharma */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            color: 'white',
            fontSize: isMobile ? '3em' : '5.5em',
            fontWeight: 'bold',
            margin: '0',
            textShadow: '0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(236,72,153,0.3)',
            letterSpacing: '2px',
          }}
        >
          Abhay Sharma
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: isMobile ? '0.7em' : '1em',
            marginTop: '15px',
            letterSpacing: isMobile ? '1px' : '3px',
          }}
        >
          CS STUDENT AT UNSW · FITNESS · PHILOSOPHY
        </motion.p>

        {/* EXPLORE button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          whileHover={{
            scale: 1.08,
            boxShadow: '0 0 25px rgba(168,85,247,0.8), 0 0 50px rgba(236,72,153,0.4)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/about'}
          style={{
            marginTop: '40px',
            padding: isMobile ? '10px 30px' : '14px 50px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            border: 'none',
            color: 'white',
            fontSize: isMobile ? '0.8em' : '1em',
            borderRadius: '30px',
            cursor: 'pointer',
            letterSpacing: '3px',
            fontWeight: 'bold',
            boxShadow: '0 0 15px rgba(168,85,247,0.5), 0 0 30px rgba(236,72,153,0.3)',
          }}
        >
          EXPLORE
        </motion.button>

      </div>

      {/* Blink animation */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

    </div>
  )
}

export default Home
