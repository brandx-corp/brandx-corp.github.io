function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    const handleMenuClick = (e) => {
        if (!isAuthenticated()) {
            e.preventDefault();
            window.location.href = '/login';
        }
    };

    return e('div', { className: 'flex h-screen bg-gray-100' },
        // Sidebar (인증된 사용자만 표시)
        isAuthenticated() && e('div', { className: `bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300` },
            e('div', { className: 'p-4 flex items-center justify-between' },
                e('h1', { className: `font-bold ${isSidebarOpen ? 'block' : 'hidden'}` }, '모델 계약 관리'),
                e('button', {
                    onClick: () => setIsSidebarOpen(!isSidebarOpen),
                    className: 'p-2 hover:bg-gray-700 rounded'
                }, '☰')
            ),
            e('nav', { className: 'mt-4' },
                e('a', { href: '#', className: 'flex items-center p-4 hover:bg-gray-700', onClick: handleMenuClick },
                    e('span', { className: 'mr-2' }, '👥'),
                    e('span', { className: `${isSidebarOpen ? 'block' : 'hidden'}` }, '모델 리스트')
                ),
                e('a', { href: '#', className: 'flex items-center p-4 hover:bg-gray-700', onClick: handleMenuClick },
                    e('span', { className: 'mr-2' }, '🛍️'),
                    e('span', { className: `${isSidebarOpen ? 'block' : 'hidden'}` }, '상품 리스트')
                )
            )
        ),

        // Main Content
        e('div', { className: 'flex-1 overflow-auto' },
            isAuthenticated() ? (
                // 인증된 사용자용 콘텐츠
                e(React.Fragment, null,
                    e('header', { className: 'bg-white shadow' },
                        e('div', { className: 'p-4 flex justify-between items-center' },
                            e('h2', { className: 'text-xl font-semibold' }, '대시보드'),
                            e('button', {
                                onClick: () => {
                                    logout();
                                    window.location.reload();
                                },
                                className: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
                            }, '로그아웃')
                        )
                    ),
                    e('main', { className: 'p-6' },
                        e('div', { className: 'bg-white rounded-lg shadow p-6' },
                            e('h3', { className: 'text-lg font-semibold mb-4' }, '환영합니다!'),
                            e('p', null, '좌측 메뉴에서 원하시는 항목을 선택해주세요.')
                        )
                    )
                )
            ) : (
                // 비인증 사용자용 로그인 컴포넌트
                e(Login)
            )
        )
    );
}

const domContainer = document.getElementById('root');
const root = ReactDOM.createRoot(domContainer);
root.render(e(App));
