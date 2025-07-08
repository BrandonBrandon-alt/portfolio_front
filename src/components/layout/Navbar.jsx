import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { FaSpaceShuttle, FaMicrochip, FaUserAstronaut, FaSatelliteDish } from 'react-icons/fa'; // Importar nuevos iconos
import Button from '../ui/Button';

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


    const navListContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3, // Retraso antes de que los hijos comiencen a animarse
                staggerChildren: 0.1, // Escalonar cada hijo por 0.1s
            },
        },
    };

    const navListItemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
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
        // Base styles from the Button component
        const baseButtonStyles = "inline-flex items-center justify-center font-sans font-bold py-2 px-6 rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-jedi-blue)]/70 focus-visible:ring-offset-2 text-base";

        // Inactive state styles (from Button's default look)
        const inactiveButtonStyles = "border-2 border-[var(--color-accent-jedi-blue)] text-[var(--color-accent-jedi-blue)] hover:bg-[var(--color-accent-jedi-green)] hover:text-[var(--color-background)] shadow-[0_0_15px_var(--color-accent-jedi-blue)] hover:shadow-[0_0_30px_var(--color-accent-jedi-green)]";

        // Active state styles (from original NavLink, adjusted for new base)
        const activeNavLinkStyles = "bg-[var(--color-accent-jedi-blue)] text-[var(--color-background)] shadow-lg border-2 border-white/20 relative after:content-[''] after:block after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-6 after:h-1 after:rounded-full after:bg-white after:animate-navbar-indicator";

        // Combine base with active/inactive
        return `${baseButtonStyles} ${isActive ? activeNavLinkStyles : inactiveButtonStyles}`;
    };

    return (
        <motion.nav
            className="hologram-effect text-[var(--color-text-primary)] border-b border-[var(--color-accent-jedi-blue)]/40 py-3 backdrop-blur-sm shadow-inner shadow-[var(--color-accent-jedi-blue)]/10 sticky top-0 z-50"
            initial="hidden"
            animate="visible"
            variants={navVariants}
        >
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                <NavLink to="/" className="text-[var(--color-accent-jedi-blue)] text-2xl font-bold transition duration-300 flex items-center space-x-3 drop-shadow-lg">
                    <motion.div
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3"
                    >
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="logo-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="var(--color-accent-jedi-blue)" />
                                    <stop offset="1" stopColor="var(--color-accent-jedi-green)" />
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
                            <motion.path
                                d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z"
                                stroke="url(#logo-gradient)"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                filter="url(#glow)"
                                initial={{ strokeDasharray: "50 200", strokeDashoffset: 250 }}
                                animate={{ strokeDashoffset: -250 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    ease: "linear",
                                }}
                            />
                        </svg>
                        <span className="leading-none font-display text-[var(--color-accent-jedi-blue)] drop-shadow-[0_0_8px_var(--color-accent-jedi-blue)]"> BRAN|DEV</span>
                    </motion.div>
                </NavLink>

                <div className="md:hidden">
                    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className="!p-2 !rounded-full !shadow-none !border-none text-[var(--color-text-primary)] hover:bg-[var(--color-accent-jedi-blue)]/10">
                        {isMenuOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                    </Button>
                </div>

                <ul className="hidden md:flex items-center space-x-6"
                    variants={navListContainerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <li>
                        <motion.div variants={navListItemVariants}>
                            <NavLink to="/" className={getNavLinkClasses} end><FaSpaceShuttle className="h-5 w-5 mr-1" />Home</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={navListItemVariants}>
                            <NavLink to="/projects" className={getNavLinkClasses}><FaMicrochip className="h-5 w-5 mr-1" />Proyectos</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={navListItemVariants}>
                            <NavLink to="/about" className={getNavLinkClasses}><FaUserAstronaut className="h-5 w-5 mr-1" />Acerca de</NavLink>
                        </motion.div>
                    </li>
                    <li>
                        <motion.div variants={navListItemVariants}>
                            <NavLink to="/contact" className={getNavLinkClasses} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><FaSatelliteDish className="h-5 w-5 mr-1" />Contacto</NavLink>
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
                            className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-[var(--color-background)] shadow-xl"
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
                                            <stop offset="1" stopColor="var(--color-accent-jedi-green)" />
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
                                    <motion.path
                                        d="M20 80 L50 20 L80 80 H65 L50 45 L35 80 H20Z"
                                        stroke="url(#logo-gradient-mobile)"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        filter="url(#glow-mobile)"
                                        initial={{ strokeDasharray: "50 200", strokeDashoffset: 250 }}
                                        animate={{ strokeDashoffset: -250 }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            repeatType: "loop",
                                            ease: "linear",
                                        }}
                                    />
                                </svg>
                                <span className="text-xl font-bold text-[var(--color-accent-jedi-blue)]">BRAN/DEV</span>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Menú</h2>
                                    <Button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="!p-2 !rounded-full !shadow-none !border-none text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)]"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </Button>
                                </div>

                                <nav className="space-y-4 bg-red-500">
                                    <NavLink to="/" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <FaSpaceShuttle className="h-5 w-5 inline mr-2" /> Home
                                    </NavLink>
                                    <NavLink to="/projects" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <FaMicrochip className="h-5 w-5 inline mr-2" /> Proyectos
                                    </NavLink>
                                    <NavLink to="/about" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-blue)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <FaUserAstronaut className="h-5 w-5 inline mr-2" /> Acerca de
                                    </NavLink>
                                    <NavLink to="/contact" className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent-jedi-green)] transition duration-150" onClick={() => setIsMenuOpen(false)}>
                                        <FaSatelliteDish className="h-5 w-5 inline mr-2" /> Contacto
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
