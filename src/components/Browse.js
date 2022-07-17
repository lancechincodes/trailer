import '../styles/Browse.css'
import logoImage from '../assets/logo-image.svg'
import hamburger from '../assets/hamburger.svg'

function Browse() {

    return(
        <div className="browse"> 
            <div className="logo-browse">
                <img className="logo-image-browse" src={logoImage} alt="Trailer Logo"/>
                <h1 className="logo-title-browse">TRAILER</h1>
            </div>
            <div className="hamburger">
                <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
            </div>
            <form type="submit">
                <input type="text"></input>
            </form>

        
        </div>
    )
}

export default Browse