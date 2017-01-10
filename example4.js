/**
 * Example 4: Custom Waveform
 */
function example4(context) {
  var oscillator = context.createOscillator();
  var gain = context.createGain();

  // set the oscillator frequency
  oscillator.frequency.value = 220;

  // add a custom wave form (PWM)
  var pulseWidth = 0.15;
  var real = [0]
  var imag = [0]
  for (var i = 1; i < 8192; i++) {
    // Fourier coefficients. Calculus.
    var realTerm = 4 / (i * Math.PI) * Math.sin(Math.PI * i * pulseWidth)
    real.push(realTerm)
    imag.push(0)
  }
  var waveform = context.createPeriodicWave(new Float32Array(real), new Float32Array(imag));
  oscillator.setPeriodicWave(waveform);

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
