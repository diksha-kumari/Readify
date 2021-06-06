var searchPage = document.getElementById("searchPage");
var resultPage = document.getElementById("resultPage");

function Readify() {
  var searchLink = document.getElementById("SearchLink").value;
  Readify_url(searchLink);
  tooglePage();
}

function onBack() {
  var headline = document.getElementById("headline");
  var content = document.getElementById("content");
  headline.innerHTML = '<div class="loader"></div>';
  content.innerHTML = "Readify data is being ready...";

  tooglePage();
}

function tooglePage() {
  searchPage.style.display === "none"
    ? (searchPage.style.display = "block")
    : (searchPage.style.display = "none");
  resultPage.style.display === "block"
    ? (resultPage.style.display = "none")
    : (resultPage.style.display = "block");
}

async function Readify_url(searchLink) {
  var headline = document.getElementById("headline");
  var content = document.getElementById("content");
  var dom = await makeRequest(
    "GET",
    "https://cors-anywhere.herokuapp.com/" + searchLink
  );
  console.log(dom.documentElement);
  const readfify_data = new Readability(dom).parse();
  headline.innerHTML = readfify_data.title;
  content.innerHTML = readfify_data.content;
  hideBrokenImage();
}

function makeRequest(method, url) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(new DOMParser().parseFromString(xhr.response, "text/html"));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

function hideBrokenImage() {
  document.querySelectorAll("img").forEach(function (img) {
    img.onerror = function () {
      this.style.display = "none";
    };
  });
}
