"use strict";

import html2canavs from "html2canvas";

console.log("DOM Capture is actived📷");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!request.code || !request.data) {
    sendResponse({
      status: "400",
      msg: "request.code or request.data is not defined",
    });
    return false;
  }

  switch (request.code) {
    case "DOWNLOAD":
      console.info("DOWNLOAD SELECTED DOM AS PNG");
      downloadTargetNode(request.data);
      break;
    case "CHECK":
    default:
      console.info("CHECK SELECTED DOM");
      try {
        borderTargetNode(request.data);
      } catch (e) {
        if (e.message === "404") {
          sendResponse({
            status: "404",
            msg: "selected dom is not found",
          });
        } else {
          sendResponse({
            status: "403",
            msg: e.msg,
          });
          console.error(e);
        }
      }
      break;
  }
  sendResponse({
    status: "200",
    msg: "completed",
  });
  return true;
});

const borderTargetNode = (targetNodeTxt, bordered = true) => {
  const targetNode = document.querySelector(targetNodeTxt);
  if (!targetNode) throw Error("404");

  if (bordered) {
    targetNode.style.border = "1px solid red";
    setTimeout(() => {
      targetNode.style.border = "none";
    }, 1000);
  } else {
    targetNode.style.border = "none";
  }
};

const downloadTargetNode = (targetNodeTxt) => {
  const a = document.createElement("a");
  a.setAttribute("download", `download.png`);

  const targetNode = document.querySelector(targetNodeTxt);
  if (!targetNode) {
    console.error("対象のノードが見つかりませんでした👻", { targetNodeTxt });
    return;
  }

  scrollTo(0, 0);
  borderTargetNode(targetNodeTxt, false);
  html2canavs(targetNode).then((canvas) => {
    canvas.toBlob((blob) => {
      a.setAttribute("href", window.URL.createObjectURL(blob));
      a.click();
    });
  });
};
