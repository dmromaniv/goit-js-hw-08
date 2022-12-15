import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const START_TIME_KEY = 'videoplayer-current-time';

const videoRef = document.querySelector('#vimeo-player');

const videoPlayer = new Player(videoRef);

setCurrentTime(videoPlayer);

videoPlayer.on('timeupdate', throttle(onTimeUpdate, 250));

function onTimeUpdate(data) {
  localStorage.setItem(START_TIME_KEY, data.seconds);
}

function getStartTime() {
  return localStorage.getItem(START_TIME_KEY) || 0;
}

function setCurrentTime(elemRef) {
  const videoStartTime = getStartTime();
  elemRef.setCurrentTime(+videoStartTime);
}
