// // 連接API
// //用常數定義API網址，以後如果API更改後只要更改常數內容就可以了。
// const BASE_URL = ' https://movie-list.alphacamp.io'
// const INDEX_URL = BASE_URL + '/api/v1/movies/'
// const POSTER_URL = BASE_URL + '/posters/'

// const dataPanel = document.querySelector('#data-panel')
// const searchForm = document.querySelector('#search-form')
// const searchInput = document.querySelector('#search-input')


// 加入const paginator = document.querySelector('#paginator')的節點
//這個節點要裝入<li><a>-->也就是分頁，並把他渲染到html裡面
//再建立一個function-->作用是render分頁
//render出分頁需要以動態的方式計算分頁，全部80部電影，一頁只能放入12部電影再做計算




// //拿來放全部電影清單的電影
// const movies = []


// //call API 、拿回response，再把movies的資料推回陣列裡面
// //step1.先宣告一個空陣列準備來放data
// //step2.用API把資料抓到，並使用push一一放入movies中
// //step3.用函式包裝渲染頁面的功能

// // 使用展開運算子，可以達成和for of loop一樣的效果
// //arrary.push可以接受無限多的參數


//這邊的renderMovieList不能再用整個movies(80部)的陣列進去了，
//因為需要用分頁(getMovieByPage(page))來處理現在需要第幾頁



// axios
//     .get(INDEX_URL)
//     .then((response) => {
//         movies.push(...response.data.results)
//         renderMovieList(movies)
//     })
//     .catch((err) => console.log(err))

// //建立一個renderMovieList的函式
// //這個item是將全部所有在movies裡的data一一列出

// //把data這個參數改成新的篩選出的陣列再把這個function塞入監聽表單提交事件







// function renderMovieList(data) {
//     let rawHTML = ''
//     data.forEach((item) => {
//         rawHTML += `<div class="col-sm-3">
//       <div class="mb-2">
//           <div class="card">
//               <img src="${POSTER_URL + item.image}"
//                   class="card-img-top" alt="Movie Poster" />
//               <div class="card-body">
//                   <h5 class="card-title">${item.title}</h5>
//               </div>
//               <div class="card-footer">
//                   <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal"
//                        data-bs-target="#movie-modal" data-id=${item.id}>
//                       More
//                   </button>
//                   <button class="btn btn-info btn-add-favorite" data-id=${item.id}>+</button>
//               </div>
//           </div>
//       </div>
//   </div>`
//     })
//     dataPanel.innerHTML = rawHTML
// }

// //(46)把id綁在按鈕上，當按下more按鈕時，讓Ajax拿回資料
// //html 有dataset這個功能只要有data開頭的，都是dataset


// //每張Modal的不同結構，包括：title、img、date，description取出節點。
// //這個function是寫給下面的事件監聽器用的
// function showMovieModal(id) {
//     const modalTitle = document.querySelector('#movie-modal-title')
//     const modalImage = document.querySelector('#movie-modal-image')
//     const modalDate = document.querySelector('#movie-modal-date')
//     const modalDescription = document.querySelector('#movie-modal-description')
//     axios
//         .get(INDEX_URL + id)
//         .then(response => {
//             const data = response.data.results
//             console.log(data)
//             modalTitle.innerText = data.title
//             modalDate.innerText = "Release Date " + data.release_date
//             modalDescription.innerText = data.description
//             modalImage.innerHTML = `<img src="${POSTER_URL + data.image}" alt="movie-poster" class ="img-fuid">`
//         })
// }


// //將使用者點擊到的那一部電影送進 local storage 儲存起來
// function addToFavorite(id) {
//     //寫一個函式，功能是比對電影id是否matches event.target，如果是的話回傳event.target的資料
//     // function isMovieIdMatched(movie) {
//     //     return movie.id === id //
//     // }

//     //JSON.parse會將JSON的字串轉變為js資料(物件或是陣列)，透過轉換來使用
//     //JSON.stringify會把JS的資料轉變成JSON字串
//     //而localStroage裡面需要的是JSON字串形式
//     const list = JSON.parse(localStorage.getItem('favoriteMovies')) || [] //取回的情況有兩種，//我想要localStorage.getItem如果沒有就給我空的陣列???
//     const movie = movies.find(movie => movie.id === id)

//     //一部電影只能夠被加入清單一次
//     //使用some：可以知道這個list陣列裡有沒有這個元素，有的話給true沒有的話給false
//     if (list.some(movie => movie.id === id)) {
//         return alert('此電影已存在喜愛清單')
//         //使用跟剛剛find的相同的條件式，都是判斷movie.id是否等於點擊的id，可以用來分辨是否重複
//         //如果有重複的話，return alter
//     }


//     list.push(movie)
//     console.log(list)

//     localStorage.setItem('favoriteMovies', JSON.stringify(list))




//     // const jsonString = JSON.stringify(list)
//     // console.log('JSONstring',jsonString)
//     // console.log('JOSNParse',JSON.parse(jsonString))
//     //把movies陣列裡80部電影的每部電影一一抓出丟到isMovieIdMatched一一比對
//     //movies陣列裡每個元素都是一部電影

//     //因為已經有點event.target的id了，所以用迴圈把movies的每部點影拿出並且，比對id
//     //如果是我們想要的id的話，取出(方法是find())
//     //find的參數跟filter一樣是帶入一個function進去

// }







// //dataset的功能是，只要按了dataset後點擊該元素的所有被綁在上面的data都會變成object給你看
// //透過這種方式可以把Ajax回的資料綁再元素上面，只要是dataset他的值都一定是字串。
// //使用dataset可以取出目標的data值，而如果dataset裡面有id的話就可以使用這招取出特定的id
// //但只要是dataset取出的值都是string所以要用Number更改





// ////點擊事件1.點擊matches=>show-movie時呼叫showMovieModal函式(請看函式功能)
// ////點擊事件2.點擊matches=>add-favorite時呼叫addToFavorite函式(請看函式功能)

// dataPanel.addEventListener('click', function onPanelClicked(event) {
//     if (event.target.matches('.btn-show-movie')) {
//         // console.log(event.target.dataset)
//         showMovieModal(Number(event.target.dataset.id))
//     } else if (event.target.matches('.btn-add-favorite')) {
//         addToFavorite(Number(event.target.dataset.id))
//     }
// })



// //監聽表單提交事件，將renderMovieList塞入這個監聽事件裡面，參數改成已篩選完成的陣列
// searchForm.addEventListener('submit', function onSearchFormSubmitted(event) {
//     event.preventDefault()
//     //  console.log(searchInput.value)
//     let filteredMovies = []//給一個空陣列來存放篩選後的MovieList
//     const keyword = searchInput.value.trim().toLowerCase()
//     //建立keyword變數取出的值是input裡的值，把這個值做一些處理。
//     // 使用trim函式和toLowerCase函式做到以下兩種處理 (1)去除空白頭尾 (2)轉換成小寫

//     // 直接用filteredMovies這個陣列取出所有電影(movies)的值，並用filter+includes過濾出
//     //title和keyword相符的movie。
//     //取出值後，就可以用renderMovieList把新的陣列渲染到頁面上了
//     filteredMovies = movies.filter((movie) =>
//         movie.title.toLowerCase().includes(keyword))

//     if (filteredMovies.length === 0) {
//         return alert(`cannot found the： ${keyword}`)
//         //如果不用return就會讓網頁只剩下alert
//     }
//     renderMovieList(filteredMovies)
// })

//當我輸入page參數時會回傳給該page的電影資料，ex：page=1時顯示第一頁的電影資料(12部)

//page 1 --> 0~11
//page 2 --> 12~23
//page 1 --> 24~35
//...

// startIndex會等於(page-1)*12部電影
// end的話是startIndex + MOVIES_PER_PAGE

function getMoviesByPage(page) {
    //計算起始 index 
    const startIndex = (page - 1) * MOVIES_PER_PAGE

    //回傳切割後的新陣列(從0開始index) 
    // PAGE1的值是0~12，PAGE2是2-1*12=12所以page2是12~24
    //使用slice的話後面的值不算所以page1真正取的值是0~11

    return movies.slice(startIndex, startIndex + MOVIES_PER_PAGE)
}




//特定電影詳情
// 1.客製化modal元件
// 2.動態綁定按鈕的點擊事件(click ev ents)
// 3.取出特定電影的id資訊
// 4.向show API request 資料


//localStroage只能放字串

// localStorage.setItem("default_language","english")




























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

//流程：
// 1.到font awesome裡面取得card和list的兩個不同的icon
// 2.在html裡面的data-panel建立data-mode="card-mode"來當交替不同頁面渲染的按鈕
// 3.需要一個事件監聽器、一個交換的渲染函式和把原有的函式renderMovieList改成兩種型態
// 4.先寫交換data-mode的函式，參數是click事件指定的data-mode，邏輯是：當data-panel上面的data-mode === 現在的data-mode的話return掉
//  可以不用重複渲染同一畫面，return後面的函式則是：data-mode = 點擊時的mode(card-mode or list-mode)
// 所以在click事件加入條件判斷，當click到指定的icon時，將參數更改成指定icon的data-mode
// 5.寫監聽事件：選取到監聽事件的節點之後，寫出條件判斷，判斷甚麼? 判斷點擊事件發生位置是否符合icon的id位置
// 若符合的話使用交換節點的函式，參數帶入兩個不同畫面的data-mode。
// 最後要render出畫面：在renderMovieList這個函式裡面加入條件判斷：一樣是用dataset來分辨。

// 剛剛上面提到data-mode = 點擊時的mode，




// console.log(localStorage.getItem("default_language"))

// localStorage.removeItem('default_language')