/**
 * Example 6: Create your own custom distortion
 */
function example6(context) {
  // load the audio via ajax
  var request = new XMLHttpRequest();
  request.open('GET', 'cave.mp3', true);
  request.responseType = 'arraybuffer';
  request.onload = onLoad;
  request.send();

  function onLoad() {
    context.decodeAudioData(request.response, audioDecoded);
  }

  function audioDecoded(buffer) {
    // set up the buffer for storing the audio data
    var source = context.createBufferSource();
    source.buffer = buffer;

    // create a distortion node (with a corresponding curve)
    var curve = new Float32Array(44100);
    var alpha = 1;
    var beta = 50;
    for(var i = 0; i < 44100; i++) {
      var x = (i / 44100) * 2 - 1; // scale i to be between -1 and 1;
      curve[i] = (alpha + beta) * x / (alpha + beta * Math.abs(x)); // sort of a "logistic" curve
    }
    var distortion = context.createWaveShaper();
    distortion.curve = curve;
    distortion.oversample = '4x';
  
    // set the volume
    var gain = context.createGain();
    gain.gain.value = 0.2;
  
    // connect nodes
    source.connect(distortion);
    distortion.connect(gain);
    gain.connect(context.destination);

    // start playing
    source.start(0);
  }
}
