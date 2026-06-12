import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const fadeUpSmall = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
}

const sectionStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

export default function GoogleReviewsSection() {
  const prefersReducedMotion = useReducedMotion()

  const motionProps = (variants) => ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10%" },
    variants: prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants
  })

  useEffect(() => {
    const scriptId = 'elfsight-platform-script'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://elfsightcdn.com/platform.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <section id="reviews" className="bg-white py-16">

      <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        <motion.div variants={fadeUpSmall}>
          <h2 className="mt-3 main-section-heading text-[var(--color-dark-text)]">
            Kata Mereka Tentang Hihi Huat Pot
          </h2>
          <p className="mt-3 main-paragraph text-[var(--color-text-secondary)] mx-auto max-w-2xl">
            Pengalaman langsung dari pelanggan yang telah menikmati cita rasa dan kehangatan Hihi Huat Pot.
          </p>
        </motion.div>
        
        <motion.div variants={fadeUpSmall} className="mt-10 min-h-[300px] relative overflow-hidden pb-16">
          {/* Elfsight Google Reviews | Untitled Google Reviews */}
          <div className="elfsight-app-31c52c28-8626-4cf2-9a74-3de4cb08e792" data-elfsight-app-lazy></div>
          
          {/* Overlay solid color untuk menutupi badge Elfsight */}
          <div className="absolute bottom-0 left-0 w-full h-[75px] bg-white z-50 pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </section>
  )
}
