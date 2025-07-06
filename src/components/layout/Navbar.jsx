import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    InformationCircleIcon,
    PhoneIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navVariants = {
        hidden: { y: -100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20, delay: 0.1 }
        },
    };

    const linkVariants = {
        hover: { scale: 1.08, backgroundColor: 'rgba(255,255,255,0.12)' },
        tap: { scale: 0.97 },
    };

    const mobileMenuVariants = {
        hidden: { x: "100%" },
        visible: {
            x: "0%",
            transition: { type: "tween", duration: 0.3, ease: "easeOut" }
        },
        exit: {
            x: "100%",
            transition: { type: "tween", duration: 0.3, ease: "easeIn" }
        },
    };

    const getNavLinkClasses = ({ isActive }) => {
        const baseClasses = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]/70 focus-visible:ring-offset-2";
        const inactiveClasses = "text-[var(--color-text-primary)] hover:bg-[var(--color-accent-jedi-blue)]/10 hover:text-[var(--color-accent-jedi-blue)]";
        const activeClasses = "bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] shadow-lg border-2 border-white/20 relative after:content-[''] after:block after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-1 after:rounded-full after:bg-white after:animate-navbar-indicator";
        return `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
    };

    return (
        <motion.nav
            className="bg-[var(--color-background)]/80 shadow-xl border-b border-[var(--color-accent-jedi-blue)]/30 sticky top-0 z-50 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <NavLink to="/" className="text-[var(--color-accent-jedi-blue)] text-2xl font-bold hover:text-[var(--color-accent-sith-red)] transition duration-300 flex items-center space-x-3 drop-shadow-lg">
                    <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                <stop stopColor="var(--color-accent-jedi-blue)" />
                                <stop offset="1" stopColor="var(--color-accent-sith-red)" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <path d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z" fill="url(#logo-gradient)" filter="url(#glow)" />
                        <path d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z" stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="leading-none">YEP/DEV</span>
                </NavLink>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[var(--color-text-primary)] p-2 focus:outline-none hover:bg-[var(--color-accent-jedi-blue)]/10 rounded-full transition">
                        {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                    </button>
                </div>

                <ul className="hidden md:flex items-center space-x-6">
                    <li>
                        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                            <NavLink to="/" className={getNavLinkClasses} end><HomeIcon className="h-5 w-5 mr-1" />Home</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                            <NavLink to="/projects" className={getNavLinkClasses}>Proyectos</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                            <NavLink to="/about" className={getNavLinkClasses}><InformationCircleIcon className="h-5 w-5 mr-1" />Acerca de</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
                            <NavLink to="/contact" className={getNavLinkClasses}><PhoneIcon className="h-5 w-5 mr-1" />Contacto</NavLink>
                        </motion.div>
                    </li>
                </ul>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="md:hidden fixed inset-0 bg-[var(--color-background)]/90 z-40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            className="absolute right-0 top-0 h-full w-64 bg-[var(--color-background)] shadow-xl"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-2 mb-6 p-4 border-b border-[var(--color-accent-jedi-blue)]/20">
                                <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="logo-gradient-mobile" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="var(--color-accent-jedi-blue)" />
                                            <stop offset="1" stopColor="var(--color-accent-sith-red)" />
                                        </linearGradient>
                                        <filter id="glow-mobile" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                                            <feMerge>
                                                <feMergeNode in="blur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z" fill="url(#logo-gradient-mobile)" filter="url(#glow-mobile)" />
                                    <path d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z" stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span className="text-xl font-bold text-[var(--color-accent-jedi-blue)]">YEP/DEV</span>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Menú</h2>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)]"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <nav className="space-y-4">
                                    <NavLink to="/" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <HomeIcon className="h-5 w-5 inline mr-2" /> Home
                                    </NavLink>
                                    <NavLink to="/projects" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        Proyectos
                                    </NavLink>
                                    <NavLink to="/about" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <InformationCircleIcon className="h-5 w-5 inline mr-2" /> Acerca de
                                    </NavLink>
                                    <NavLink to="/contact" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <PhoneIcon className="h-5 w-5 inline mr-2" /> Contacto
                                    </NavLink>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
