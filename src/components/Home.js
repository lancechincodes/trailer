import '../styles/Home.css'
import trailerLogo from '../assets/trailer-logo.svg'

function Home() {
    return (
        <div className="home">
            <div className="full-brand">
                <img className="trailer-logo" src={trailerLogo} alt="Trailer Logo"/>
                <h1 className="title">TRAILER</h1>
            </div>
        </div>
    )
}

export default Home