import '../styles/Home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import trailerLogo from '../assets/trailer-logo.svg'

const homeVariants = {
    hidden: {
        opacity: 1
    },
    leave: {
        transition: {
            duration: .7,
        },
        opacity: 0,
    }
}

const brandVariants = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: {
            delay: .5,
            duration: 1,
            type: "spring",
            stiffness: 70
        }
    },
    leave: {
        x: '100vw',
        transition: {
            duration: .5,
        }
    }
}

function Home() {
    const [showBrand, setShowBrand] = useState(true)
    const navigate = useNavigate()

    setTimeout(()=> {
        setShowBrand(false)
    }, 2000)

    setTimeout(()=> {
        navigate("/browse")
    }, 2500)

    return (
        <motion.div className="home"
            variants={homeVariants}
            initial="hidden"
            exit="leave"
        >
            <AnimatePresence>
                {showBrand && (
                    <motion.div 
                        className="full-brand"
                        variants={brandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="leave"
                    >
                        <img className="trailer-logo" src={trailerLogo} alt="Trailer Logo"/>
                        <h1 className="title">TRAILER</h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Home