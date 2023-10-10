import { useState } from "react";
import step_controller from "./step_controller";
import Compressor from 'compressorjs';

export default function register_controller() {
    const [errors, set_errors] = useState<Array<any>>([])
    const [tou, set_tou] = useState(false);

    function toggle_tou() {
        set_tou(!tou);
    }

    const [form_data, set_form_data] = useState({
        full_name: '',
        day: '',
        month: '00',
        year: '',
        citizenship: '',
        specialty: '',
        phone: '',
        email: '',
        password: '',
        password_confirmation: '',
        company: '',
        inn: '',
    });

    const {step, next_step, prev_step} = step_controller({tou, set_tou, errors, set_errors, form_data})

    function handle_change(event: any) {

        const { name, value, files } = event.target;

        if (name === 'logo') {
            const reader = new FileReader()

            reader.addEventListener("load", function () {
                if (this.result) {

                    set_form_data(prev_emp_data => {
                        return {
                            ...prev_emp_data,
                            [name]: this.result
                        }
                    })
                }
            })

            const file = files[0];
            new Compressor(file, {
                quality: 0.6,
                success(result) {
                    reader.readAsDataURL(result)
                }
            })
        } else {
            set_form_data(prev_form_data => {
                return {
                    ...prev_form_data,
                    [name]: value,
                };
            });
        }
    }

    return ({
        step, 
        next_step, 
        prev_step, 
        tou, 
        toggle_tou, 
        errors,
        form_data,
        handle_change
    })
}