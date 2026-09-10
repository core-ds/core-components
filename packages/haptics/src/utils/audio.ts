import { type Vibration } from '../typings';

import { AUDIO_CLICK_DURATION_S, AUDIO_TOGGLE_MAX_MS, AUDIO_TOGGLE_MIN_MS } from './constants';
import { clamp } from './vibration';

type AudioGraph = {
    ctx: AudioContext;
    filter: BiquadFilterNode;
    gain: GainNode;
    noise: AudioBuffer;
};

let graph: AudioGraph | null = null;
let scheduled: AudioBufferSourceNode[] = [];

/** Звуковой импульс. */
const createNoise = (ctx: AudioContext): AudioBuffer => {
    const buffer = ctx.createBuffer(1, ctx.sampleRate * AUDIO_CLICK_DURATION_S, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / 25);
    }

    return buffer;
};

const ensureAudio = (): AudioGraph | null => {
    if (graph) {
        if (graph.ctx.state === 'suspended') graph.ctx.resume();

        return graph;
    }

    if (typeof AudioContext === 'undefined') return null;

    const ctx = new AudioContext();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    filter.type = 'bandpass';
    filter.Q.value = 8;
    filter.connect(gain);
    gain.connect(ctx.destination);

    graph = { ctx, filter, gain, noise: createNoise(ctx) };

    return graph;
};

const playClick = ({ ctx, filter, gain, noise }: AudioGraph, at: number, intensity: number) => {
    const baseFrequency = 2000 + intensity * 2000;
    const jitter = 1 + (Math.random() - 0.5) * 0.3;

    gain.gain.setValueAtTime(0.5 * intensity, at);
    filter.frequency.setValueAtTime(baseFrequency * jitter, at);

    const source = ctx.createBufferSource();

    source.buffer = noise;
    source.connect(filter);
    source.onended = () => {
        source.disconnect();
        scheduled = scheduled.filter((item) => item !== source);
    };
    source.start(at);

    scheduled.push(source);
};

/** Останавливает запланированные debug-щелчки. */
export const cancelHapticAudio = (): void => {
    const pending = scheduled;

    scheduled = [];
    pending.forEach((source) => {
        source.stop();
        source.disconnect();
    });
};

/**
 * Озвучивает паттерн вибрации щелчками: `delay` — тишина, `duration` — серия щелчков,
 * интервал между которыми уменьшается с ростом `intensity`.
 */
export const playHapticPattern = (vibrations: Vibration[], defaultIntensity: number): void => {
    const audio = ensureAudio();

    if (!audio) return;

    cancelHapticAudio();

    const start = audio.ctx.currentTime;
    let cursor = 0;

    for (const vibration of vibrations) {
        const intensity = clamp(vibration.intensity ?? defaultIntensity);
        const interval = (AUDIO_TOGGLE_MIN_MS + (1 - intensity) * AUDIO_TOGGLE_MAX_MS) / 1000;

        cursor += (vibration.delay ?? 0) / 1000;

        const end = cursor + vibration.duration / 1000;

        if (intensity > 0) {
            for (let at = cursor; at < end; at += interval) {
                playClick(audio, start + at, intensity);
            }
        }

        cursor = end;
    }
};
