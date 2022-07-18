import '../styles/GenreCard.css'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataContext'

function GenreCard({id, name}) {
    const { searchOptions, typeSearch, imagePath } = useContext(DataContext)
    const [genrePoster, setGenrePoster] = useState('')

    useEffect(() => {
        getPosterForGenreData()
    }, [])

    // use id prop to make another fetch request to first movie poster corresponding to id
    function getPosterForGenreData() {
        const url = `${searchOptions.api}discover/${typeSearch}?api_key=${searchOptions.key}&${searchOptions.language}sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setGenrePoster(res.results[0].backdrop_path)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="genre-card">
            <p className="genre-title">{name}</p>
            <div className="genre-poster-div">
                <img className="genre-poster" src={imagePath + genrePoster} alt=""/>
            </div>
        </div>
    )
}

export default GenreCard