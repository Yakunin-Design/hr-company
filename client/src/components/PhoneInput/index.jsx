import React from 'react';

export default function PhoneInput({data, on_change, errors}) {
    let error_style = {
        border: '2px solid red',
    };

    function phone_change(event) {

        console.log(event.target.value.toString().slice(-1))
        let value = String(event.target.value);
        const now_data = String(data);
        value = value.trim();
        
        
        if (/[a-zа-яё]/i.test(value.slice(-1))){
            value = value.slice(0, -1);
        }

        if (value.length > now_data.length) {
            if (now_data === '') {

                console.log('ok');
                if (value.slice(-1) == '7') value = '+7 ( ';
                if (value.slice(-1) == '8') value = '+7 ( ';
                if (value.slice(-1) == '+') value = '+';
            }
    
            if (now_data === '+') {
                if (value.slice(-1) == '7') value = '+7 ( ';
            }
    
            if (value.substring(0,5) == '+7 ( ') {
                
                if (value.length == 8) {
                    value += ' )'
                }
                if (value.length == 14 || value.length == 17) {
                    value += ' '
                }
                if (value.length > 20) {
                    value = value.substring(0,20)
                }

                if (value.length == 11) {
                    value = value.substring(0,10) + ' ' + value.slice(-1);
                }
            }
        } else {
            console.log(now_data.length);
            if (now_data.length == 16) {
                value = value = value.substring(0, 15)
            }
            if (now_data.length == 12) {
                value = value = value.substring(0, 11)
            }
        }

        console.log(data);
        event.target.value = value;
        on_change(event)
    }

    return (
        <input
            className="card__input"
            type="tel"
            placeholder="+7 (911) 123 45 67"
            style={errors.includes('phone') ? error_style : {}}
            name="phone"
            value={data}
            onChange={event => phone_change(event)}
        />
    );
}