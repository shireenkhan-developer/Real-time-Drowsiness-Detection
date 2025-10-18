/**
 * Audio alarm utility using Web Audio API
 * Creates a beeping sound for drowsiness alerts
 */

let audioContext: AudioContext | null = null;
let oscillator: OscillatorNode | null = null;
let isPlaying = false;
let beepInterval: NodeJS.Timeout | null = null;

/**
 * Initialize audio context (must be called after user interaction)
 */
export function initAudio() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioContextClass();
  }
}

/**
 * Play a single beep sound
 */
function playBeep() {
  if (!audioContext) {
    initAudio();
  }

  if (!audioContext) return;

  // Create oscillator for beep sound
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  // Configure beep sound
  osc.type = "sine"; // Sine wave for smooth beep
  osc.frequency.value = 800; // 800 Hz frequency

  // Configure volume envelope (fade in/out for smoother sound)
  gain.gain.setValueAtTime(0, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.05); // Fade in
  gain.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3); // Fade out

  // Connect nodes
  osc.connect(gain);
  gain.connect(audioContext.destination);

  // Play beep for 300ms
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + 0.3);
}

/**
 * Start continuous beeping alarm
 */
export function startAlarm() {
  if (isPlaying) return;

  console.log("🚨 Starting alarm...");
  isPlaying = true;

  // Play first beep immediately
  playBeep();

  // Then beep every 1 second
  beepInterval = setInterval(() => {
    playBeep();
  }, 1000);
}

/**
 * Stop the alarm
 */
export function stopAlarm() {
  if (!isPlaying) return;

  console.log("✅ Stopping alarm");
  isPlaying = false;

  // Clear interval
  if (beepInterval) {
    clearInterval(beepInterval);
    beepInterval = null;
  }

  // Stop any currently playing sounds
  if (oscillator) {
    try {
      oscillator.stop();
    } catch {
      // Ignore if already stopped
    }
    oscillator = null;
  }
}

/**
 * Check if alarm is currently playing
 */
export function isAlarmPlaying(): boolean {
  return isPlaying;
}

/**
 * Cleanup audio resources
 */
export function disposeAudio() {
  stopAlarm();
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
}

