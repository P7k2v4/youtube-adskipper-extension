let adAlreadySkipped = false;

function isAdPlaying() {
  return document.querySelector('.ad-showing') !== null;
}

function clickSkipButton() {
  const skipButton = document.querySelector('.ytp-ad-skip-button');
  if (skipButton && skipButton.offsetParent !== null) {
    skipButton.click();
    console.log('🎯 Skip Ad button clicked!');
    return true;
  }
  return false;
}

function skipAdBy(seconds) {
  const video = document.querySelector('video');
  if (video) {
    video.currentTime += seconds;
    console.log(`⏩ Skipped forward ${seconds} seconds`);
  }
}

setInterval(() => {
  if (isAdPlaying()) {
    console.log('📢 Ad detected!');
    
    if (!adAlreadySkipped) {
      const skipped = clickSkipButton();
      if (!skipped) {
        console.log('🚀 No skip button. Skipping ahead...');
        skipAdBy(180); // Skip 3 minutes
      }
      adAlreadySkipped = true; // Set after action done
    }
    
  } else {
    adAlreadySkipped = false; // Reset after ad ends
  }
}, 500); // check faster every 0.5s