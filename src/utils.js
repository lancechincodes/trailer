// Request today's trending movies
export function getTrendingTodayData(api, key, setTrendingToday, setLoadingToday) {
  const url = `${api}trending/movie/day?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingToday(true)
      setTrendingToday(res.results[0].backdrop_path)
    })
    .catch(err => console.log(err))
  setLoadingToday(false)
}

// Request this week's trending movies
export function getTrendingThisWeekData(api, key, setTrendingThisWeek, setLoadingWeek) {
  const url = `${api}trending/movie/week?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingWeek(true)
      setTrendingThisWeek(res.results[1].backdrop_path)
    })
    .catch(err => console.log(err))
  setLoadingWeek(false)
}

// Request list of movie genres
export function getGenreData(api, key, language, setGenreArr, setLoadingGenre) {
  const url = `${api}genre/movie/list?api_key=${key}&${language}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingGenre(true)
      setGenreArr(res.genres)
    })
    .catch(err => console.log(err))
  setLoadingGenre(false)
}

// Request backdrop posters for each genre
export function getPosterForGenreData(api, key, language, id, setGenrePoster, setLoadingGenrePoster) {
  const url = `${api}discover/movie?api_key=${key}&${language}sort_by=popularity.desc&page=1&with_genres=${id}`
  fetch(url)
      .then(res => res.json())
      .then(res => {
          // setLoadingGenrePoster(true)
          setGenrePoster(res.results[0].backdrop_path)
      })
      .catch(err => console.log(err))
  setLoadingGenrePoster(false)
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