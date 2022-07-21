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
    const [search, setSearch] = useState('')
    const [width, setWidth] = useState(0)
    const carousel = useRef()
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
        else if (genreId.substring(0,6) === 'search') {
            url = `${searchOptions.api}search/movie?api_key=${searchOptions.key}&${searchOptions.language}&page=1&query=${genreId.substring(6)}`
            setSearch(genreId.substring(6))
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
                setSearch(genreArr[i].name)
            }
        }
    }, [genreArr])

    setTimeout(() => {
        // width of carousel must be total width - width of what it shown (offset)
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, 300)

    function handleClick(movieId) {
        navigate(`/browse/${genreId}/${movieId}`)
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
                        <motion.img className="back-icon" src={back} alt="Back Button" whileHover={{scale: .9}}/>
                    </Link>
                    <p className="back-text">{search ? search : genreId}</p>
                </div>
                <div className="hamburger">
                    <Link to="/navigate">
                        <motion.img className="hamburger-image" src={hamburger} alt="Navigation Button" whileHover={{scale: .9}}/>
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
                            <div className="poster-title" key={movie.id}>
                                <div className="poster-title-div">
                                    <motion.div className="poster-box">
                                        <motion.img whileHover={{scale: .95}} onClick={() => handleClick(movie.id)} className="poster-img" src={imagePath + movie.poster_path} alt={movie.title}/>
                                    </motion.div>
                                    {/* <div className="title-box">
                                        <Link to={`/browse/${genreId}/${movie.id}`}>
                                        <p className="movie-title">
                                            {movie.title}
                                        </p>
                                        </Link>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Gallery