"use strict";

// import "./popup.css";

(function () {
  const submitBtn = document.querySelector("form #ss-submit");
  const selectorInput = document.querySelector("form #ss-input");
  console.log({ submitBtn, selectorInput });
  submitBtn.addEventListener(
    "click",
    () => {
      const targetNodeTxt = selectorInput.value;
      console.log({ targetNodeTxt });
      if (!targetNodeTxt) {
        return;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, targetNodeTxt, function (response) {
          console.log({ response });
        });
      });
    },
    false
  );
})();
