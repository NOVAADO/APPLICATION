/**
 * Sons du timer - Web Audio API
 *
 * Utilise la synthèse audio native pour éviter les fichiers externes.
 * Sons doux et non-intrusifs, adaptés au contexte bien-être.
 */

let audioContext: AudioContext | null = null;

/**
 * Initialise le contexte audio (doit être appelé après interaction utilisateur)
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    } catch {
      console.warn("Web Audio API non supportée");
      return null;
    }
  }

  // Reprendre si suspendu (politique autoplay des navigateurs)
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

/**
 * Joue une note douce (synthèse sinusoïdale)
 */
function playTone(
  frequency: number,
  duration: number,
  volume: number = 0.3
): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  // Enveloppe douce (fade in/out)
  const now = ctx.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(volume, now + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, now + duration);

  oscillator.start(now);
  oscillator.stop(now + duration);
}

/**
 * Son de début de phase "Prépare" - note basse douce
 */
export function playPrepareSound(): void {
  playTone(440, 0.4, 0.25); // La4, 400ms
}

/**
 * Son de début de phase "Technique" - deux notes ascendantes
 */
export function playTechniqueSound(): void {
  playTone(523, 0.3, 0.25); // Do5
  setTimeout(() => playTone(659, 0.4, 0.25), 150); // Mi5
}

/**
 * Son de début de phase "Cooldown" - note descendante apaisante
 */
export function playCooldownSound(): void {
  playTone(392, 0.5, 0.2); // Sol4
}

/**
 * Son de fin - accord doux
 */
export function playCompleteSound(): void {
  playTone(523, 0.6, 0.2); // Do5
  setTimeout(() => playTone(659, 0.6, 0.2), 100); // Mi5
  setTimeout(() => playTone(784, 0.8, 0.2), 200); // Sol5
}

/**
 * Joue le son correspondant à une phase du timer
 */
export function playPhaseSound(
  phase: "prepare" | "technique" | "cooldown" | "done"
): void {
  switch (phase) {
    case "prepare":
      playPrepareSound();
      break;
    case "technique":
      playTechniqueSound();
      break;
    case "cooldown":
      playCooldownSound();
      break;
    case "done":
      playCompleteSound();
      break;
  }
}
