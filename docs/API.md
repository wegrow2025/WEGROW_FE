# We:Grow API

## 1. 사용자 관리 API

### POST /api/auth/register
- **요청 데이터**: 
  - `email`: 이메일
  - `password`: 비밀번호
  - `childAge`: 아이 월령 (18개월 등)

### POST /api/auth/login
- **요청 데이터**: 
  - `email`: 이메일
  - `password`: 비밀번호

### PUT /api/user/profile
- **요청 데이터**: 
  - `email`: 이메일 변경
  - `childAge`: 아이 월령 변경
  - `password`: 비밀번호 변경

## 2. 음성 데이터 관리 API

### POST /api/audio/upload
- **요청 데이터**: 
  - `audioFile`: 음성 파일 (MP3, WAV, M4A)
  - `duration`: 녹음 시간
  - `source`: "parent" | "robot" (부모 업로드 vs 로봇 자동 수집)
  - `notes`: 메모 (선택사항)

### GET /api/audio/samples
- **응답 데이터**: 
  - `samples[]`: 음성 샘플 목록
    - `id`: 샘플 ID
    - `timestamp`: 시간
    - `duration`: 길이
    - `source`: 수집 방식
    - `status`: "분석 완료" | "분석 중"
    - `notes`: 메모

### DELETE /api/audio/samples/:id
- **요청 데이터**: 샘플 ID

### POST /api/audio/samples/:id/reanalyze
- **요청 데이터**: 샘플 ID

## 3. 일일 리포트 API

### GET /api/dashboard/daily-report
- **응답 데이터**:
  - `vocalizations`: 총 옹알이 수
  - `syllableCombinations`: 음절 조합 수
  - `meaningfulAttempts`: 의미 있는 시도 수
  - `newWords`: 새로운 단어 수
  - `previousDay`: 전날 데이터 (비교용)

### GET /api/dashboard/age-comparison
- **응답 데이터**:
  - `vocalizationScore`: 음성 발성 점수 (75%)
  - `wordUnderstandingScore`: 단어 이해 점수 (55%)
  - `communicationScore`: 의사소통 시도 점수 (65%)

## 4. 타임라인 API

### GET /api/timeline
- **쿼리 파라미터**:
  - `date`: 날짜 필터
  - `intent`: 의도 필터 ("요청", "부르기", "모방")
- **응답 데이터**:
  - `timeline[]`: 타임라인 항목
    - `timestamp`: 시간
    - `childSpeech`: 아이 발화 ("까까")
    - `intent`: 의도 분석 ("물품 요청")
    - `parentSuggestion`: 부모 권장 반응

## 5. 성장 분석 API

### GET /api/growth/analysis
- **쿼리 파라미터**:
  - `period`: "week" | "month" (주간/월간)
- **응답 데이터**:
  - `syllableGrowth`: 음절 조합 증가율 (+12%)
  - `meaningfulGrowth`: 의미 있는 시도 증가율 (+8%)
  - `totalInteractions`: 총 상호작용 수 (127회)
  - `highlights`: 주간 하이라이트 텍스트
  - `ageComparison`: 월령 기준 비교 데이터

## 6. 팁 & 코칭 API

### GET /api/tips
- **쿼리 파라미터**:
  - `level`: 발달 단계 필터
- **응답 데이터**:
  - `tips[]`: 팁 목록
    - `id`: 팁 ID
    - `level`: 발달 단계
    - `scenario`: 아이 상황
    - `parentResponse`: 권장 부모 반응
    - `explanation`: 설명

### POST /api/tips/:id/favorite
- **요청 데이터**: 팁 ID

## 7. 설정 API

### GET /api/settings
- **응답 데이터**:
  - `recordingCollection`: 음성 데이터 저장 동의
  - `analysisUsage`: 분석 사용 동의
  - `coachingRecommendations`: 코칭 추천 동의
  - `notificationsEnabled`: 인앱 알림 설정
  - `emailReports`: 이메일 리포트 설정

### PUT /api/settings
- **요청 데이터**: 위 설정값들

### DELETE /api/user/data
- **요청 데이터**: 모든 데이터 삭제

## 8. 실시간 알림 API

### GET /api/notifications
- **응답 데이터**:
  - `notifications[]`: 알림 목록
    - `type`: 알림 타입
    - `message`: 알림 메시지
    - `timestamp`: 시간

## 9. 통계 API

### GET /api/stats/overview
- **응답 데이터**:
  - `robotSamples`: 로봇 자동 수집 샘플 수 (14개)
  - `parentSamples`: 부모 업로드 샘플 수 (3개)
  - `analyzedSamples`: 분석 완료 샘플 수 (16개)
