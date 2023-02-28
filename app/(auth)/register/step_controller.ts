import { useState } from "react";
import {
    worker_validation_step1,
    worker_validation_step2,
    employer_validation_step1,
    employer_validation_step2,
} from '@/functions/validation';

type required = {
    tou: boolean,
    set_tou: Function,
    errors: Array<any>,
    set_errors: Function,
    form_data: object
}

export default function step_controller(required : required) {

    //step controller
    const [step, set_step] = useState({
        type: "",
        step: 0,
    });

    function next_step(type?: string) {

        let err = [];

        if (step.step == 0 && !required.tou) err.push("tou")

        if (step.step === 1 && step.type === 'worker') {
            err = worker_validation_step1(required.form_data);
        }

        if (step.step === 2 && step.type === 'worker') {
            err = worker_validation_step2(required.form_data);
        }

        if (step.step === 1 && step.type === 'employer') {
            err = employer_validation_step1(required.form_data);
        }

        if (step.step === 2 && step.type === 'employer') {
            err = employer_validation_step2(required.form_data);
        }

        required.set_errors(err);

        if (err.length != 0) {
            return;
        }

        set_step(prev_step => {
            if (type)
                return {
                    type: type,
                    step: prev_step.step + 1,
                };
            else
                return {
                    ...prev_step,
                    step: prev_step.step + 1,
                };
        });
    }

    function prev_step() {
        required.set_errors([]);

        set_step(prev_step => {
            console.log(prev_step)
            // reset registration user type if user gos back to step 0
            const type = prev_step.step === 1 ? "" : prev_step.type;

            return {
                type,
                step: prev_step.step - 1,
            };
        });

        console.log(step);
    }

    return {
        step,
        next_step,
        prev_step,
    };
}
