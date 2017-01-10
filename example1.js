/**
 * Example 1: Play an Audio file
 */
function example1(context) {
  // load the audio via ajax
  var request = new XMLHttpRequest();
  request.open('GET', 'cave.mp3', true);
  request.responseType = 'arraybuffer';
  request.onload = onLoad;
  request.send();

  function onLoad() {
    // once it's loaded, attempt to decode the audio
    context.decodeAudioData(request.response, audioDecoded);
  }

  function audioDecoded(buffer) {
    // once it's decoded, set up the buffer for storing the audio data
    var source = context.createBufferSource();
    source.buffer = buffer;
  
    // set the volume
    var gain = context.createGain();
    gain.gain.value = 0.4;
  
    // connect nodes
    source.connect(gain);
    gain.connect(context.destination);

    // start playing
    source.start(0);
  }
}
