const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL ?? "http://localhost:8000";

// JWT 토큰을 포함한 API 요청 헤더 생성
export function getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
}

// 인증이 필요한 API 요청을 위한 fetch 래퍼
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

    // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 boundary 설정)
    const headers: HeadersInit = {
        ...getAuthHeaders(),
        ...options.headers,
    };

    // body가 FormData가 아니고 Content-Type이 명시적으로 설정되지 않은 경우에만 application/json으로 설정
    if (!(options.body instanceof FormData) && !options.headers?.['Content-Type'] && !options.headers?.['content-type']) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(fullUrl, {
        ...options,
        headers,
    });

    // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }

    return response;
}

// API 엔드포인트 URL 생성
export function getApiUrl(endpoint: string): string {
    return `${API_BASE_URL}${endpoint}`;
}
