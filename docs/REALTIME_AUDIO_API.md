# We:Grow RealTime Audio API

## WebSocket 연결

### 연결 URL
```
ws://localhost:8080/ws
```

### 메시지 형식

#### 클라이언트 → 서버

**오디오 데이터 전송**
```json
{
  "type": "audio_data",
  "data": "base64_encoded_audio_data",
  "timestamp": 1640995200000
}
```

**텍스트 메시지 전송**
```json
{
  "type": "text_message",
  "text": "안녕하세요",
  "timestamp": 1640995200000
}
```

#### 서버 → 클라이언트

**오디오 응답**
```json
{
  "type": "audio_response",
  "audioData": "base64_encoded_audio_data",
  "timestamp": 1640995200000
}
```

**전사 결과**
```json
{
  "type": "transcription",
  "text": "전사된 텍스트",
  "confidence": 0.95,
  "timestamp": 1640995200000
}
```

**TTS 응답**
```json
{
  "type": "tts_response",
  "audioData": "base64_encoded_audio_data",
  "text": "음성으로 변환된 텍스트",
  "timestamp": 1640995200000
}
```

## 에러 처리

### 클라이언트 에러
```json
{
  "type": "error",
  "code": "AUDIO_PROCESSING_FAILED",
  "message": "오디오 처리에 실패했습니다.",
  "timestamp": 1640995200000
}
```

### 서버 에러
```json
{
  "type": "error",
  "code": "STT_SERVICE_UNAVAILABLE",
  "message": "음성 인식 서비스를 사용할 수 없습니다.",
  "timestamp": 1640995200000
}
```
