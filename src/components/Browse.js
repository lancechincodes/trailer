import '../styles/Browse.css'
import logoImage from '../assets/logo-image.svg'
import hamburger from '../assets/hamburger.svg'
import search from '../assets/search.svg'
import closeSearch from '../assets/close-search.svg'

function Browse() {

    return(
        <div className="browse"> 
            <heading className="heading-browse">
                <div className="logo-browse">
                    <img className="logo-image-browse" src={logoImage} alt="Trailer Logo"/>
                    <h1 className="logo-title-browse">TRAILER</h1>
                </div>
                <div className="hamburger">
                    <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
                </div>
            </heading>


            <div className="input-box">
                <div className="search-icon-div">
                    <img className="search-icon" src={search} alt="Search Icon"/>
                </div>
                <form type="submit">
                    <input 
                        className="input-text"
                        type="text"
                        placeholder="Search movie, show, or genre"
                    />
                </form>
                <div className="close-search-icon-div"> 
                    <img className="close-search-icon" src={closeSearch} alt="Delete Icon"/>
                </div>
            </div>
        </div>
    )
}

export default Browse