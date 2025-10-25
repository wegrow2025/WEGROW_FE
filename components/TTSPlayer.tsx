import React, { useState } from 'react';
import { Play, Pause, Square, Volume2, Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useTTS } from '@/hooks/use-tts';
import { cn } from '@/lib/utils';

interface TTSPlayerProps {
    className?: string;
    defaultText?: string;
}

export function TTSPlayer({ className, defaultText = '' }: TTSPlayerProps) {
    const [text, setText] = useState(defaultText);
    const [showSettings, setShowSettings] = useState(false);
    const [ttsOptions, setTtsOptions] = useState({
        rate: 1,
        pitch: 1,
        volume: 1,
    });

    const {
        isSupported,
        isSpeaking,
        isPaused,
        voices,
        currentVoice,
        error,
        speak,
        pause,
        resume,
        stop,
        setVoice,
        refreshVoices,
    } = useTTS(ttsOptions);

    const handleSpeak = () => {
        if (text.trim()) {
            speak(text);
        }
    };

    const handleTogglePlayPause = () => {
        if (isSpeaking && !isPaused) {
            pause();
        } else if (isSpeaking && isPaused) {
            resume();
        } else {
            handleSpeak();
        }
    };

    const handleStop = () => {
        stop();
    };

    const handleVoiceChange = (voiceName: string) => {
        setVoice(voiceName);
    };

    const handleOptionChange = (key: string, value: number) => {
        setTtsOptions(prev => ({ ...prev, [key]: value }));
    };

    const getStatusText = () => {
        if (isSpeaking && !isPaused) return '재생 중';
        if (isSpeaking && isPaused) return '일시정지';
        return '대기 중';
    };

    const getStatusColor = () => {
        if (isSpeaking && !isPaused) return 'bg-green-500';
        if (isSpeaking && isPaused) return 'bg-yellow-500';
        return 'bg-gray-400';
    };

    if (!isSupported) {
        return (
            <Card className={className}>
                <CardContent className="pt-6">
                    <Alert variant="destructive">
                        <AlertDescription>
                            이 브라우저는 TTS(Text-to-Speech)를 지원하지 않습니다.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className={cn('space-y-4', className)}>
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Volume2 className="h-5 w-5" />
                        TTS (Text-to-Speech)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 텍스트 입력 */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">텍스트 입력</label>
                        <Textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="음성으로 변환할 텍스트를 입력하세요..."
                            className="min-h-[100px]"
                        />
                    </div>

                    {/* 오류 메시지 */}
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {/* 컨트롤 버튼 */}
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={handleTogglePlayPause}
                            disabled={!text.trim()}
                            className="flex-1"
                        >
                            {isSpeaking && !isPaused ? (
                                <Pause className="h-4 w-4 mr-2" />
                            ) : (
                                <Play className="h-4 w-4 mr-2" />
                            )}
                            {isSpeaking && !isPaused ? '일시정지' : '재생'}
                        </Button>

                        <Button
                            onClick={handleStop}
                            disabled={!isSpeaking}
                            variant="outline"
                        >
                            <Square className="h-4 w-4 mr-2" />
                            중지
                        </Button>

                        <Button
                            onClick={() => setShowSettings(!showSettings)}
                            variant="outline"
                            size="icon"
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* 상태 표시 */}
                    <div className="flex items-center gap-2">
                        <div className={cn('w-2 h-2 rounded-full', getStatusColor())} />
                        <span className="text-sm text-muted-foreground">{getStatusText()}</span>
                        {currentVoice && (
                            <Badge variant="secondary" className="ml-auto">
                                {currentVoice.name}
                            </Badge>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* 설정 패널 */}
            {showSettings && (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">TTS 설정</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* 음성 선택 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">음성 선택</label>
                            <div className="flex gap-2">
                                <Select value={currentVoice?.name} onValueChange={handleVoiceChange}>
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder="음성을 선택하세요" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {voices.map((voice) => (
                                            <SelectItem key={voice.name} value={voice.name}>
                                                {voice.name} ({voice.lang})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button
                                    onClick={refreshVoices}
                                    variant="outline"
                                    size="icon"
                                >
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* 속도 조절 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                속도: {ttsOptions.rate.toFixed(1)}x
                            </label>
                            <Slider
                                value={[ttsOptions.rate]}
                                onValueChange={([value]) => handleOptionChange('rate', value)}
                                min={0.5}
                                max={2}
                                step={0.1}
                                className="w-full"
                            />
                        </div>

                        {/* 피치 조절 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                피치: {ttsOptions.pitch.toFixed(1)}
                            </label>
                            <Slider
                                value={[ttsOptions.pitch]}
                                onValueChange={([value]) => handleOptionChange('pitch', value)}
                                min={0.5}
                                max={2}
                                step={0.1}
                                className="w-full"
                            />
                        </div>

                        {/* 볼륨 조절 */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                볼륨: {Math.round(ttsOptions.volume * 100)}%
                            </label>
                            <Slider
                                value={[ttsOptions.volume]}
                                onValueChange={([value]) => handleOptionChange('volume', value)}
                                min={0}
                                max={1}
                                step={0.1}
                                className="w-full"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* 미리 정의된 텍스트 버튼들 */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="text-base">빠른 텍스트</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                        {[
                            '안녕하세요!',
                            '오늘 날씨가 좋네요.',
                            '도움이 필요하시면 말씀해주세요.',
                            '잘했어요!',
                            '다음에 또 만나요.',
                            '감사합니다!'
                        ].map((quickText, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => setText(quickText)}
                                className="text-left justify-start"
                            >
                                {quickText}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
