import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX, Wifi, WifiOff, Play, Square, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useRealtimeAudio } from '@/hooks/use-realtime-audio';
import { cn } from '@/lib/utils';

interface RealtimeAudioProps {
    className?: string;
}

export function RealtimeAudio({ className }: RealtimeAudioProps) {
    const {
        audioState,
        startRecording,
        stopRecording,
        startPlayback,
        stopPlayback,
        connect,
        disconnect,
    } = useRealtimeAudio();

    const [transcription, setTranscription] = useState<string>('');
    const [isConnecting, setIsConnecting] = useState(false);

    // 연결 상태에 따른 자동 연결/해제
    useEffect(() => {
        if (!audioState.isConnected && !isConnecting) {
            handleConnect();
        }
    }, []);

    const handleConnect = async () => {
        setIsConnecting(true);
        try {
            await connect();
        } catch (error) {
            console.error('Connection failed:', error);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = () => {
        disconnect();
        setTranscription('');
    };

    const handleToggleRecording = async () => {
        if (audioState.isRecording) {
            stopRecording();
        } else {
            try {
                await startRecording();
            } catch (error) {
                console.error('Recording failed:', error);
            }
        }
    };

    const getConnectionStatus = () => {
        if (isConnecting) return '연결 중...';
        if (audioState.isConnected) return '연결됨';
        return '연결 안됨';
    };

    const getRecordingStatus = () => {
        if (audioState.isRecording) return '녹음 중';
        return '대기 중';
    };

    return (
        <div className={cn('space-y-4', className)}>
            {/* 연결 상태 카드 */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        실시간 음성 통신
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 연결 상태 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {audioState.isConnected ? (
                                <Wifi className="h-4 w-4 text-green-500" />
                            ) : (
                                <WifiOff className="h-4 w-4 text-red-500" />
                            )}
                            <span className="text-sm font-medium">{getConnectionStatus()}</span>
                        </div>
                        <div className="flex gap-2">
                            {!audioState.isConnected ? (
                                <Button
                                    size="sm"
                                    onClick={handleConnect}
                                    disabled={isConnecting}
                                    variant="outline"
                                >
                                    연결
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={handleDisconnect}
                                    variant="outline"
                                >
                                    연결 해제
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* 오류 메시지 */}
                    {audioState.error && (
                        <Alert variant="destructive">
                            <AlertDescription>{audioState.error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* 녹음 컨트롤 카드 */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        음성 녹음
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 녹음 상태 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Badge variant={audioState.isRecording ? 'destructive' : 'secondary'}>
                                {getRecordingStatus()}
                            </Badge>
                            {audioState.isRecording && (
                                <div className="flex items-center gap-2">
                                    <Volume2 className="h-4 w-4 text-green-500" />
                                    <span className="text-sm text-muted-foreground">
                                        볼륨: {Math.round(audioState.volume)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 볼륨 바 */}
                    {audioState.isRecording && (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Volume2 className="h-4 w-4" />
                                <span className="text-sm">음성 레벨</span>
                            </div>
                            <Progress
                                value={audioState.volume}
                                className="h-2"
                                max={100}
                            />
                        </div>
                    )}

                    {/* 녹음 버튼 */}
                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            onClick={handleToggleRecording}
                            disabled={!audioState.isConnected}
                            className={cn(
                                'h-16 w-16 rounded-full',
                                audioState.isRecording
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-primary hover:bg-primary/90'
                            )}
                        >
                            {audioState.isRecording ? (
                                <MicOff className="h-6 w-6" />
                            ) : (
                                <Mic className="h-6 w-6" />
                            )}
                        </Button>
                    </div>

                    {/* 녹음 안내 */}
                    <div className="text-center text-sm text-muted-foreground">
                        {audioState.isRecording
                            ? '녹음 중입니다. 말씀해주세요.'
                            : '녹음 버튼을 눌러 음성을 시작하세요.'
                        }
                    </div>
                </CardContent>
            </Card>

            {/* 재생 컨트롤 카드 */}
            <Card>
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5" />
                        로봇 응답
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* 재생 상태 */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            {audioState.isPlaying ? (
                                <Volume2 className="h-4 w-4 text-blue-500" />
                            ) : (
                                <VolumeX className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className="text-sm font-medium">
                                {audioState.isPlaying ? '재생 중' : '대기 중'}
                            </span>
                        </div>
                    </div>

                    {/* 재생 컨트롤 */}
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            onClick={startPlayback}
                            disabled={audioState.isPlaying}
                            variant="outline"
                        >
                            <Play className="h-4 w-4 mr-2" />
                            재생
                        </Button>
                        <Button
                            size="sm"
                            onClick={stopPlayback}
                            disabled={!audioState.isPlaying}
                            variant="outline"
                        >
                            <Square className="h-4 w-4 mr-2" />
                            중지
                        </Button>
                    </div>

                    {/* 전사 결과 */}
                    {transcription && (
                        <div className="space-y-2">
                            <div className="text-sm font-medium">전사 결과:</div>
                            <div className="p-3 bg-muted rounded-lg text-sm">
                                {transcription}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* 실시간 상태 표시 */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                'w-2 h-2 rounded-full',
                                audioState.isConnected ? 'bg-green-500' : 'bg-red-500'
                            )} />
                            <span>연결 상태</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                'w-2 h-2 rounded-full',
                                audioState.isRecording ? 'bg-red-500' : 'bg-gray-400'
                            )} />
                            <span>녹음 상태</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                'w-2 h-2 rounded-full',
                                audioState.isPlaying ? 'bg-blue-500' : 'bg-gray-400'
                            )} />
                            <span>재생 상태</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={cn(
                                'w-2 h-2 rounded-full',
                                audioState.volume > 0 ? 'bg-green-500' : 'bg-gray-400'
                            )} />
                            <span>음성 감지</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
