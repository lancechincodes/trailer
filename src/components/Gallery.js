import '../styles/Gallery.css'
import { useParams, Link } from 'react-router-dom'
import { useEffect, useContext, useState } from 'react'
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
    console.log(genreArr)

    useEffect(() => {
        let url = '';
        if (genreId === 'trending today') {
            url = `${searchOptions.api}trending/movie/day?api_key=${searchOptions.key}`
        }
        else if (genreId === 'trending-this-week') {
            url = `${searchOptions.api}trending/movie/week?api_key=${searchOptions.key}`
        }
        else if (genreId === 'in-theatres') {
            url = `${searchOptions.api}movie/now_playing?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        }
        else if (genreId === 'top-rated') {
            url = `${searchOptions.api}movie/top_rated?api_key=${searchOptions.key}&${searchOptions.language}&page=1`
        }
        else {
            url = `${searchOptions.api}discover/movie?api_key=${searchOptions.key}&${searchOptions.language}sort_by=popularity.desc&page=1&with_genres=${genreId}`
        }
        
        // if (genreArr.length === 0) {
            getGenreData(searchOptions.api, searchOptions.key, searchOptions.language, setGenreArr, setLoadingGenre)
        // }
        getGalleryData(url, setGalleryMovies)
    }, [])

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
                    <p className="back-text">{genreId}</p>
                </div>
                <div className="hamburger">
                    <Link to="/navigate">
                        <img className="hamburger-image" src={hamburger} alt="Navigation Button"/>
                    </Link>
                </div>
            </div>
            <div className="outer-carousel">
                <div className="inner-carousel">
                    {galleryMovies.map(movie => (
                        <div className="poster-box" key={movie.id}>
                            <img className="poster-img" src={imagePath + movie.poster_path} alt="{movie.title}"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="more-movies">


            </div>
        </div>
    )
}

export default Gallery