import React from 'react'
import registration_api_call from '../../../functions/registration_api_call'
import axios from 'axios'

function ConfirmPhone({data}) {
    const ref1 = React.createRef()
    const ref2 = React.createRef()
    const ref3 = React.createRef()
    const ref4 = React.createRef()

    React.useEffect(() => {

        registration_api_call(data)
            .then((res) => {
                localStorage.setItem('tmp_id', res.data)
            })
            .catch((err) => console.log(err))

    }, [])

    const [can_resend_code, set_can_resend_code] = React.useState(true)

    const [code_data, set_code] = React.useState({
        CodeValue1: '',
        CodeValue2: '',
        CodeValue3: '',
        CodeValue4: '',
    })

    function on_change(event) {
        const { name, value } = event.target

        set_code(prev_code => { 
            return {
                ...prev_code,
                [name]: value
            }
        })

        const regex = /^\d{1}$/
        if (regex.test(value)) {

            if (name === 'CodeValue1') {
                ref2.current.focus()
            }
            if (name === 'CodeValue2') {
                ref3.current.focus()
            }
            if (name === 'CodeValue3') {
                ref4.current.focus()
            }
            if (name === 'CodeValue4') {
                ref4.current.blur()
            }
        }

    }

    function send_code_to_api() {
        const code = Number(`${code_data.CodeValue1}` + `${code_data.CodeValue2}` + `${code_data.CodeValue3}` + `${code_data.CodeValue4}`);

        const tmp_id = localStorage.getItem('tmp_id')

        if (!tmp_id) {
            return console.log('no tmp_id')
        }

        const data = {
            id: tmp_id,
            code
        }

        axios.post('http://localhost:6969/phone-confirmation', data)
            .then(res => {

                if (!res.data) {
                    return console.log('invalid code')
                }

                console.log(res)
                localStorage.clear('tmp_id')
                localStorage.setItem('jwt', res.data)

                window.location.replace("/profile")
            })
    }

    function clear_code() {
        ref1.current.focus();
        set_code(prev_code => { 
            return {
                CodeValue1: '',
                CodeValue2: '',
                CodeValue3: '',
                CodeValue4: '',
            }
        })
        return;
    }

    async function resend_code() {
        clear_code();

        if (can_resend_code) {
            set_can_resend_code(false)
            
            // resend code
            await registration_api_call();
            console.log('code send')
        }

    }

    return (
        <>
            <h2 className="card__title --ld">Подтверждение</h2>
            <p className="card__description --ld --v2">
                Пожалуйста введите код из смс сообщения. Код был отправлен на номер: {data.payload.phone}
            </p>
            <div className="card__phone-code phone-code" onClick={clear_code}>
                    <div className='phone-code__code-number code-number'>
                        <input 
                        type="tel" 
                        className="phone-code__value --cd" 
                        name='CodeValue1' id='code-value-1' 
                        placeholder='0' 
                        maxLength='1'
                        onChange={(event) => on_change(event)}
                        ref={ref1}
                        value={code_data.CodeValue1}
                        />
                        <div className='code-number__underline'></div>
                    </div>
                    <div className='phone-code__code-number code-number'>
                        <input
                        type="tel" 
                        className="phone-code__value --cd" 
                        name='CodeValue2' id='code-value-2' 
                        placeholder='0' 
                        maxLength='1'
                        onChange={(event) => on_change(event)}
                        ref={ref2}
                        value={code_data.CodeValue2}
                        />
                        <div className='code-number__underline'></div>
                    </div>
                    <div className='phone-code__code-number code-number'>
                        <input
                        type="tel" 
                        className="phone-code__value --cd" 
                        name='CodeValue3' id='code-value-3' 
                        placeholder='0' 
                        maxLength='1'
                        onChange={(event) => on_change(event)} 
                        ref={ref3}
                        value={code_data.CodeValue3}
                        />
                        <div className='code-number__underline'></div>
                    </div>
                    <div className='phone-code__code-number code-number'>
                        <input type="tel"
                        className="phone-code__value --cd" 
                        name='CodeValue4' id='code-value-4' 
                        placeholder='0' 
                        maxLength='1'
                        onChange={(event) => on_change(event)} 
                        ref={ref4}
                        value={code_data.CodeValue4}
                        />
                        <div className='code-number__underline'></div>
                    </div>
            </div>
            <button className="card__button --secondary-btn --resend_code" onClick={resend_code}>Отправить код повторно</button>
            <button className="card__button --primary-btn --card-btn-secondary" onClick={send_code_to_api}>Завершить регистарцию</button>
        </>
    )
}

export default ConfirmPhone