export function getTrendingTodayData(api, key, setTrendingToday, setLoadingToday) {
  const url = `${api}trending/movie/day?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingToday(true)
      setTrendingToday(res.results[0].backdrop_path)
    })
    .catch(err => console.log(err))
  // setLoadingToday(false)
}

export function getTrendingThisWeekData(api, key, setTrendingThisWeek, setLoadingWeek) {
  const url = `${api}trending/movie/week?api_key=${key}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingWeek(true)
      setTrendingThisWeek(res.results[1].backdrop_path)
    })
    .catch(err => console.log(err))
  // setLoadingWeek(false)
}

export function getGenreData(api, key, language, setGenreArr, setLoadingGenre) {
  const url = `${api}genre/movie/list?api_key=${key}&${language}`
  fetch(url)
    .then(res => res.json())
    .then(res => {
      // setLoadingGenre(true)
      setGenreArr(res.genres)
    })
    .catch(err => console.log(err))
  // setLoadingGenre(false)
}

export function getPosterForGenreData(api, key, language, id, setGenrePoster, setLoadingGenrePoster) {
  const url = `${api}discover/movie?api_key=${key}&${language}sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`
  fetch(url)
      .then(res => res.json())
      .then(res => {
          setGenrePoster(res.results[0].backdrop_path)
      })
      .catch(err => console.log(err))
  // setLoadingGenrePoster(false)
}