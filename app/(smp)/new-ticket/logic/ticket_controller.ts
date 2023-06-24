import { useState } from "react";
import { ticket_data, ticket_addres, ticket_position } from "./ticket_types";

const empty_addres = <ticket_addres>{
    school_number: "",
    address: "",
    subway: "",
    contact: "",
    phone: "",
    positions: [],
};

const empty_position = <ticket_position>{
    position: "",
    quontity: 1,
    working_hours: {
        from: "",
        to: "",
    },
    visitors_count: null,
    sex: "any",
    comment: "",
    candidates: [],
    accepted: [],
};

export default function ticket_controller() {
    const [ticket_data, set_ticket_data] = useState<ticket_data>({
        company_id: "",
        date: "",
        comment: "",
        addresses: [],
    });
    const [address_data, set_address_data] =
        useState<ticket_addres>(empty_addres);
    const [position_data, set_position_data] =
        useState<ticket_position>(empty_position);

    function handle_form(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        set_ticket_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handle_address(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        set_address_data(prev => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }

    function handle_position(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        if (name === "from" || name === "to") {
            set_position_data(prev => {
                return {
                    ...prev,
                    working_hours: {
                        from: prev.working_hours.from,
                        to: prev.working_hours.to,
                        [name]: value,
                    },
                };
            });
        } else {
            set_position_data(prev => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        }
    }

    function add_address() {
        set_ticket_data(prev => {
            return {
                ...prev,
                addresses: [...prev.addresses.filter(adr => adr.address != address_data.address), address_data],
            };
        });

        set_address_data(empty_addres);
    }

    function add_position() {
        set_address_data(prev => {
            return {
                ...prev,
                positions: [...prev.positions, position_data],
            };
        });

        set_position_data(empty_position);
    }

    function delete_position(position: string) {

        const positions = address_data.positions.filter(pos => pos.position !== position);
        set_address_data(prev => {
            return {
                ...prev,
                positions
            }
        })
    }

    function open_address(address_name: string) {
        ticket_data.addresses.forEach(address => {
            if (address.address === address_name)
                set_address_data(address)
        })
    }

    return {
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
    };
}
