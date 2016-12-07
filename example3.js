function example3(context) {
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
  
    // set the volume
    var gain = context.createGain();
    gain.gain.value = 0.4;
  
    // set up the analyser
    var analyser = context.createAnalyser();
    analyser.fftSize = 2048;
  
    // connect nodes
    source.connect(analyser);
    analyser.connect(gain);
    gain.connect(context.destination);

    // start playing
    source.start(0);

    // Set up the drawing surface
    var canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    document.body.appendChild(canvas);
    var canvasContext = canvas.getContext('2d');
    canvasContext.fillStyle = '#222';
    canvasContext.strokeStyle = '#3f5';
  
    // A buffer for putting raw EQ data in
    var equalizerDataBuffer = new Uint8Array(2048);

    function draw() {
      // read EQ data
      analyser.getByteTimeDomainData(equalizerDataBuffer);

      // now draw it nicely
      canvasContext.fillRect(0, 0, 500, 500);
      canvasContext.beginPath();
      for(var i = 0; i < 2048; i++) {
        var x = i / 2048 * 500;
        var y = equalizerDataBuffer[i] *250 / 128;

        if(i === 0) {
          canvasContext.moveTo(x, y);
        } else {
          canvasContext.lineTo(x, y);
        }
      }
      canvasContext.stroke();

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }
}
