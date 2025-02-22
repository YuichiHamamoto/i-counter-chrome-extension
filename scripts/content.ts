//key for the storage
const STORAGE_KEY = "i_counter";

//get all words from the web page
let words = document.getElementsByTagName("body")[0].innerHTML.replace(/<.*?>/g, "");

//count the number of ゐ in words
let n = 0;
for (let i = 0; i < words.length; i++) {
  if (words.charAt(i) === "ゐ") {
    n++;
  }
}

//get the item from storage
chrome.storage.sync.get([STORAGE_KEY]).then((result) => {
  let data = result[STORAGE_KEY];

  //if data is previously set, increase by the number of ゐ appeared in the web page
  if (data && typeof data === "number") {
    chrome.storage.sync.set({ [STORAGE_KEY]: data + n });
  }
  //otherwise
  else {
    chrome.storage.sync.set({ [STORAGE_KEY]: n });
  }
});
