import { useState, useRef, useCallback, useEffect } from 'react';

interface AudioState {
    isRecording: boolean;
    isConnected: boolean;
    isPlaying: boolean;
    volume: number;
    error: string | null;
}

interface UseRealtimeAudioReturn {
    audioState: AudioState;
    startRecording: () => Promise<void>;
    stopRecording: () => void;
    startPlayback: (audioBlob: Blob) => void;
    stopPlayback: () => void;
    connect: () => Promise<void>;
    disconnect: () => void;
    sendAudioData: (audioData: Blob) => void;
}

export function useRealtimeAudio(): UseRealtimeAudioReturn {
    const [audioState, setAudioState] = useState<AudioState>({
        isRecording: false,
        isConnected: false,
        isPlaying: false,
        volume: 0,
        error: null,
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const websocketRef = useRef<WebSocket | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // WebSocket 연결
    const connect = useCallback(async () => {
        try {
            const wsUrl = 'ws://localhost:8080/ws';
            websocketRef.current = new WebSocket(wsUrl);

            websocketRef.current.onopen = () => {
                setAudioState(prev => ({ ...prev, isConnected: true, error: null }));
            };

            websocketRef.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'audio_response') {
                        // TTS 응답 처리
                        const audioBlob = new Blob([data.audioData], { type: 'audio/wav' });
                        startPlayback(audioBlob);
                    } else if (data.type === 'transcription') {
                        // 실시간 전사 결과 처리
                        console.log('Transcription:', data.text);
                    }
                } catch (error) {
                    console.error('WebSocket message parsing error:', error);
                }
            };

            websocketRef.current.onerror = (error) => {
                setAudioState(prev => ({
                    ...prev,
                    error: 'WebSocket 연결 오류가 발생했습니다.',
                    isConnected: false
                }));
            };

            websocketRef.current.onclose = () => {
                setAudioState(prev => ({ ...prev, isConnected: false }));
            };
        } catch (error) {
            setAudioState(prev => ({
                ...prev,
                error: '연결에 실패했습니다.',
                isConnected: false
            }));
        }
    }, []);

    const disconnect = useCallback(() => {
        if (websocketRef.current) {
            websocketRef.current.close();
            websocketRef.current = null;
        }
        setAudioState(prev => ({ ...prev, isConnected: false }));
    }, []);

    // 오디오 녹음 시작
    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                }
            });

            streamRef.current = stream;

            // 오디오 컨텍스트 설정 (볼륨 모니터링용)
            audioContextRef.current = new AudioContext();
            const source = audioContextRef.current.createMediaStreamSource(stream);
            analyserRef.current = audioContextRef.current.createAnalyser();
            analyserRef.current.fftSize = 256;
            source.connect(analyserRef.current);

            // MediaRecorder 설정
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus',
            });

            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                    // 실시간으로 오디오 데이터 전송
                    sendAudioData(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                console.log('Recording stopped, blob size:', audioBlob.size);
            };

            mediaRecorder.start(100); // 100ms마다 데이터 전송
            setAudioState(prev => ({ ...prev, isRecording: true, error: null }));

            // 볼륨 모니터링
            const monitorVolume = () => {
                if (analyserRef.current && audioState.isRecording) {
                    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
                    analyserRef.current.getByteFrequencyData(dataArray);
                    const volume = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
                    setAudioState(prev => ({ ...prev, volume }));
                    requestAnimationFrame(monitorVolume);
                }
            };
            monitorVolume();

        } catch (error) {
            setAudioState(prev => ({
                ...prev,
                error: '마이크 권한이 필요합니다.',
                isRecording: false
            }));
        }
    }, [audioState.isRecording]);

    // 오디오 녹음 중지
    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && audioState.isRecording) {
            mediaRecorderRef.current.stop();
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        setAudioState(prev => ({ ...prev, isRecording: false }));
    }, [audioState.isRecording]);

    // 오디오 재생 시작
    const startPlayback = useCallback((audioBlob: Blob) => {
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioElementRef.current = audio;

        audio.onplay = () => {
            setAudioState(prev => ({ ...prev, isPlaying: true }));
        };

        audio.onended = () => {
            setAudioState(prev => ({ ...prev, isPlaying: false }));
            URL.revokeObjectURL(audioUrl);
        };

        audio.onerror = () => {
            setAudioState(prev => ({
                ...prev,
                isPlaying: false,
                error: '오디오 재생 중 오류가 발생했습니다.'
            }));
        };

        audio.play().catch(error => {
            setAudioState(prev => ({
                ...prev,
                error: '오디오 재생에 실패했습니다.',
                isPlaying: false
            }));
        });
    }, []);

    // 오디오 재생 중지
    const stopPlayback = useCallback(() => {
        if (audioElementRef.current) {
            audioElementRef.current.pause();
            audioElementRef.current.currentTime = 0;
            setAudioState(prev => ({ ...prev, isPlaying: false }));
        }
    }, []);

    // 오디오 데이터 전송
    const sendAudioData = useCallback((audioData: Blob) => {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
            const reader = new FileReader();
            reader.onload = () => {
                const arrayBuffer = reader.result as ArrayBuffer;
                const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

                websocketRef.current?.send(JSON.stringify({
                    type: 'audio_data',
                    data: base64,
                    timestamp: Date.now()
                }));
            };
            reader.readAsArrayBuffer(audioData);
        }
    }, []);

    // 컴포넌트 언마운트 시 정리
    useEffect(() => {
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
            if (websocketRef.current) {
                websocketRef.current.close();
            }
            if (audioElementRef.current) {
                audioElementRef.current.pause();
            }
        };
    }, []);

    return {
        audioState,
        startRecording,
        stopRecording,
        startPlayback,
        stopPlayback,
        connect,
        disconnect,
        sendAudioData,
    };
}
