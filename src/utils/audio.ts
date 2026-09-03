// Brutalist Web Audio Synthesizer - Completely Disabled per User Request

class BrutalistAudioEngine {
  public isMuted: boolean = true;

  playConcreteThud() {}
  playHydraulicHiss() {}
  playMechanicalClick() {}
  playFrequencySweep() {}

  toggleMute(): boolean {
    return true;
  }
}

export const brutalistAudio = new BrutalistAudioEngine();
