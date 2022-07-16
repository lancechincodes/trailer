import '../styles/Home.css'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import trailerLogo from '../assets/trailer-logo.svg'


const homeVariants = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: {
            duration: 1,
            type: "spring",
            stiffness: 70
        }
    }
}

function Home() {
    const navigate = useNavigate()
    setTimeout(()=> {
        navigate("/browse")
    }, 3000)

    return (
        <AnimatePresence>
            <div className="home">
                <motion.div 
                    className="full-brand"
                    variants={homeVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <img className="trailer-logo" src={trailerLogo} alt="Trailer Logo"/>
                    <h1 className="title">TRAILER</h1>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default Home