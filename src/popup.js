"use strict";

import "./popup.css";

(function () {
  const submitBtn = document.querySelector("form #ss-submit");
  const selectorInput = document.querySelector("form #ss-input");
  if (!submitBtn || !selectorInput) {
    throw Error("missing form");
  }

  submitBtn.addEventListener(
    "click",
    () => {
      const targetNodeTxt = selectorInput.value;
      console.log({ targetNodeTxt });
      if (!targetNodeTxt) {
        return;
      }
      sendMsgToActiveTab(targetNodeTxt);
    },
    false
  );
  selectorInput.addEventListener("input", (e) => {
    const targetNodeTxt = e.target.value;
    console.info({ targetNodeTxt });
    if (!targetNodeTxt) return;

    sendMsgToActiveTab(
      targetNodeTxt,
      (resp) => {
        const errorNode = document.querySelector("form .error");
        if (resp.status === "404") {
          errorNode.style.display = "block";
        } else {
          errorNode.style.display = "none";
        }
      },
      "CHECK"
    );
  });
})();

const sendMsgToActiveTab = (
  msg,
  callback = (resp) => {},
  code = "DOWNLOAD"
) => {
  console.info("Send msg to the active tab.", { msg, code });
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const request = {
      code,
      data: msg,
    };

    chrome.tabs.sendMessage(tabs[0].id, request, function (response) {
      console.log({ response });
      callback(response);
    });
  });
};
