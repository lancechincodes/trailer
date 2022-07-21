import '../styles/Home.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import logoImage from '../assets/logo-image.svg'

// Animation for logo
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
    }, 3250)

    return (
        <div className="home">
            <AnimatePresence>
                {showBrand && (
                    <motion.div 
                        className="logo"
                        variants={brandVariants}
                        initial="hidden"
                        animate="visible"
                        exit="leave"
                    >
                        <img className="logo-image" src={logoImage} alt="Trailer Logo"/>
                        <h1 className="logo-title">TRAILER</h1>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Home