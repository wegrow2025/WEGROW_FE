import { Layout } from "@/components/Layout";
import { Upload as UploadIcon, Mic, X, CheckCircle, Bot, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { RealtimeAudio } from "@/components/RealtimeAudio";
import { TTSPlayer } from "@/components/TTSPlayer";
import { authenticatedFetch } from "@/lib/api";

interface AudioSample {
  id: string;
  timestamp: string;
  duration: number;
  source: string;
  status: string;
  notes: string;
  audioUrl?: string;
  analysisResult?: {
    transcription: string;
    intent: string;
    confidence: number;
    recommendedResponse: string;
  };
}

interface Statistics {
  robotCollected: number;
  parentUploaded: number;
  analysisCompleted: number;
}

// API_BASE_URL은 더 이상 필요하지 않음 (authenticatedFetch 사용)

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'realtime' | 'tts'>('upload');
  const [samples, setSamples] = useState<AudioSample[]>([]);
  const [statistics, setStatistics] = useState<Statistics>({
    robotCollected: 0,
    parentUploaded: 0,
    analysisCompleted: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchSamplesData();
  }, []);

  const fetchSamplesData = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch('/api/audio/samples');

      if (!response.ok) {
        throw new Error('음성 샘플 데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      setSamples(data.samples || []);
      setStatistics(data.statistics || {
        robotCollected: 0,
        parentUploaded: 0,
        analysisCompleted: 0
      });
    } catch (err) {
      console.error('Samples data fetch error:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('audioFile', file);
      formData.append('source', 'parent');
      formData.append('duration', '0'); // Will be calculated on server

      const response = await authenticatedFetch('/api/audio/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('파일 업로드에 실패했습니다.');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Refresh samples data
      await fetchSamplesData();
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : '업로드 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteSample = async (id: string) => {
    try {
      const response = await authenticatedFetch(`/api/audio/samples/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchSamplesData();
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleReanalyzeSample = async (id: string) => {
    try {
      const response = await authenticatedFetch(`/api/audio/samples/${id}/reanalyze`, {
        method: 'POST'
      });

      if (response.ok) {
        await fetchSamplesData();
      }
    } catch (err) {
      console.error('Reanalyze error:', err);
    }
  };

  if (loading) {
    return (
      <Layout showNav={true}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">음성 데이터를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout showNav={true}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={fetchSamplesData}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showNav={true}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
            <Mic size={32} className="text-primary" />
            녹음 / 업로드
          </h1>
          <p className="text-muted-foreground">
            아이 음성 데이터를 업로드하고 실시간으로 로봇과 소통하세요
          </p>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'upload'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <UploadIcon className="inline w-4 h-4 mr-2" />
            파일 업로드
          </button>
          <button
            onClick={() => setActiveTab('realtime')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'realtime'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Bot className="inline w-4 h-4 mr-2" />
            실시간 통신
          </button>
          <button
            onClick={() => setActiveTab('tts')}
            className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition ${activeTab === 'tts'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            <Volume2 className="inline w-4 h-4 mr-2" />
            TTS 테스트
          </button>
        </div>

        {/* 탭별 콘텐츠 */}
        {activeTab === 'upload' && (
          <div className="bg-card rounded-2xl p-8 border-2 border-dashed border-primary/30 hover:border-primary/60 transition">
            <div
              className={`space-y-6 text-center cursor-pointer ${dragActive ? "opacity-75" : ""
                }`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDrop={() => setDragActive(false)}
            >
              <div className="space-y-2">
                <div className="text-5xl">🎙️</div>
                <h3 className="text-xl font-semibold text-foreground">
                  음성 파일을 드래그하세요
                </h3>
                <p className="text-muted-foreground">또는 클릭해서 선택</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2">
                  <UploadIcon size={20} />
                  파일 선택
                </button>
                <button className="px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary/5 transition flex items-center justify-center gap-2">
                  <Mic size={20} />
                  녹음하기
                </button>
              </div>

              <p className="text-xs text-muted-foreground pt-4">
                지원 형식: MP3, WAV, M4A (최대 30초)
              </p>
            </div>
          </div>
        )}

        {activeTab === 'realtime' && (
          <RealtimeAudio />
        )}

        {activeTab === 'tts' && (
          <TTSPlayer defaultText="안녕하세요! 로봇과 대화해보세요." />
        )}

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">로봇 자동 수집</p>
            <p className="text-2xl font-bold text-primary">14개</p>
          </div>
          <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/20">
            <p className="text-sm text-muted-foreground mb-2">부모 업로드</p>
            <p className="text-2xl font-bold text-secondary">3개</p>
          </div>
          <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">분석 완료</p>
            <p className="text-2xl font-bold text-accent-foreground">16개</p>
          </div>
        </div>

        {/* Samples List */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg text-foreground">
            최근 샘플 (17개)
          </h3>

          {samples.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">음성 샘플이 없습니다.</p>
            </div>
          ) : (
            samples.map((sample) => (
              <div
                key={sample.id}
                className="bg-card rounded-xl p-6 border hover:border-primary/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-primary">
                      {sample.timestamp}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {sample.duration}초 • {sample.source}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${sample.status === "분석 완료"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent-foreground"
                        }`}
                    >
                      {sample.status === "분석 완료" && (
                        <>
                          <CheckCircle size={14} className="inline mr-1" />
                          {sample.status}
                        </>
                      )}
                      {sample.status !== "분석 완료" && sample.status}
                    </span>
                  </div>
                </div>

                {/* Waveform Preview */}
                <div className="bg-muted/50 rounded-lg p-3 mb-4 h-12 flex items-center justify-between">
                  <div className="flex gap-1 items-center flex-1">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-primary/60 rounded-sm flex-1"
                        style={{
                          height: `${Math.random() * 100}%`,
                          minHeight: "2px",
                        }}
                      />
                    ))}
                  </div>
                  <button className="ml-4 p-2 hover:bg-muted rounded-lg text-primary">
                    ▶️
                  </button>
                </div>

                {/* Notes */}
                <input
                  type="text"
                  placeholder="메모 추가 (예: 잠꼬대, 배경음, 형/누나 음성)"
                  defaultValue={sample.notes}
                  className="w-full px-3 py-2 text-sm rounded-lg border bg-background text-foreground placeholder-muted-foreground"
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleReanalyzeSample(sample.id)}
                    className="text-xs px-3 py-1 rounded-lg text-primary border border-primary/30 hover:bg-primary/5 transition"
                  >
                    분석 다시 실행
                  </button>
                  <button
                    onClick={() => handleDeleteSample(sample.id)}
                    className="text-xs px-3 py-1 rounded-lg text-muted-foreground border hover:bg-muted transition ml-auto"
                  >
                    <X size={14} className="inline" /> 삭제
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Privacy Note */}
        <div className="bg-muted/50 rounded-xl p-6 border">
          <h4 className="font-semibold text-foreground mb-2">
            🔒 데이터 보안
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            모든 음성 데이터는 암호화되어 저장되며, 부모님이 언제든지 삭제할
            수 있습니다. 각 샘플에 메모를 남기면 분석에서 제외하도록
            표시할 수 있습니다.
          </p>
        </div>
      </div>
    </Layout>
  );
}