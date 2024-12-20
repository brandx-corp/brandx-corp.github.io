function ModelList() {
    const [models, setModels] = React.useState([
        // 샘플 데이터
        {
            id: 1,
            name: "김모델",
            image: "/api/placeholder/200/250",
            contractEndDate: "2024-12-31"
        }
    ]);

    const [showRegistration, setShowRegistration] = React.useState(false);

    // 모델 목록 뷰
    const ModelGridView = () => {
        if (models.length === 0) {
            return e('div', { className: 'text-center py-10' },
                e('p', { className: 'text-gray-500 mb-4' }, '등록된 모델이 없습니다.'),
                e('button', {
                    className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                    onClick: () => setShowRegistration(true)
                }, '모델 등록하기')
            );
        }

        return e('div', { className: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6' },
            models.map(model => 
                e('div', { key: model.id, className: 'bg-white rounded-lg shadow overflow-hidden' },
                    e('img', {
                        src: model.image,
                        alt: model.name,
                        className: 'w-full h-64 object-cover'
                    }),
                    e('div', { className: 'p-4' },
                        e('h3', { className: 'font-bold' }, model.name),
                        e('p', { className: 'text-gray-600' }, 
                            '계약만료일: ' + new Date(model.contractEndDate).toLocaleDateString()
                        )
                    )
                )
            )
        );
    };

    return e('div', { className: 'p-6' },
        e('div', { className: 'flex justify-between items-center mb-6' },
            e('h2', { className: 'text-2xl font-bold' }, '모델 리스트'),
            models.length > 0 && e('button', {
                className: 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600',
                onClick: () => setShowRegistration(true)
            }, '새 모델 등록')
        ),
        showRegistration ? e(ModelRegistration, { onClose: () => setShowRegistration(false) }) : e(ModelGridView)
    );
}

function ModelRegistration({ onClose }) {
    const [formData, setFormData] = React.useState({
        name: '',
        firstShootingDate: '',
        contractStartDate: '',
        contractEndDate: '',
        productCode: '',
        productColor: '',
        specialTerms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 등록 로직 추가
        console.log('등록된 데이터:', formData);
        onClose();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return e('div', { className: 'bg-white rounded-lg shadow p-6' },
        e('h3', { className: 'text-xl font-bold mb-4' }, '모델 등록'),
        e('form', { onSubmit: handleSubmit },
            e('div', { className: 'grid grid-cols-1 gap-4' },
                // 모델명
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '모델명'),
                    e('input', {
                        type: 'text',
                        name: 'name',
                        value: formData.name,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 최초 촬영일자
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '최초 촬영일자'),
                    e('input', {
                        type: 'date',
                        name: 'firstShootingDate',
                        value: formData.firstShootingDate,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 계약일
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '계약일'),
                    e('input', {
                        type: 'date',
                        name: 'contractStartDate',
                        value: formData.contractStartDate,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 계약만료일
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '계약만료일'),
                    e('input', {
                        type: 'date',
                        name: 'contractEndDate',
                        value: formData.contractEndDate,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 착용 상품 품번
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '착용 상품 품번'),
                    e('input', {
                        type: 'text',
                        name: 'productCode',
                        value: formData.productCode,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 상품 색상
                e('div', null,
                    e('label', { className: 'block text-sm font-medium text-gray-700 mb-1' }, '상품 색상'),
                    e('input', {
                        type: 'text',
                        name: 'productColor',
                        value: formData.productColor,
                        onChange: handleChange,
                        className: 'w-full p-2 border rounded',
                        required: true
                    })
                ),
                // 특약유무
                e('div', { className: 'flex items-center' },
                    e('input', {
                        type: 'checkbox',
                        name: 'specialTerms',
                        checked: formData.specialTerms,
                        onChange: handleChange,
                        className: 'mr-2'
                    }),
                    e('label', { className: 'text-sm font-medium text-gray-700' }, '특약유무')
                ),
                // 버튼 그룹
                e('div', { className: 'flex justify-end gap-2 mt-4' },
                    e('button', {
                        type: 'button',
                        onClick: onClose,
                        className: 'px-4 py-2 text-gray-600 hover:text-gray-800'
                    }, '취소'),
                    e('button', {
                        type: 'submit',
                        className: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                    }, '등록')
                )
            )
        )
    );
}
