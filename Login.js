function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        const encryptedPassword = await encryptPassword(password);
        
        // 여기에 실제 로그인 API 호출 로직 구현
        // 임시로 로컬 스토리지에 저장
        login('dummy-token');
        window.location.href = '/';
    };

    return e('div', { className: 'min-h-screen bg-gray-100 flex items-center justify-center' },
        e('div', { className: 'bg-white p-8 rounded-lg shadow-md w-96' },
            e('h2', { className: 'text-2xl font-bold mb-6 text-center' }, '로그인'),
            e('form', { onSubmit: handleSubmit },
                e('div', { className: 'mb-4' },
                    e('label', { className: 'block text-gray-700 text-sm font-bold mb-2' }, '이메일'),
                    e('input', {
                        type: 'email',
                        className: 'w-full p-2 border rounded',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        required: true
                    })
                ),
                e('div', { className: 'mb-6' },
                    e('label', { className: 'block text-gray-700 text-sm font-bold mb-2' }, '비밀번호'),
                    e('input', {
                        type: 'password',
                        className: 'w-full p-2 border rounded',
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        required: true
                    })
                ),
                error && e('p', { className: 'text-red-500 text-sm mb-4' }, error),
                e('button', {
                    type: 'submit',
                    className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                }, '로그인'),
                e('p', { className: 'mt-4 text-center' },
                    '계정이 없으신가요? ',
                    e('a', { href: '/signup', className: 'text-blue-500 hover:text-blue-600' }, '회원가입')
                )
            )
        )
    );
}
