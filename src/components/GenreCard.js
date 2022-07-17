import '../styles/GenreCard.css'
import { useContext } from 'react'
import { DataContext } from '../DataContext'

function GenreCard({id, name}) {
    const { searchOptions, typeSearch } = useContext(DataContext)

    // use id prop to make another fetch request to first movie poster corresponding to id

    return (
        <div className="genre-card">
            <p className="genre-title">{name}</p>
            <img className="genre-poster" src="" alt=""/>
        </div>
    )
}

export default GenreCard