import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// 1. Инициализируй плеер в файле скрипта как это описано в секции pre-existing player
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
// 2. Разбери документацию метода on() и начни отслеживать событие
//  timeupdate - обновление времени воспроизведения.
player.on('timeupdate', throttle(timeStop, 1000));

function timeStop(timeupdate) {
  let playbackStopped = timeupdate.seconds;
  console.log(playbackStopped);
  // 3. Сохраняй время воспроизведения в локальное хранилище.
  //  Пусть ключом для хранилища будет строка "videoplayer-current-time".
  localStorage.setItem('videoplayer-current-time', playbackStopped);
}
// 4. При перезагрузке страницы воспользуйся методом setCurrentTime()
// для того чтобы возобновить воспроизведение с сохраненной позиции.
const getCurrentTime = localStorage.getItem('videoplayer-current-time');
player
  .setCurrentTime(getCurrentTime)
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
