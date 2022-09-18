let inputForm = document.getElementById("inputForm");
let submitBtn = document.getElementById("submitBtn");
let error = document.getElementById("error");
let content = document.getElementById("content");
let displayFull = document.getElementById("displayFull");

// pre loading
// window.addEventListener("load", function () {
//   preloader.style.display = "none";
// });
// user request fetch
function loadUser() {
  displayLoading();
  content.innerHTML = "";
  displayFull.innerHTML = "";
  if (inputForm.value == "") {
    error.innerHTML = "Search Box must not ne Empty!";
    hideLoading();
  } else {
    error.innerHTML = "";
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${inputForm.value}`)
      .then((res) => res.json())
      .then((data) => displayItem(data.items));
  }
}

submitBtn.addEventListener("click", loadUser);

// display function

let displayItem = (bookItem) => {
  inputForm.value = "";

  //   console.log(bookItem);
  if (bookItem == undefined) {
    error.innerHTML = "Item Not Found";
    hideLoading();
  } else {
    error.innerHTML = "";
    for (let singleItem of bookItem) {
      let div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
      <div onclick="bookFullView('${singleItem.selfLink}')"> 
       <img src="${singleItem.volumeInfo.imageLinks.smallThumbnail}" class="card-img-top" alt="book image"></img>

            <div class="card-body">
              <h5 class="card-title">${singleItem.volumeInfo.title}</h5>
              <h5 class="card-title">${singleItem.volumeInfo.authors}</h5>
              <h5 class="card-title">${singleItem.volumeInfo.publishedDate}</h5>
              <p class="card-text">
              ${singleItem.volumeInfo.description}
              </p>
            </div>
            </div>
            `;

      content.appendChild(div);
      hideLoading();
    }
  }
};

// Book Full view Display

function bookFullView(temp) {
  displayLoading();
  let url = `${temp}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFullItem(data.volumeInfo));
}

//displayFull
function displayFullItem(fullData) {
  console.log(fullData);
  displayFull.innerHTML = `
  
  <img src="${fullData.imageLinks.smallThumbnail}" class="card-img-top" alt="Full Image" />
  <div class="card-body">
    <h5 class="card-title">${fullData.title}</h5>
    <h5 class="card-title">${fullData.authors}</h5>
    <h5 class="card-title">${fullData.publishedDate}</h5>
    <p class="card-text">
    ${fullData.description}
    </p>
    <p class="card-text">
     
    </p>
  </div>
  `;

  hideLoading();
}

let preloader = document.getElementById("preLoader");
// display loading
let loadingBtn = document.getElementById("loadingBtn");
let displayLoading = () => {
  preloader.style.display = "block";
};
// hide loading
let hideLoading = () => {
  preloader.style.display = "none";
};

// loadingBtn.addEventListener("click", displayLoading);
