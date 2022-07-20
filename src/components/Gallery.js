import '../styles/Gallery.css'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState, useRef } from 'react'
import { DataContext }from '../DataContext'
import { getGalleryData } from '../utils'
import { motion } from 'framer-motion'
import hamburger from '../assets/hamburger.svg'
import back from '../assets/back.svg'
import { getGenreData } from '../utils'

function Gallery({genreArr, setGenreArr}) {
    const { genreId } = useParams()
    const { searchOptions, imagePath } = useContext(DataContext)
    const [galleryMovies, setGalleryMovies] = useState([])
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [searchOption, setSearchOption] = useState('')
    const [width, setWidth] = useState(0)
    const carousel = useRef();
    const navigate = useNavigate()

    useEffect(() => {
        let url = '';
        if (genreId === 'trending today') {
            url = `${searchOptions.api}trending/movie/day?api_key=${searchOptions.key}`
        }
        else if (genreId === 'trending this week') {
            url = `${searchOptions.api}trending/movie/week?api_key=${searchOptions.key}`
        }
        else if (genreId === 'in theatres') {
            url = `${searchOptions.api}movie/now_playing?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        }
        else if (genreId === 'top rated') {
            url = `${searchOptions.api}movie/top_rated?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        }
        else {
            url = `${searchOptions.api}discover/movie?api_key=${searchOptions.key}&${searchOptions.language}sort_by=popularity.desc&page=1&with_genres=${genreId}`
        }
        getGenreData(searchOptions.api, searchOptions.key, searchOptions.language, setGenreArr, setLoadingGenre)
        getGalleryData(url, setGalleryMovies)
    },[])

    // Include dependency array of genreArr so that it updates when page is refreshed
    useEffect(() => {
        for (let i = 0; i < genreArr.length; i++) {
            if (genreArr[i].id === parseInt(genreId)) {
                setSearchOption(genreArr[i].name)
            }
        }
    }, [genreArr])

    setTimeout(() => {
        // width of carousel must be total width - width of what it shown (offset)
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth * .95);
    }, 300)


    function handleClick(movieName) {
        navigate(`/browse/${genreId}/${movieName}`)
    }

    if (loadingGenre) {
        return (
            <div className="loading-page">
                <span className="loader"></span>
            </div>
        )
    }

    return (
        <div className="gallery-page">
            <div className="gallery-header">
                <div className="back">
                    <Link to="/browse">
                        <img className="back-icon" src={back} alt="Back Button"/>
                    </Link>
                    <p className="back-text">{searchOption ? searchOption : genreId}</p>
                </div>
                <div className="hamburger">
                    <Link to="/navigate">
                        <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
                    </Link>
                </div>
            </div>
            <div className="carousel-container">
                <motion.div ref={carousel} className="outer-carousel" >
                    <motion.div 
                        drag="x" 
                        dragConstraints={{ right: 0, left: -width }}
                        className="inner-carousel"
                    >
                        {galleryMovies.map(movie => (
                            <div className="poster-title">
                                <motion.div className="poster-box" key={movie.id}>
                                    <motion.img whileHover={{scale: .95}} onClick={() => handleClick(movie.title)} className="poster-img" src={imagePath + movie.poster_path} alt={movie.title}/>
                                </motion.div>
                                    <div className="title-box">
                                        <Link to={`/browse/${genreId}/${movie.title}`}>
                                         <p className="movie-title">
                                            {movie.title}
                                        </p>
                                        </Link>
                                    </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
            <div className="more-movies">


            </div>
        </div>
    )
}

export default Gallery