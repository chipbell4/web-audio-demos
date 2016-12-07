function example2(context) {
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  // set up the oscillator
  oscillator.type = 'square';
  oscillator.frequency.value = 220;

  // set the volume
  gain.gain.value = 0.1;

  // connect nodes
  oscillator.connect(gain);
  gain.connect(context.destination);

  // start the oscillator
  oscillator.start();

  // toggle gain to make it beep
  setInterval(function() {
    if(gain.gain.value > 0) {
      gain.gain.value = 0;
    } else {
      gain.gain.value = 0.1;
    }
  }, 250);
}
