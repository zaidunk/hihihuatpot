import { useState, useRef, useEffect } from 'react'
import { ReactLenis } from 'lenis/react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  Link,
  MapPin,
  Phone,
  X,
} from 'lucide-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './components/ui/carousel'
import Navbar from './components/Navbar'
import GoogleReviewsSection from './components/GoogleReviewsSection'

const COLLAB_WA = "[COLLAB_WA_NUMBER]" // Ganti dengan nomor WA kolaborasi

const navLinks = [
  { id: 'promo', label: 'Promo' },
  { id: 'reservasi', label: 'Reservasi' },
  { id: 'menu', label: 'Menu' },
  { id: 'antrian', label: 'Antrian' },
  { id: 'lokasi', label: 'Lokasi' },
  { id: 'kolaborasi', label: 'Kolaborasi' },
]

import promo1 from './assets/promo_1.jpg'
import promo2 from './assets/promo_2.jpg'
import pandaCoin from './assets/panda holds coin.png'
import pandaPeace from './assets/panda peace.png'
import bannerImage from './assets/banner.jpg'
import backgroundImage from './assets/background.png'
import footerLogo from './assets/hihi_huat_pot_FA_logo_responsive-09.png'
import post1 from './assets/post_1.jpg'
import post2 from './assets/post_2.jpg'
import post3 from './assets/post_3.jpg'
import post4 from './assets/post_4.jpg'
import post5 from './assets/post_5.jpg'
import post6 from './assets/post_6.jpg'

import menu1 from './assets/menu/Empress Grilled Fish.jpg'
import menu2 from './assets/menu/Exclusive Sinchuan Suancai Fish.jpg'
import menu3 from './assets/menu/Garlic Bomb Grilled Fish.png'
import menu4 from './assets/menu/Green Pepper Grilled Fish.png'
import menu5 from './assets/menu/New Style Sauce Pork Ribs.jpg'
import menu6 from './assets/menu/Nourishing Collagen Herbal Pork Ribs Pot.png'
import menu7 from './assets/menu/Nourishing Collagen Herbal Pork Trotters Pot.jpg'
import menu8 from './assets/menu/Signature Chicken Soup with Abalone And Fish Maw.jpg'
import menu9 from './assets/menu/Spicy New Style Sauce Pork Ribs.jpg'
import menu10 from './assets/menu/Spicy Shrimp and Chicken Pot.jpg'
import menu11 from './assets/menu/Stir Fried Chicken Pot.jpg'
import menu12 from './assets/menu/Tom Yum Goong.jpg'


const promoImages = [
  promo1,
  promo2,
]

const menuItems = [
  { name: 'Empress Grilled Fish', image: menu1 },
  { name: 'Exclusive Sinchuan Suancai Fish', image: menu2 },
  { name: 'Garlic Bomb Grilled Fish', image: menu3 },
  { name: 'Green Pepper Grilled Fish', image: menu4 },
  { name: 'New Style Sauce Pork Ribs', image: menu5 },
  { name: 'Nourishing Collagen Herbal Pork Ribs Pot', image: menu6 },
  { name: 'Nourishing Collagen Herbal Pork Trotters Pot', image: menu7 },
  { name: 'Signature Chicken Soup with Abalone And Fish Maw', image: menu8 },
  { name: 'Spicy New Style Sauce Pork Ribs', image: menu9 },
  { name: 'Spicy Shrimp and Chicken Pot', image: menu10 },
  { name: 'Stir Fried Chicken Pot', image: menu11 },
  { name: 'Tom Yum Goong', image: menu12 },
]

const footerSocial = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/hihihuatpot/',
    icon: Link,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hihihuatpot.id',
    icon: Link,
  },
  {
    label: 'Xiaohongshu',
    href: 'https://xhslink.com/m/3j2a3Hp8I8X',
    icon: Link,
  },
  {
    label: 'Linktree',
    href: 'https://linktr.ee/hihihuatpot',
    icon: Link,
  },
]

const handleExternalOpen = (url) => {
  window.open(url, '_blank')
}

// --- Animation Variants ---
const ease = [0.22, 1, 0.36, 1]

const heroStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease } }
}

const fadeUpSmall = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
}

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } }
}

const sectionStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const masonryStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
}

// --- Button Interaction Variants ---
const buttonTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] }

const btnMotions = {
  primaryRed: {
    hover: { scale: 1.02, y: -2, boxShadow: '0 8px 20px -6px rgba(208, 33, 28, 0.4)' },
    tap: { scale: 0.98, y: 0, boxShadow: 'none' }
  },
  primaryGreen: {
    hover: { scale: 1.02, y: -2, boxShadow: '0 8px 20px -6px rgba(37, 211, 102, 0.4)' },
    tap: { scale: 0.98, y: 0, boxShadow: 'none' }
  },
  heroSecondary: {
    hover: { scale: 1.02, y: -1, backgroundColor: 'rgba(255, 253, 235, 0.1)', borderColor: '#d0211c', color: '#d0211c' },
    tap: { scale: 0.98, y: 0, backgroundColor: 'transparent' }
  },
  secondaryRedOutline: {
    hover: { scale: 1.01, x: 2, backgroundColor: '#d0211c', color: '#fff' },
    tap: { scale: 0.98, x: 0 }
  },
  socialOutline: {
    hover: { scale: 1.02, y: -1, backgroundColor: '#1a1a1a', color: '#fff', borderColor: '#1a1a1a' },
    tap: { scale: 0.98, y: 0 }
  },
  navbar: {
    hover: { color: '#d0211c', scale: 1.02 },
    tap: { scale: 0.96 }
  },
  navbarMobileToggle: {
    hover: { color: '#d0211c' },
    tap: { scale: 0.9 }
  },
  footerLink: {
    hover: { x: 4, color: '#d0211c' },
    tap: { scale: 0.98, x: 0 }
  },
  instagramFollow: {
    hover: { scale: 1.02, y: -2, boxShadow: '0 8px 20px -6px rgba(0, 149, 246, 0.4)' },
    tap: { scale: 0.98, y: 0, boxShadow: 'none' }
  },
  tiktokFollow: {
    hover: { scale: 1.02, y: -2, boxShadow: '0 8px 20px -6px rgba(0, 0, 0, 0.4)' },
    tap: { scale: 0.98, y: 0, boxShadow: 'none' }
  },
  xhsFollow: {
    hover: { scale: 1.02, y: -2, boxShadow: '0 8px 20px -6px rgba(255, 36, 66, 0.4)' },
    tap: { scale: 0.98, y: 0, boxShadow: 'none' }
  }
}

function App() {
  const prefersReducedMotion = useReducedMotion()
  const [showPromoPopup, setShowPromoPopup] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoPopup(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  const motionProps = (variants) => ({
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-10%" },
    variants: prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : variants
  })

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  )

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  const handleScroll = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <ReactLenis root options={{ duration: 1.4, wheelMultiplier: 1.5 }}>
      <div className="text-[var(--color-dark-text)]">
        <AnimatePresence>
          {showPromoPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowPromoPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-[var(--color-cream)] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="promo-popup-title"
              >
                <button
                  onClick={() => setShowPromoPopup(false)}
                  className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-red)]"
                  aria-label="Tutup promo"
                >
                  <X size={20} />
                </button>
                <div className="overflow-y-auto overflow-x-hidden w-full">
                  <img src={promoImages[0]} alt="Promo Spesial" className="w-full h-auto block" />
                  <div className="p-6 text-center">
                  <h2 id="promo-popup-title" className="main-section-heading text-[var(--color-dark-text)] !text-2xl">
                    Selamat Datang!
                  </h2>
                  <p className="mt-2 main-paragraph text-[var(--color-text-secondary)]">
                    Ada kejutan spesial menanti Anda hari ini. Nikmati pengalaman bersantap hot pot terbaik bersama orang terkasih.
                  </p>
                </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Navbar />

        {/* === SECTION: HERO === */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={prefersReducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : heroStagger}
          className="hidden relative min-h-screen overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease }}
            className="absolute inset-0"
          >
            <img
              src={bannerImage}
              alt="Banner Hihi Huat Pot"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="absolute inset-0 hero-overlay pointer-events-none"
          ></motion.div>
          <div className="absolute inset-0 bg-repeat opacity-[0.25] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: '300px' }}></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
            className="absolute bottom-4 -right-4 md:left-4 lg:right-16 w-[100px] md:w-[160px] lg:w-[250px] pointer-events-none select-none z-10"
          >
            <motion.img
              src={pandaCoin}
              alt="Panda Mascot"
              className="w-full h-full"
              animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="hidden relative z-20 mx-auto min-h-screen w-full max-w-4xl flex-col items-center justify-center px-4 py-20 text-center text-[var(--color-cream)]">
            <motion.h1 variants={fadeUp} className="hero-main-heading">
              Pengalaman Hot Pot Terbaik di Jakarta
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 main-paragraph text-[var(--color-cream)]/85 mx-auto">
              Haidilao&apos;s First Loaded Hot Pot Brand
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={btnMotions.primaryRed.hover}
                whileTap={btnMotions.primaryRed.tap}
                transition={buttonTransition}
                type="button"
                onClick={() => handleScroll('reservasi')}
                className="primary-cta-text rounded-full bg-[var(--color-primary-red)] px-6 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cream)]"
              >
                Reservasi Sekarang
              </motion.button>
              <motion.button
                whileHover={btnMotions.heroSecondary.hover}
                whileTap={btnMotions.heroSecondary.tap}
                transition={buttonTransition}
                type="button"
                onClick={() => handleScroll('menu')}
                className="primary-cta-text rounded-full border border-[var(--color-cream)] px-6 py-3 text-[var(--color-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cream)]"
              >
                Lihat Menu
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* === SECTION: PROMO === */}
        <section id="promo" className="bg-[var(--color-cream)] pt-22 pb-16">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <motion.div variants={fadeUpSmall} className="text-center">
              <h2 className="mt-3 main-section-heading text-[var(--color-dark-text)]">
                Promo Bulan Ini
              </h2>
              <p className="mt-3 main-paragraph text-[var(--color-text-secondary)] mx-auto">
                Jangan sampai ketinggalan penawaran spesial kami
              </p>
            </motion.div>
            <motion.div variants={fadeUpSmall}>
              <Carousel
                opts={{
                  align: 'start',
                  loop: true,
                }}
                plugins={[autoplayPlugin.current]}
                className="mt-10 w-full max-w-xl mx-auto relative"
              >
                <CarouselContent>
                  {promoImages.map((imgSrc, index) => (
                    <CarouselItem key={index} className="pl-4">
                      <div className="p-1 sm:p-2 h-full">
                        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-border)] shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-600">
                          <img
                            src={imgSrc}
                            alt={`Promo ${index + 1}`}
                            className="block w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 border-2 border-[var(--color-border)] bg-[var(--color-cream)]/80 backdrop-blur-sm text-[var(--color-dark-text)] transition-all hover:border-[var(--color-primary-red)] hover:bg-[var(--color-primary-red)] hover:text-white z-10 hidden sm:flex" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 border-2 border-[var(--color-border)] bg-[var(--color-cream)]/80 backdrop-blur-sm text-[var(--color-dark-text)] transition-all hover:border-[var(--color-primary-red)] hover:bg-[var(--color-primary-red)] hover:text-white z-10 hidden sm:flex" />
              </Carousel>
            </motion.div>
          </motion.div>
        </section>

        {/* === DIVIDER === */}
        <motion.div {...motionProps(sectionStagger)} className="mx-auto w-full max-w-5xl px-4">
          <motion.div variants={imageReveal} className="h-px w-full bg-[var(--color-border)]/50 origin-left"></motion.div>
        </motion.div>

        {/* === SECTION: RESERVASI === */}
        <section id="reservasi" className="bg-[var(--color-cream)] py-16">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
            <motion.h2 variants={fadeUpSmall} className="mt-3 main-section-heading text-[var(--color-dark-text)]">
              Buat Reservasi
            </motion.h2>
            <motion.p variants={fadeUpSmall} className="mt-3 main-paragraph text-[var(--color-text-secondary)] mx-auto">
              Hubungi admin kami langsung via WhatsApp untuk booking meja
            </motion.p>
            <motion.div variants={fadeUpSmall}>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{ hover: btnMotions.primaryGreen.hover, tap: btnMotions.primaryGreen.tap }}
                transition={buttonTransition}
                type="button"
                onClick={() => handleExternalOpen('https://wa.me/6281318101062')}
                className="mt-8 primary-cta-text inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366]"
              >
                <motion.div variants={{ hover: { rotate: [-5, 5, -5, 0] } }} transition={{ duration: 0.4 }}>
                  <Phone size={18} />
                </motion.div>
                Chat WhatsApp Admin
              </motion.button>
              <p className="mt-4 caption-text text-[var(--color-text-muted)]">
                Tim kami siap membantu Anda setiap hari pukul 10:00–22:00
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* === SECTION: MENU === */}
        <section id="menu" className="bg-[var(--color-dark)] py-16 text-[var(--color-cream)] relative overflow-hidden">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <motion.div variants={fadeUpSmall} className="text-center">
              <h2 className="mt-3 main-section-heading">
                Sekilas Menu Kami
              </h2>
              <p className="mt-3 main-paragraph text-[var(--color-cream)]/80 mx-auto">
                Temukan pilihan kuah, lauk, dan topping terbaik
              </p>
            </motion.div>
            <motion.div variants={sectionStagger} className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {menuItems.map((item) => (
                <motion.div
                  variants={fadeUpSmall}
                  key={item.name}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-[#2a1206] shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex w-full items-center justify-center bg-[#1f0d05] caption-text text-[var(--color-cream)]/60 overflow-hidden">
                    <motion.div
                      variants={imageReveal}
                      className="w-full flex items-center justify-center bg-[#1f0d05] transition-transform duration-700 group-hover:scale-105"
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-auto block object-cover" />
                      ) : (
                        <div className="w-full aspect-square bg-[#3a1d0f]"></div>
                      )}
                    </motion.div>
                  </div>
                  <div className="flex flex-1 flex-col gap-1 px-3 py-2.5">
                    <h3 className="secondary-heading !text-sm md:!text-base">{item.name}</h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div variants={fadeUpSmall} className="mt-10 flex justify-center">
              <motion.button
                whileHover={btnMotions.heroSecondary.hover}
                whileTap={btnMotions.heroSecondary.tap}
                transition={buttonTransition}
                type="button"
                onClick={() => handleExternalOpen('https://drive.google.com/file/d/12hgjBFWfhoqeIxt0CehkHBwhvviehbBg/view?usp=sharing')}
                className="primary-cta-text rounded-full border border-[var(--color-border)] px-6 py-3 text-[var(--color-cream)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cream)]"
              >
                Lihat Menu Lengkap
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* === SECTION: GOOGLE REVIEWS === */}
        <GoogleReviewsSection />

        {/* === SECTION: ANTRIAN === */}
        <section id="antrian" className="bg-[var(--color-cream)] py-16">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
            <motion.h2 variants={fadeUpSmall} className="mt-3 main-section-heading text-[var(--color-dark-text)]">
              Antrian Online
            </motion.h2>
            <motion.p variants={fadeUpSmall} className="mt-3 main-paragraph text-[var(--color-text-secondary)] mx-auto">
              Tidak perlu antre lama — daftar antrian online sebelum datang
            </motion.p>
            <motion.div variants={fadeUpSmall}>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{ hover: btnMotions.primaryRed.hover, tap: btnMotions.primaryRed.tap }}
                transition={buttonTransition}
                type="button"
                onClick={() => handleExternalOpen('https://q05-id.qbe.ee/huatpot')}
                className="mt-8 primary-cta-text inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary-red)] px-8 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
              >
                <motion.div variants={{ hover: { scale: 1.1, rotate: 5 } }} transition={{ duration: 0.3 }}>
                  <Calendar size={18} />
                </motion.div>
                Daftar Antrian Sekarang
              </motion.button>
              <p className="mt-4 caption-text text-[var(--color-text-muted)]">
                *Link antrian online akan diarahkan ke sistem antrian resmi kami
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* === SECTION: INSTAGRAM COMMUNITY FEED === */}
        <section id="instagram" className="bg-[#fcfaf7] py-12 md:py-16 relative overflow-hidden">
          <motion.img
            src={pandaPeace}
            alt="Panda Mascot"
            className="absolute bottom-4 -right-4 md:right-4 lg:right-16 w-[90px] md:w-[140px] lg:w-[250px] pointer-events-none select-none z-10"
            animate={{ y: [0, -6, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div {...motionProps(sectionStagger)} className="relative z-20 mx-auto w-full max-w-4xl px-4">
            <motion.div variants={fadeUpSmall} className="text-center mb-10">
              <h2 className="main-section-heading text-[var(--color-dark-text)]">
                Jangan Lewatkan Update Terbaru
              </h2>
              <p className="mt-5 main-paragraph text-[var(--color-text-secondary)] mx-auto">
                Temukan promo spesial, menu favorit pelanggan, dan berbagai informasi terbaru dari HIHI HUAT POT.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={{ hover: btnMotions.instagramFollow.hover, tap: btnMotions.instagramFollow.tap }}
                  transition={buttonTransition}
                  type="button"
                  onClick={() => handleExternalOpen('https://www.instagram.com/hihihuatpot/')}
                  className="primary-cta-text inline-flex items-center gap-2 rounded-xl bg-[#0095f6] px-6 py-2.5 text-white transition-colors hover:bg-[#1877F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0095f6]"
                >
                  <motion.div variants={{ hover: { x: 2, opacity: 0.9 } }} transition={{ duration: 0.3 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </motion.div>
                  Instagram
                </motion.button>

                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={{ hover: btnMotions.tiktokFollow.hover, tap: btnMotions.tiktokFollow.tap }}
                  transition={buttonTransition}
                  type="button"
                  onClick={() => handleExternalOpen('https://www.tiktok.com/@hihihuatpot.id')}
                  className="primary-cta-text inline-flex items-center gap-2 rounded-xl bg-[#000000] px-6 py-2.5 text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#000000]"
                >
                  <motion.div variants={{ hover: { x: 2, opacity: 0.9 } }} transition={{ duration: 0.3 }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.97-1.58 4.79 4.79 0 0 1-1.04-3.11h-3.34v13.56a3.89 3.89 0 1 1-3.92-3.89c.54 0 1.05.11 1.52.31v-3.48c-.49-.09-1-.13-1.52-.13a7.2 7.2 0 1 0 7.29 7.2V8.71a8.1 8.1 0 0 0 5.01 1.72V7.08a4.8 4.8 0 0 1-.03-.39z" />
                    </svg>
                  </motion.div>
                  TikTok
                </motion.button>

                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={{ hover: btnMotions.xhsFollow.hover, tap: btnMotions.xhsFollow.tap }}
                  transition={buttonTransition}
                  type="button"
                  onClick={() => handleExternalOpen('https://xhslink.com/m/3j2a3Hp8I8X')}
                  className="primary-cta-text inline-flex items-center gap-2 rounded-xl bg-[#ff2442] px-6 py-2.5 text-white transition-colors hover:bg-[#e61e38] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff2442]"
                >
                  <motion.div variants={{ hover: { x: 2, opacity: 0.9 } }} transition={{ duration: 0.3 }}>
                    <Link size={18} />
                  </motion.div>
                  Xiaohongshu
                </motion.button>
              </div>
            </motion.div>

            <motion.div variants={sectionStagger} className="columns-3 gap-1 sm:gap-2 max-w-3xl mx-auto">
              {[
                { id: '1', shortcode: 'DYv5csmkssT', image: post1 },
                { id: '2', shortcode: 'DYv6HkTyQuF', image: post2 },
                { id: '3', shortcode: 'DYeh73qybVX', image: post3 },
                { id: '4', shortcode: 'DY1DRLOzp9R', image: post4 },
                { id: '5', shortcode: 'DYoJ-O5SRu0', image: post5 },
                { id: '6', shortcode: 'DYmenOfyJuy', image: post6 },
              ].map((post, i) => (
                <motion.a
                  variants={fadeUpSmall}
                  key={post.id}
                  href={`https://www.instagram.com/p/${post.shortcode}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View Instagram post ${i + 1}`}
                  className="group block w-full break-inside-avoid mb-1 sm:mb-2 overflow-hidden rounded-sm sm:rounded-md bg-slate-200 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
                >
                  <img
                    src={post.image}
                    alt={`Instagram moment ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* === SECTION: LOKASI === */}
        <section id="lokasi" className="bg-white py-16">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <motion.div variants={sectionStagger} className="space-y-6">
                <motion.h2 variants={fadeUpSmall} className="main-section-heading text-[var(--color-dark-text)]">
                  Temukan Kami
                </motion.h2>
                <motion.div variants={sectionStagger} className="space-y-3 main-paragraph text-[var(--color-text-secondary)]">
                  <motion.div variants={fadeUpSmall} className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5" />
                    <span>Mall Kelapa Gading 5, Lantai 3, Jakarta</span>
                  </motion.div>
                  <motion.div variants={fadeUpSmall} className="flex items-start gap-3">
                    <Clock size={18} className="mt-0.5" />
                    <span>Buka setiap hari: 10:00 – 22:00</span>
                  </motion.div>
                  <motion.div variants={fadeUpSmall} className="flex items-start gap-3">
                    <Phone size={18} className="mt-0.5" />
                    <span>+62 813-1810-1062</span>
                  </motion.div>
                </motion.div>
                <motion.div variants={fadeUpSmall}>
                  <motion.button
                    whileHover="hover"
                    whileTap="tap"
                    variants={{ hover: btnMotions.secondaryRedOutline.hover, tap: btnMotions.secondaryRedOutline.tap }}
                    transition={buttonTransition}
                    type="button"
                    onClick={() =>
                      handleExternalOpen(
                        'https://maps.app.goo.gl/V5duDRzZKQtfFnYs8',
                      )
                    }
                    className="primary-cta-text inline-flex items-center gap-2 rounded-full border border-[var(--color-primary-red)] px-6 py-3 text-[var(--color-primary-red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
                  >
                    <motion.div variants={{ hover: { y: -2, scale: 1.1 } }} transition={{ duration: 0.3 }}>
                      <MapPin size={18} />
                    </motion.div>
                    Buka di Google Maps
                  </motion.button>
                </motion.div>
              </motion.div>
              <motion.div variants={imageReveal} className="flex h-[300px] w-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-slate-200">
                <iframe
                  title="Peta Lokasi Hihi Huat Pot"
                  src="https://maps.google.com/maps?q=Hihi%20Huat%20Pot,%20Kelapa%20Gading&t=&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* === SECTION: KOLABORASI === */}
        <section id="kolaborasi" className="bg-[#f7efe2] py-16">
          <motion.div {...motionProps(sectionStagger)} className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center">
            <motion.h2 variants={fadeUpSmall} className="mt-3 main-section-heading text-[var(--color-dark-text)]">
              Kolaborasi Bersama Kami
            </motion.h2>
            <motion.p variants={fadeUpSmall} className="mt-3 main-paragraph text-[var(--color-text-secondary)] mx-auto">
              Tertarik untuk berkolaborasi? Kami terbuka untuk brand, kreator konten, dan event organizer
            </motion.p>
            <motion.div variants={fadeUpSmall}>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{ hover: btnMotions.primaryRed.hover, tap: btnMotions.primaryRed.tap }}
                transition={buttonTransition}
                type="button"
                onClick={() => handleExternalOpen(`https://wa.me/${628998558888}`)}
                className="mt-8 primary-cta-text inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary-red)] px-8 py-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
              >
                <motion.div variants={{ hover: { rotate: [-5, 5, -5, 0] } }} transition={{ duration: 0.4 }}>
                  <Phone size={18} />
                </motion.div>
                Hubungi Tim Kolaborasi
              </motion.button>
            </motion.div>
          </motion.div>
        </section>

        {/* === SECTION: FOOTER === */}
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-dark)] py-12 text-[var(--color-cream)] relative overflow-hidden">
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4">
            <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr]">
              <div className="flex flex-col items-start gap-3">
                <div className="w-[180px] sm:w-[220px] max-w-[70%]">
                  <img
                    src={footerLogo}
                    alt="Logo Hihi Huat Pot"
                    className="block h-auto w-full object-contain"
                  />
                </div>
                <p className="footer-text text-[var(--color-cream)]/80">
                  Haidilao&apos;s First Loaded Hot Pot Brand
                </p>
              </div>
              <div>
                <p className="caption-text uppercase tracking-[0.2em] text-[var(--color-cream)]/70">
                  Tautan Cepat
                </p>
                <div className="mt-4 flex flex-col gap-2 footer-text">
                  {navLinks.map((link) => (
                    <motion.button
                      whileHover={btnMotions.footerLink.hover}
                      whileTap={btnMotions.footerLink.tap}
                      transition={buttonTransition}
                      key={link.id}
                      type="button"
                      onClick={() => handleScroll(link.id)}
                      className="text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div>
                <p className="caption-text uppercase tracking-[0.2em] text-[var(--color-cream)]/70">
                  Sosial
                </p>
                <div className="mt-4 flex flex-col gap-3 footer-text">
                  {footerSocial.map((social) => {
                    const Icon = social.icon
                    return (
                      <motion.button
                        whileHover="hover"
                        whileTap="tap"
                        variants={{ hover: btnMotions.footerLink.hover, tap: btnMotions.footerLink.tap }}
                        transition={buttonTransition}
                        key={social.label}
                        type="button"
                        onClick={() => handleExternalOpen(social.href)}
                        className="inline-flex items-center gap-2 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
                      >
                        <motion.div variants={{ hover: { scale: 1.1, rotate: 5 } }} transition={{ duration: 0.3 }}>
                          <Icon size={18} />
                        </motion.div>
                        {social.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-6 caption-text text-[var(--color-cream)]/70">
              <span>© 2025 Hihi Huat Pot. All rights reserved.</span>
              <span>Mall Kelapa Gading 5, Lantai 3, Jakarta</span>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  )
}

export default App
