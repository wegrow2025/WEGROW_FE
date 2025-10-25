import { useState, useCallback, useRef } from 'react';

interface TTSOptions {
    voice?: string;
    rate?: number;
    pitch?: number;
    volume?: number;
    lang?: string;
}

interface TTSState {
    isSupported: boolean;
    isSpeaking: boolean;
    isPaused: boolean;
    voices: SpeechSynthesisVoice[];
    currentVoice: SpeechSynthesisVoice | null;
    error: string | null;
}

export function useTTS(options: TTSOptions = {}) {
    const [ttsState, setTtsState] = useState<TTSState>({
        isSupported: 'speechSynthesis' in window,
        isSpeaking: false,
        isPaused: false,
        voices: [],
        currentVoice: null,
        error: null,
    });

    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // 음성 목록 로드
    const loadVoices = useCallback(() => {
        if (!ttsState.isSupported) return;

        const voices = speechSynthesis.getVoices();
        const koreanVoices = voices.filter(voice =>
            voice.lang.startsWith('ko') || voice.lang.includes('Korean')
        );

        setTtsState(prev => ({
            ...prev,
            voices: koreanVoices.length > 0 ? koreanVoices : voices,
            currentVoice: koreanVoices[0] || voices[0] || null,
        }));
    }, [ttsState.isSupported]);

    // 음성 변경
    const setVoice = useCallback((voiceName: string) => {
        const voice = ttsState.voices.find(v => v.name === voiceName);
        if (voice) {
            setTtsState(prev => ({ ...prev, currentVoice: voice }));
        }
    }, [ttsState.voices]);

    // 텍스트를 음성으로 변환
    const speak = useCallback((text: string) => {
        if (!ttsState.isSupported) {
            setTtsState(prev => ({
                ...prev,
                error: 'TTS가 지원되지 않는 브라우저입니다.'
            }));
            return;
        }

        // 이전 음성 중지
        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // 음성 설정
        if (ttsState.currentVoice) {
            utterance.voice = ttsState.currentVoice;
        }
        utterance.rate = options.rate || 1;
        utterance.pitch = options.pitch || 1;
        utterance.volume = options.volume || 1;
        utterance.lang = options.lang || 'ko-KR';

        // 이벤트 핸들러
        utterance.onstart = () => {
            setTtsState(prev => ({
                ...prev,
                isSpeaking: true,
                isPaused: false,
                error: null
            }));
        };

        utterance.onend = () => {
            setTtsState(prev => ({
                ...prev,
                isSpeaking: false,
                isPaused: false
            }));
        };

        utterance.onerror = (event) => {
            setTtsState(prev => ({
                ...prev,
                isSpeaking: false,
                error: `TTS 오류: ${event.error}`
            }));
        };

        utterance.onpause = () => {
            setTtsState(prev => ({ ...prev, isPaused: true }));
        };

        utterance.onresume = () => {
            setTtsState(prev => ({ ...prev, isPaused: false }));
        };

        // 음성 재생 시작
        speechSynthesis.speak(utterance);
    }, [ttsState.isSupported, ttsState.currentVoice, options]);

    // 음성 일시정지
    const pause = useCallback(() => {
        if (ttsState.isSpeaking && !ttsState.isPaused) {
            speechSynthesis.pause();
        }
    }, [ttsState.isSpeaking, ttsState.isPaused]);

    // 음성 재개
    const resume = useCallback(() => {
        if (ttsState.isSpeaking && ttsState.isPaused) {
            speechSynthesis.resume();
        }
    }, [ttsState.isSpeaking, ttsState.isPaused]);

    // 음성 중지
    const stop = useCallback(() => {
        speechSynthesis.cancel();
        setTtsState(prev => ({
            ...prev,
            isSpeaking: false,
            isPaused: false
        }));
    }, []);

    // 음성 목록 새로고침
    const refreshVoices = useCallback(() => {
        loadVoices();
    }, [loadVoices]);

    // 컴포넌트 마운트 시 음성 목록 로드
    useState(() => {
        if (ttsState.isSupported) {
            loadVoices();

            // 음성 목록이 비동기적으로 로드될 수 있으므로 이벤트 리스너 추가
            const handleVoicesChanged = () => {
                loadVoices();
            };

            speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

            return () => {
                speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
                speechSynthesis.cancel();
            };
        }
    });

    return {
        ...ttsState,
        speak,
        pause,
        resume,
        stop,
        setVoice,
        refreshVoices,
    };
}
