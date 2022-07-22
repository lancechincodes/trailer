import '../styles/GenreCard.css'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataContext } from '../DataContext'
import { getPosterForGenreData } from '../utils'
import { motion } from 'framer-motion'

function GenreCard({id, name}) {
    const { searchOptions, imagePath } = useContext(DataContext)
    const [genrePoster, setGenrePoster] = useState('')    
    const [loadingGenrePoster, setLoadingGenrePoster] = useState(true)

    useEffect(() => {
        getPosterForGenreData(searchOptions.api, searchOptions.key, searchOptions.language, id, setGenrePoster, setLoadingGenrePoster)
    }, [])

    if (loadingGenrePoster) {
        return (
            <div className="loading-page">
                <span className="loader"></span>
            </div>
        )
    }

    return (
        <motion.div className="genre-card" whileHover={{scale: .98}}>
            <Link className="genre-link" to={`/browse/${id}`}>
                <p className="genre-title">{name}</p>
                <div className="genre-poster-div">
                        {genrePoster && <img className="genre-poster" src={imagePath + genrePoster} alt={name}/>}
                </div>
            </Link>
        </motion.div>
    )
}

export default GenreCard