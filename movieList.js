const BASE_URL = ' https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const paginationUl = document.querySelector('#pagination-ul')
const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const changeModeSwitch = document.querySelector('#change-Mode')
const searchInput = document.querySelector('#search-input')
const movies = []

const MOVIES_PER_PAGE = 12
    //把filteredMovies放到全域
let filteredMovies = []
const currentPage = 1

//////////////////function//////////////////////////

/////////////////渲染movie card and movie list/////////////////////////////////

function renderMovieList(data) {
    if (dataPanel.dataset.mode === 'card-mode') {
        let rawHTML = ''
        data.forEach((item) => {
            rawHTML +=
                `<div class="col-sm-3">
      <div class="mb-2">
          <div class="card">
              <img src="${POSTER_URL + item.image}"
                  class="card-img-top" alt="Movie Poster" />
              <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
              </div>
              <div class="card-footer">
                  <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                       data-bs-target="#movie-modal" data-id=${item.id}>
                      More
                  </button>
                  <button class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
              </div>
          </div>
      </div>
  </div>`
        })
        dataPanel.innerHTML = rawHTML


    } else if (dataPanel.dataset.mode === 'list-mode') {
        let rawHTML = ''
        data.forEach((item) => {
            rawHTML += `
            <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex align-items-center justify-content-between border-bottom ">
                <h5>${item.title}</h5>
                <div class="btn">
                    <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
                        data-bs-target="#movie-modal" data-id=${item.id}>
                        More
                    </button>
                    <button class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
                </div>
            </li>
            </ul>
            `
        })
        dataPanel.innerHTML = rawHTML
    }
}


///////////////////展示movieModal///////////////////////////////////////////
function showMovieModal(id) {
    const modalTitle = document.querySelector('#movie-modal-title')
    const modalImage = document.querySelector('#movie-modal-image')
    const modalDate = document.querySelector('#movie-modal-date')
    const modalDescription = document.querySelector('#movie-modal-description')
    axios
        .get(INDEX_URL + id)
        .then(response => {
            const data = response.data.results
                // console.log(data)
            modalTitle.innerText = data.title
            modalDate.innerText = "Release Date " + data.release_date
            modalDescription.innerText = data.description
            modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class ="img-fuid">`
        })
}

///////// 將使用者點擊到的那一部電影送進 local storage 儲存起來//////////////////
function addToFavorite(id) {
    const list = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    const movie = movies.find(movie => movie.id === id)
        //錯誤處理
    if (list.some(movie => movie.id === id)) {
        return alert('此電影已存在喜愛清單')
    }
    list.push(movie)
        // console.log(list)
    localStorage.setItem('favoriteMovies', JSON.stringify(list))
}

///////////////////每頁page顯示的movies///////////////////////////////////////
function getMoviesByPage(page) {
    // movies ? "movies": "filteredMovies"
    //如果filterMovie有東西給我filterMovie如果沒東西就顯示movies
    const data = filteredMovies.length ? filteredMovies : movies
    const startIndex = (page - 1) * MOVIES_PER_PAGE
    return data.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}
////////////////算出pagination數量，並且渲染出////////////////////////
function renderPagination(movieLength) {
    const page = Math.ceil(movieLength / MOVIES_PER_PAGE)
    let pagination = ''
    for (let i = 1; i <= page; i++) {
        pagination += `
    <li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>
    `
    }
    paginationUl.innerHTML = pagination
}

/////////////寫一個切換電影的function///////////////////
//取節點內的data-mode屬性來比對changeModeSwitch裡面的
function changeDisplayMode(displayMode) {
    if (dataPanel.dataset.mode === displayMode) return
    dataPanel.dataset.mode = displayMode
}

////////////////////////////////事件監聽/////////////////////////////////////////
dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        // console.log(event.target.dataset)
        showMovieModal(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-add-favorite')) {
        addToFavorite(Number(event.target.dataset.id))
    }
})

paginationUl.addEventListener('click', function onPaginationClick(event) {
    if (event.target.tagName !== 'A') return //如果點擊的target不是a就不做這個function了
    const page = Number(event.target.dataset.page)
    renderMovieList(getMoviesByPage(page))
})



searchForm.addEventListener('keyup', function onSearchFormSubmitted(event) {
    event.preventDefault()

    const keyword = searchInput.value.trim().toLowerCase()
    filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(keyword))
    if (!filteredMovies.length) {
        return
    }
    // currentPage = 1
    renderPagination(filteredMovies.length)
    renderMovieList(getMoviesByPage(currentPage))
})



//按paginator的時候render的，點哪頁就render出哪頁。第二次呼叫




//增加事件監聽器click，當按下card-mode時顯示出card-mode
changeModeSwitch.addEventListener('click', function onSwitchClicked(event) {
    if (event.target.matches('#change-card-mode')) {
        changeDisplayMode("card-mode")
        renderMovieList(getMoviesByPage(currentPage))
            // console.log(dataPanel.dataset.mode)
    } else if (event.target.matches('#change-list-mode')) {
        changeDisplayMode("list-mode")
        renderMovieList(getMoviesByPage(currentPage))
            // console.log(dataPanel.dataset.mode)
    }
})

axios
    .get(INDEX_URL)
    .then((response) => {
        movies.push(...response.data.results)
            // console.log(movies)
            //網頁載入時呼叫第一頁(第一次render)
        renderMovieList(getMoviesByPage(currentPage))
        renderPagination(movies.length)
    })
    .catch((err) => console.log(err))

console.log(movies.length)