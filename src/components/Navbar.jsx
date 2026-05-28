import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const navLinks = [
  { id: 'promo', label: 'Promo' },
  { id: 'reservasi', label: 'Reservasi' },
  { id: 'menu', label: 'Menu' },
  { id: 'antrian', label: 'Antrian' },
  { id: 'lokasi', label: 'Lokasi' },
  { id: 'kolaborasi', label: 'Kolaborasi' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -60% 0px' }
    )

    setTimeout(() => {
      navLinks.forEach((link) => {
        const el = document.getElementById(link.id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  const handleExternalOpen = (url) => {
    window.open(url, '_blank')
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out',
          isScrolled
            ? 'bg-[var(--color-cream)]/95 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] backdrop-blur-md border-b border-[var(--color-border)]/50'
            : 'bg-[var(--color-cream)] border-b border-transparent'
        )}
      >
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)] rounded-xl"
            >
              <img
                src="/src/assets/hihi_huat_pot_FA_logo_responsive-08.png"
                alt="Logo HiHi Huat Pot"
                className="h-12 w-auto object-contain transition-transform duration-300 ease-out group-hover:scale-[1.02] group-active:scale-100 sm:h-14"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={cn(
                  "group relative navbar-link-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)] rounded-sm",
                  activeSection === link.id
                    ? "text-[var(--color-primary-red)]"
                    : "text-[var(--color-dark-text)]/80 hover:text-[var(--color-dark-text)]"
                )}
              >
                <span className="relative z-10">{link.label}</span>
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-[1.5px] bg-[var(--color-primary-red)]/70 transition-all duration-300 ease-out group-hover:w-full",
                  activeSection === link.id ? "w-full" : "w-0"
                )}></span>
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden items-center gap-4 lg:flex">
            <motion.button
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleExternalOpen('https://www.instagram.com/hihihuatpot/')}
              className="caption-text rounded-full bg-[#0095f6] px-4 py-2.5 text-white transition-colors hover:bg-[#1877F2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0095f6]"
            >
              Follow Us
            </motion.button>
            <motion.button
              whileHover={{ y: -1, scale: 1.01, boxShadow: '0 4px 12px -2px rgba(208,33,28,0.15)' }}
              whileTap={{ scale: 0.99, y: 0, boxShadow: 'none' }}
              transition={{ duration: 0.2 }}
              onClick={() => handleExternalOpen('https://wa.me/6281318101062')}
              className="primary-cta-text rounded-full bg-[var(--color-primary-red)] px-5 py-2.5 text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
            >
              Reservasi Sekarang
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-dark-text)] hover:text-[var(--color-primary-red)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)] transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dialog */}
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <DialogBackdrop
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm"
              />
              <DialogPanel
                as={motion.div}
                initial={{ x: '100%', opacity: 0.5 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0.5 }}
                transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[var(--color-cream)] px-6 py-6 shadow-2xl sm:max-w-sm border-l border-[var(--color-border)]/50"
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-m-2.5 rounded-md p-2.5 text-[var(--color-dark-text)] hover:text-[var(--color-primary-red)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]"
                  >
                    <span className="sr-only">Close menu</span>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-8 flow-root">
                  <div className="-my-6 divide-y divide-[var(--color-border)]/40">
                    <div className="space-y-2 py-6">
                      {navLinks.map((link) => (
                        <button
                          key={link.id}
                          onClick={() => scrollToSection(link.id)}
                          className={cn(
                            "-mx-3 block w-full rounded-lg px-3 py-3 text-left navbar-link-text transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)]",
                            activeSection === link.id
                              ? "bg-[#f7efe2] text-[var(--color-primary-red)]"
                              : "text-[var(--color-dark-text)] hover:bg-[#f7efe2]/50 hover:text-[var(--color-primary-red)]"
                          )}
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                    <div className="py-6 space-y-4">
                      <button
                        onClick={() => handleExternalOpen('https://www.instagram.com/hihihuatpot/')}
                        className="-mx-3 block w-full rounded-xl px-3 py-3 text-center primary-cta-text text-white bg-[#0095f6] hover:bg-[#1877F2] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0095f6]"
                      >
                        Follow Instagram
                      </button>
                      <button
                        onClick={() => handleExternalOpen('https://wa.me/6281318101062')}
                        className="-mx-3 block w-full rounded-xl px-3 py-3 text-center primary-cta-text text-white bg-[var(--color-primary-red)] transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary-red)] shadow-sm"
                      >
                        Reservasi Sekarang
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </>
          )}
        </AnimatePresence>
      </Dialog>
    </>
  )
}
