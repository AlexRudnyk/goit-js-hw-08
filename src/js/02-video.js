import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const player = new Player('vimeo-player', {
  id: 'vimeo - player',
  width: 640,
});

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

const throtteled = throttle(onPlay, 1_000);

player.on('timeupdate', throtteled);

let timePosition = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(timePosition)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
