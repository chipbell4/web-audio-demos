function example5(context) {
  var oscillator = context.createOscillator();
  var filter = context.createBiquadFilter();
  var gain = context.createGain();

  // set up the oscillator
  oscillator.type = 'square';
  oscillator.frequency.value = 120;

  // set up the filter
  filter.type = 'lowpass';
  filter.frequency = 120;

  // set the volume
  gain.gain.value = 0.1;

  // connect nodes
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  // start the oscillator
  oscillator.start();

  // toggle lowpass filter
  var filterSettings = [500, 200];
  var pitches = [
    65, 65, 65, 78,
    78, 78, 78, 78,
    58, 58, 58, 65,
    65, 65, 65, 65];
  var currentNote = 0;
  setInterval(function() {
    filter.frequency.value = filterSettings[currentNote % filterSettings.length];

    // some fancy indexing on pitches to preserve the wobble + pitch changes
    var index = Math.floor(currentNote / 2) % pitches.length;
    var frequency = pitches[index]
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);

    currentNote += 1;
  }, 120);
}
