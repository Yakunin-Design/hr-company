"use client";
import { page_state, ticket_state } from "./logic/ticket_state";
import ticket_controller from "./logic/ticket_controller";

import TicketForm from "./TicketForm";
import AddressForm from "./AddressForm";
import PositionForm from "./PositionForm";

export default function NewTicketPage() {
    const { ticket_form, next_form, prev_form } = ticket_state();
    const {
        ticket_data,
        address_data,
        position_data,
        handle_form,
        handle_address,
        handle_position,
        add_address,
        add_position,
        delete_position,
        open_address
    } = ticket_controller();

    return (
        <>
            {ticket_form === page_state.ticket && (
                <TicketForm
                    next_form={next_form}
                    handleForm={handle_form}
                    ticket_data={ticket_data}
                    open_address={open_address}
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
