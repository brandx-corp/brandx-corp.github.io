// 이메일 유효성 검사
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 비밀번호 암호화 (실제 구현시에는 더 강력한 암호화 방식 사용 필요)
async function encryptPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// 로그인 상태 확인
function isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
}

// 로그인 처리
function login(token) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('authToken', token);
}

// 로그아웃 처리
function logout() {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken');
}
