"use strict";
const STORAGE_KEY = "i_counter";
let words = document.getElementsByTagName("body")[0].innerHTML.replace(/<.*?>/g, "");
let n = 0;
for (let i = 0; i < words.length; i++) {
    if (words.charAt(i) === "ゐ") {
        n++;
    }
}
chrome.storage.sync.get([STORAGE_KEY]).then((result) => {
    let data = result[STORAGE_KEY];
    if (data && typeof data === "number") {
        chrome.storage.sync.set({ [STORAGE_KEY]: data + n });
    }
    else {
        chrome.storage.sync.set({ [STORAGE_KEY]: n });
    }
});
