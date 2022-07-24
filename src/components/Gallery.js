import '../styles/Gallery.css'
import hamburger from '../assets/hamburger.svg'
import back from '../assets/back.svg'
import 'react-circular-progressbar/dist/styles.css';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useContext, useState, useRef } from 'react'
import { DataContext }from '../DataContext'
import { getGalleryData } from '../utils'
import { motion } from 'framer-motion'
import { getGenreData } from '../utils'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

function Gallery({genreArr, setGenreArr}) {
    const { genreId } = useParams()
    const { searchOptions, imagePath } = useContext(DataContext)
    const [galleryMovies, setGalleryMovies] = useState([])
    const [loadingGenre, setLoadingGenre] = useState(true)
    const [loadingGallery, setLoadingGallery] = useState(true)
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
        getGalleryData(url, setGalleryMovies, setLoadingGallery)
    },[])

    // include dependency array of genreArr so that it updates when page is refreshed
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

    if (loadingGenre || loadingGallery) {
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
                    {search ? (
                         search.length > 20 ? (
                            <p className="back-text">{search.substring(0,20)}...</p>
                         ) : (
                            <p className="back-text">{search}</p>
                         )
                    ) : (
                        <p className="back-text">{genreId}</p>
                    )}
                </div>
                <div className="hamburger">
                    <Link to="/navigate">
                        <motion.img className="hamburger-image" src={hamburger} alt="Navigation Button" whileHover={{scale: .9, rotate: 180}}/>
                    </Link>
                </div>
            </div>
            {galleryMovies.length === 0 ? (
                <div className="not-found">
                    {search.length > 20 ? (
                        <p className="not-found-text">No matches found for "{search.substring(0,20)}...".</p>
                    ) : (
                        <p className="not-found-text">No matches found for "{search}".</p>
                    )  }
                </div>
            ) 
            : (
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
                                        <div className="rating-wheel-div">
                                            <div className="rating-wheel">
                                                <CircularProgressbar 
                                                    value={Math.round(movie.vote_average * 10)} 
                                                    text={`${Math.round(movie.vote_average * 10)}%`} 
                                                    background
                                                    backgroundPadding={6}
                                                    styles={buildStyles({
                                                        backgroundColor: "#362C5D",
                                                        textColor: "#FFFFFF",
                                                        pathColor: "#0FF2F2",
                                                        textSize: '26px'
                                                    })}    
                                                />
                                            </div>
                                        </div>
                                        <motion.div className="poster-box">
                                            <motion.img whileHover={{scale: .95}} onClick={() => handleClick(movie.id)} className="poster-img" src={imagePath + movie.poster_path} alt={movie.title}/>
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default Gallery