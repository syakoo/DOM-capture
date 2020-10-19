"use strict";

import html2canavs from "html2canvas";

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  downloadTargetNode(msg);

  sendResponse({});
  return true;
});

const downloadTargetNode = (targetNodeTxt) => {
  const a = document.createElement("a");
  a.setAttribute("download", `download.png`);

  const targetNode = document.querySelector(targetNodeTxt);
  if (!targetNode) {
    console.error("対象のノードが見つかりませんでした👻", { targetNodeTxt });
    return;
  }

  scrollTo(0, 0);
  html2canavs(targetNode).then((canvas) => {
    console.log({ canvas });
    canvas.toBlob((blob) => {
      a.setAttribute("href", window.URL.createObjectURL(blob));
      a.click();
      console.log("clicked");
    });
  });
};
