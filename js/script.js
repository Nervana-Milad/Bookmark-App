var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var nameValidation = document.getElementById("nameValidation");
var urlValidation = document.getElementById("urlValidation");
var localBookmark = "allBookmarks";
var allBookmarks = [];

if (JSON.parse(localStorage.getItem(localBookmark)) == null) {
  allBookmarks = [];
} else {
  allBookmarks = JSON.parse(localStorage.getItem(localBookmark));
  displayBookmarks(allBookmarks);
}

function addBookmark() {
  var bookmark = {
    name: siteNameInput.value,
    url: siteURLInput.value,
  };
  var isNameValid = isValidName(bookmark.name);
  var isUrlValid = isValidUrl(bookmark.url);

  if (isNameValid && isUrlValid) {
    allBookmarks.push(bookmark);
    addToLocalStorage();
    // displayBookmarks();
    urlValidation.textContent = "";
    nameValidation.textContent = "";
    clearForm();
  } else if (isNameValid && !isUrlValid) {
    nameValidation.innerHTML = "";
    urlValidation.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Enter a valid URL ... must contain "https://"`;
  } else if (!isNameValid && isUrlValid) {
    urlValidation.innerHTML = "";
    nameValidation.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Name must br greater the 3 characters`;
  } else {
    urlValidation.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Enter a valid URL ... must contain "https://"`;
    nameValidation.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Name must br greater the 3 characters`;
  }

  displayBookmarks();
  console.log(allBookmarks);
}

function addToLocalStorage() {
  localStorage.setItem(localBookmark, JSON.stringify(allBookmarks));
}

function isValidName(name) {
  return name.length > 3;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return string.startsWith("https://");
  } catch (err) {
    return false;
  }
}

function clearForm() {
  siteNameInput.value = "";
  siteURLInput.value = "";
  urlValidation.value = "";
}

function displayBookmarks() {
  var blackBox = ``;
  for (var i = 0; i < allBookmarks.length; i++) {
    blackBox += `
    <tbody>
    <tr>
      <td scope="row">${i + 1}</td>
      <td>${allBookmarks[i].name}</td>
      <td>
      <a
      type="button"
      class="btn btn-info"
      href="${allBookmarks[i].url}"
      target="_blank"
    >
      <i class="fa-solid fa-eye me-2"></i>
      Visit
    </a>
      </td>
      <td>
        <button type="button" class="btn btn-outline-danger" onclick="deleteBookmark(${i})">
          <i class="fa-solid fa-trash me-2"></i>
          Delete
        </button>
      </td>
    </tr>
  </tbody>`;
  }
  document.getElementById("bookmarkRow").innerHTML = blackBox;
}

function deleteBookmark(index) {
  allBookmarks.splice(index, 1);
  addToLocalStorage();
  // console.log(allBookmarks);
  displayBookmarks();
}
