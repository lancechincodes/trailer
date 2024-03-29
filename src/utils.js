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
      setTrendingThisWeek(res.results[0].backdrop_path)
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
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      setGenreArr(res.genres)
    })
    .catch(err => console.log(err))
    .finally (() => {
      setLoadingGenre(false)
    })
}

// Request movie id for random genre
export function getRandomMovieId(api, key, language, id, setRandomMovieId) {
  const url = `${api}discover/movie?api_key=${key}&${language}sort_by=popularity.desc&page=1&with_genres=${id}`
  fetch(url)
      .then(res => res.json())
      .then(res => {
          setRandomMovieId(res.results[Math.floor(Math.random() * 20)].id)
      })
      .catch(err => console.log(err))
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
export function getGalleryData(url, setGalleryMovies, setLoadingGallery) {
  setLoadingGallery(true)
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      let filteredResults = []
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].poster_path !== null) {
          filteredResults.push(res.results[i])
        }
      }
      setGalleryMovies(filteredResults)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingGallery(false)
    })
}

// Request selected movie data 
export function getMovieData(url, setMovieBackdrop, setMovieTitle, setMoviePoster, setMovieDate, setMovieRating, setMovieTime, setMovieDescription, setLoadingMovieData) {
  setLoadingMovieData(true)
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
    .finally(() => {
      setLoadingMovieData(false)
    })
}

// Request youtube trailer key 
export function getYoutubeKeyData(url2, setTrailerYoutubeKey, setLoadingYoutubeKeyData) {
  setLoadingYoutubeKeyData(true)
  fetch(url2)
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      let filteredRes = res.results.filter((vid) => vid.type === "Trailer")
      let found = false
      for (let i = 0; i < filteredRes.length; i++) {
        if (filteredRes[i].name.includes("Official Trailer")) {
          setTrailerYoutubeKey(filteredRes[i].key)
          found = true
          break;
        }
      }
      if (!found) {
        for (let i = 0; i < filteredRes.length; i++) {
          if (filteredRes[i].name.includes("Trailer")) {
            setTrailerYoutubeKey(filteredRes[i].key)
            found = true
            break;
          }
        }
      }
      if (!found) {
        filteredRes = res.results.filter((vid) => vid.type === "Teaser")
        for (let i = 0; i < filteredRes.length; i++) {
          if (filteredRes[i].name.includes("Official Teaser")) {
            setTrailerYoutubeKey(filteredRes[i].key)
            break;
          }
        }
      }
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingYoutubeKeyData(false)
    })
}

// Request similar movies
export function getMovieSimilarData(url3, setMovieSimilar, setLoadingMovieSimilar) {
  setLoadingMovieSimilar(true)
  fetch(url3) 
    .then(res => res.json())
    .then(res => {
      // console.log(res)
      let similarMovieArr = []
      for (let i = 0; i < res.results.length; i++) {
        if (res.results[i].backdrop_path !== null) {
          similarMovieArr.push(res.results[i])
        } 
      }
      setMovieSimilar(similarMovieArr)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingMovieSimilar(false)
    })
}

// Request watch providers for movie
export function getWatchProviders(url4, setWatchProviders, setLoadingWatchProviders) {
  setLoadingWatchProviders(true)
  fetch(url4)
    .then(res => res.json())
    .then(res => {
      // console.log(res.results['US']['flatrate'])
      let watchProvidersData = res.results['US']['flatrate']
      let watchProvidersLogos = []
      for (let i = 0; i < watchProvidersData.length; i++) {
        watchProvidersLogos.push(watchProvidersData[i]['logo_path'])
      }
      setWatchProviders(watchProvidersLogos)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoadingWatchProviders(false)
    })
}