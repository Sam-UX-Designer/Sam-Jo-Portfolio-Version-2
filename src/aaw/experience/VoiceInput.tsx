import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Speak a goal instead of typing it. The app's own control
 * (apps/web/components/world/VoiceInput.tsx): the browser's speech
 * recognition, so nothing leaves the device through this site. Hidden where
 * the browser has none.
 */

type RecognitionState = 'unsupported' | 'idle' | 'listening' | 'denied';

interface SpeechRecognitionLike {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
}

function recognitionConstructor(): (new () => SpeechRecognitionLike) | null {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export default function VoiceInput({
  onTranscript,
  onFinal,
}: {
  onTranscript: (text: string) => void;
  onFinal: (text: string) => void;
}) {
  const [state, setState] = useState<RecognitionState>(() => (recognitionConstructor() ? 'idle' : 'unsupported'));
  const recognition = useRef<SpeechRecognitionLike | null>(null);
  const finalText = useRef('');

  useEffect(() => {
    const Recognition = recognitionConstructor();
    if (!Recognition) return;

    const instance = new Recognition();
    instance.continuous = true;
    instance.interimResults = true;
    instance.lang = navigator.language || 'en-US';

    instance.onresult = (event) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        const alternative = result?.[0];
        if (!result || !alternative) continue;
        if (result.isFinal) finalText.current += alternative.transcript;
        else interim += alternative.transcript;
      }
      onTranscript((finalText.current + interim).trim());
    };
    instance.onerror = (event) => {
      setState(event.error === 'not-allowed' || event.error === 'service-not-allowed' ? 'denied' : 'idle');
    };
    instance.onend = () => {
      setState((current) => (current === 'listening' ? 'idle' : current));
      const settled = finalText.current.trim();
      if (settled) onFinal(settled);
      finalText.current = '';
    };

    recognition.current = instance;
    return () => {
      instance.onresult = null;
      instance.onerror = null;
      instance.onend = null;
      instance.abort();
    };
  }, [onTranscript, onFinal]);

  const toggle = useCallback(() => {
    const instance = recognition.current;
    if (!instance) return;
    if (state === 'listening') {
      instance.stop();
      setState('idle');
      return;
    }
    finalText.current = '';
    try {
      instance.start();
    } catch {
      // Already started: keep listening.
    }
    setState('listening');
  }, [state]);

  if (state === 'unsupported') return null;
  const listening = state === 'listening';

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={state === 'denied'}
      aria-pressed={listening}
      aria-label={listening ? 'Stop listening' : 'Speak your goal'}
      title={state === 'denied' ? 'Microphone blocked. Allow it in your browser settings.' : listening ? 'Stop listening' : 'Speak your goal'}
      style={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        cursor: state === 'denied' ? 'not-allowed' : 'pointer',
        border: '1px solid rgb(255 255 255 / 0.12)',
        background: listening ? 'var(--color-danger)' : 'rgb(255 255 255 / 0.08)',
        color: listening ? '#fff' : 'var(--color-text)',
        opacity: state === 'denied' ? 0.4 : 1,
        transition: 'background 160ms',
      }}
    >
      {listening ? (
        <span aria-hidden="true" style={{ width: 12, height: 12, borderRadius: 3, background: '#fff' }} />
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M19 11a7 7 0 0 1-14 0M12 18v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
