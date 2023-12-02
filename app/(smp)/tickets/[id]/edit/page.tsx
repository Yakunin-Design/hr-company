"use client";
import AddressForm from "app/(smp)/new-ticket/AddressForm";
import get_school_names from "app/(smp)/new-ticket/AddressForm/get_school_names";
import PositionForm from "app/(smp)/new-ticket/PositionForm";
import TicketForm from "app/(smp)/new-ticket/TicketForm";
import ticket_controller from "app/(smp)/new-ticket/logic/ticket_controller";
import {
    ticket_state,
    page_state,
} from "app/(smp)/new-ticket/logic/ticket_state";
import axios from "axios";
import { useEffect, useState } from "react";

type params = {
    id: number;
};

export default function EditTicketPage({ params }: { params: params }) {
    const { ticket_form, next_form, prev_form } = ticket_state();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt") || "";
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        axios
            .get(`${process.env.API_ADDRESS}/tickets/${params.id}`, config)
            .then(res => {
                const ticket = {
                    ...res.data,
                    date: new Date(
                        res.data.realization_date
                    ).toLocaleDateString("ru-RU"),
                    company_id: res.data.company_name,
                };

                set_ticket_data(ticket);
            });
    }, []);

    const {
        ticket_data,
        set_ticket_data,
        address_data,
        position_data,
        handle_form,
        handle_address,
        handle_position,
        add_address,
        add_position,
        delete_position,
        open_address,
    } = ticket_controller();

    return (
        <>
            {ticket_form === page_state.ticket && (
                <TicketForm
                    next_form={next_form}
                    handleForm={handle_form}
                    ticket_data={ticket_data}
                    open_address={open_address}
                    edit
                />
            )}
            {ticket_form === page_state.address && (
                <AddressForm
                    address_data={address_data}
                    next_form={next_form}
                    prev_form={prev_form}
                    handleAdress={handle_address}
                    add_address={add_address}
                    delete_position={delete_position}
                />
            )}
            {ticket_form === page_state.position && (
                <PositionForm
                    position_data={position_data}
                    prev_form={prev_form}
                    handlePosition={handle_position}
                    add_position={add_position}
                />
            )}
        </>
    );
}
