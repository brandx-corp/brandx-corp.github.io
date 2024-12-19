function Signup() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('유효한 이메일 주소를 입력해주세요.');
            return;
        }

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const encryptedPassword = await encryptPassword(password);
        
        // 여기에 실제 회원가입 API 호출 로직 구현
        setMessage('회원가입 요청이 완료되었습니다. 관리자 승인 후 사용 가능합니다.');
    };

    return e('div', { className: 'min-h-screen bg-gray-100 flex items-center justify-center' },
        e('div', { className: 'bg-white p-8 rounded-lg shadow-md w-96' },
            e('h2', { className: 'text-2xl font-bold mb-6 text-center' }, '회원가입'),
            message ? 
                e('div', { className: 'text-green-500 text-center mb-4' }, message) :
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
                    e('div', { className: 'mb-4' },
                        e('label', { className: 'block text-gray-700 text-sm font-bold mb-2' }, '비밀번호'),
                        e('input', {
                            type: 'password',
                            className: 'w-full p-2 border rounded',
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            required: true
                        })
                    ),
                    e('div', { className: 'mb-6' },
                        e('label', { className: 'block text-gray-700 text-sm font-bold mb-2' }, '비밀번호 확인'),
                        e('input', {
                            type: 'password',
                            className: 'w-full p-2 border rounded',
                            value: confirmPassword,
                            onChange: (e) => setConfirmPassword(e.target.value),
                            required: true
                        })
                    ),
                    error && e('p', { className: 'text-red-500 text-sm mb-4' }, error),
                    e('button', {
                        type: 'submit',
                        className: 'w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                    }, '회원가입'),
                    e('p', { className: 'mt-4 text-center' },
                        '이미 계정이 있으신가요? ',
                        e('a', { href: '/login', className: 'text-blue-500 hover:text-blue-600' }, '로그인')
                    )
                )
        )
    );
}
