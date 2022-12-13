import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const videoRef = document.querySelector('#vimeo-player');

const videoPlayer = new Player(videoRef);

const videoStartTime = localStorage.getItem('videoplayer-current-time') || 0;
videoPlayer.setCurrentTime(+videoStartTime);

videoPlayer.on('timeupdate', throttle(onTimeUpdate, 250));

// Get video start time
function onTimeUpdate(data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
}
