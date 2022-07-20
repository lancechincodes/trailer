// Request today's trending movies
export function getTrendingTodayData(api, key, setTrendingToday, setLoadingToday) {
  setLoadingToday(true)
  const url = `${api}trending/movie/day?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      setTrendingToday(res.results[0].backdrop_path)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingToday(false)
    })
}

// Request this week's trending movies
export function getTrendingThisWeekData(api, key, setTrendingThisWeek, setLoadingWeek) {
  setLoadingWeek(true)
  const url = `${api}trending/movie/week?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      setTrendingThisWeek(res.results[1].backdrop_path)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingWeek(false)
    })
}

// Request list of movie genres
export function getGenreData(api, key, language, setGenreArr, setLoadingGenre) {
  setLoadingGenre(true)
  const url = `${api}genre/movie/list?api_key=${key}&${language}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      setGenreArr(res.genres)
    })
    .catch(err => console.log(err))
    .finally (() => {
      setLoadingGenre(false)
    })
}

// Request backdrop posters for each genre
export function getPosterForGenreData(api, key, language, id, setGenrePoster, setLoadingGenrePoster) {
  setLoadingGenrePoster(true)
  const url = `${api}discover/movie?api_key=${key}&${language}sort_by=popularity.desc&page=1&with_genres=${id}`
  fetch(url)
      .then(res => res.json())
      .then(res => {
          setGenrePoster(res.results[0].backdrop_path)
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingGenrePoster(false)
      })
}

// Request gallery data 
export function getGalleryData(url, setGalleryMovies) {
  fetch(url)
    .then(res => res.json())
    .then(res => {
      setGalleryMovies(res.results)
    })
    .catch(err => console.log(err))
}

// Request selected movie data 
export function getMovieData(url, setMovieBackdrop, setMovieTitle, setMoviePoster, setMovieDate, setMovieRating, setMovieTime, setMovieDescription) {
  fetch(url) 
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      setMovieBackdrop(res.backdrop_path)
      setMovieTitle(res.title)
      setMoviePoster(res.poster_path)
      setMovieDate(res.release_date)
      setMovieRating(res.vote_average)
      setMovieTime(res.runtime)
      setMovieDescription(res.overview)
    })
    .catch(err => console.log(err))
}

// Request youtube trailer key 
export function getYoutubeKeyData(url2, setTrailerYoutubeKey) {
  fetch(url2)
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}

// Request similar movies
export function getMovieSimilarData(url3, setMovieSimilar) {
  fetch(url3) 
    .then(res => res.json())
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}