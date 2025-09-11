let lastAdTime = -1;

function isAdPlaying() {
  return document.querySelector(".ad-showing") !== null;
}

function clickSkipButton() {
  const skipButton = document.querySelector(".ytp-ad-skip-button");
  if (skipButton && skipButton.offsetParent !== null) {
    skipButton.click();
    console.log("🎯 Skip Ad button clicked!");
    return true;
  }
  return false;
}

function skipAdBy(seconds) {
  const video = document.querySelector("video");
  if (video) {
    video.currentTime += seconds;
    console.log(`⏩ Skipped forward ${seconds} seconds`);
  }
}

setInterval(() => {
  const video = document.querySelector("video");

  if (isAdPlaying() && video) {
    console.log("📢 Ad detected!");

    // Detect start of a NEW ad
    if (video.currentTime < lastAdTime) {
      console.log("🔄 New ad started!");
      adAlreadySkipped = false;
    }
    lastAdTime = video.currentTime;

    if (!adAlreadySkipped) {
      const skipped = clickSkipButton();
      if (!skipped) {
        console.log("🚀 No skip button. Skipping ahead...");
        skipAdBy(180); // Skip 3 minutes
      }
      adAlreadySkipped = true;
    }
  } else {
    adAlreadySkipped = false; // Reset after all ads end
    lastAdTime = -1;
  }
}, 500);
