function isAuthenticated() {
    // 간단한 인증 함수 (테스트용)
    return localStorage.getItem('auth') === 'true';
}

function Login() {
    return React.createElement(
        'div',
        { className: 'flex items-center justify-center h-screen bg-gray-100' },
        React.createElement(
            'div',
            { className: 'bg-white p-6 rounded-lg shadow-lg' },
            React.createElement('h2', { className: 'text-xl font-bold mb-4' }, '로그인 페이지'),
            React.createElement(
                'button',
                {
                    className: 'bg-blue-500 text-white px-4 py-2 rounded',
                    onClick: () => {
                        localStorage.setItem('auth', 'true');
                        window.location.reload();
                    },
                },
                '로그인'
            )
        )
    );
}

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

    const handleMenuClick = (e) => {
        if (!isAuthenticated()) {
            e.preventDefault();
            window.location.href = '/login';
        }
    };

    return React.createElement(
        'div',
        { className: 'flex h-screen bg-gray-100' },
        isAuthenticated() &&
            React.createElement(
                'div',
                {
                    className: `bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`,
                },
                React.createElement(
                    'div',
                    { className: 'p-4 flex items-center justify-between' },
                    React.createElement('h1', { className: `font-bold ${isSidebarOpen ? 'block' : 'hidden'}` }, '모델 계약 관리'),
                    React.createElement(
                        'button',
                        {
                            onClick: () => setIsSidebarOpen(!isSidebarOpen),
                            className: 'p-2 hover:bg-gray-700 rounded',
                        },
                        '☰'
                    )
                ),
                React.createElement(
                    'nav',
                    { className: 'mt-4' },
                    React.createElement(
                        'a',
                        { href: '#', className: 'flex items-center p-4 hover:bg-gray-700', onClick: handleMenuClick },
                        React.createElement('span', { className: 'mr-2' }, '👥'),
                        React.createElement('span', { className: `${isSidebarOpen ? 'block' : 'hidden'}` }, '모델 리스트')
                    )
                )
            ),
        React.createElement(
            'div',
            { className: 'flex-1 overflow-auto' },
            isAuthenticated()
                ? React.createElement(
                      React.Fragment,
                      null,
                      React.createElement(
                          'header',
                          { className: 'bg-white shadow' },
                          React.createElement('h2', { className: 'text-xl font-semibold' }, '대시보드'),
                          React.createElement(
                              'button',
                              {
                                  onClick: () => {
                                      localStorage.removeItem('auth');
                                      window.location.reload();
                                  },
                                  className: 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600',
                              },
                              '로그아웃'
                          )
                      )
                  )
                : React.createElement(Login)
        )
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
