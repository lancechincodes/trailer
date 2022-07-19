import '../styles/Gallery.css'
import { useParams } from 'react-router-dom'

function Gallery() {
    const { genreId } = useParams()
    console.log(genreId) 

    return (
        <div className="gallery-page">
            <p>Hi from the gallery page</p>
            <div className="outer-carousel">
                <div className="inner-carousel">

                </div>
            </div>
        </div>
    )
}

export default Gallery