// simple hook for toggling question accordion
import { useState } from 'react';

type toggle = {
    show_question: boolean;
    toggle: () => void;
};

export default function toggle_question(default_value: boolean): toggle {
    const [show_question, set_show_question] = useState(default_value);

    function handle_click(): void {
        set_show_question((prev: boolean) => !prev);
    }

    return {
        show_question,
        toggle: handle_click,
    };
}
