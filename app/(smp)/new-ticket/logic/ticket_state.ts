"use client";
import { useState } from "react";

export enum page_state {
    ticket,
    address,
    position
}

export function ticket_state() {
    const [ticket_form, set_ticket_state] = useState(0);

    function next_form() {
        set_ticket_state(prev => prev + 1)
    }

    function prev_form() {
        set_ticket_state(prev => prev - 1)
    }

    return { ticket_form, next_form, prev_form }
}
