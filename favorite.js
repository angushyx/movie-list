const BASE_URL = ' https://movie-list.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/v1/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

//將原本是空陣列的movies改成從瀏覽器getItem('key')
const movies = JSON.parse(localStorage.getItem('favoriteMovies'))


//渲染的頁面要從另一個js傳入，但我不知道怎模船
function renderMovieList(data) {
    let rawHTML = ''

    data.forEach((item) => {
        rawHTML += `<div class="col-sm-3">
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
                      <button class="btn btn-danger btn-remove-favorite" data-id=${item.id}>x</button>
                  </div>
              </div>
          </div>
      </div>`
    })
    dataPanel.innerHTML = rawHTML
}


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



function removeFromFavorite(id) {
    //宣告一個movieIndex變數這個變數可以取出movies裡movie各個元素的位置而不是元素本身
    // findIndex的作用是可以索引出movies裡面movie.id===target.id的陣列位置
    // movieIndex的作用是在索引application裡面的位置 
    const movieIndex = movies.findIndex((movie) => movie.id === id)
        // return console.log(movieIndex)

    //然後再用splice來處理陣列，刪除功能查閱splice說明
    movies.splice(movieIndex, 1)

    //從上面設置的指定索引值(movieIndex)開始減去一個元素，意思就是把點擊的元素去除掉

    //重新在loaalStorage裡面setItem('key','value')這邊的

    localStorage.setItem('favoriteMovies', JSON.stringify(movies))
    renderMovieList(movies)
}




function removeFromFavorite(id) {
    if (!movies || !movies.length) return //防止 movies 是空陣列的狀況

    const movieIndex = movies.findIndex((movie) => movie.id === id)
    console.log(movieIndex)
    if (movieIndex === -1) return

    movies.splice(movieIndex, 1)
    localStorage.setItem('favoriteMovies', JSON.stringify(movies))
    renderMovieList(movies)
}



dataPanel.addEventListener('click', function onPanelClicked(event) {
    if (event.target.matches('.btn-show-movie')) {
        // console.log(event.target.dataset)
        showMovieModal(Number(event.target.dataset.id))
    } else if (event.target.matches('.btn-danger')) {
        removeFromFavorite(Number(event.target.dataset.id))
    }
})

renderMovieList(movies)
