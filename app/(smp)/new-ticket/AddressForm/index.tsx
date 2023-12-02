"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import styles from "../newTicket.module.css";
import Button from "@/components/std/Button";
import Input from "@/components/std/Inputs/Input";
import SubwayInput from "@/components/std/Inputs/SubwayInput";
import { ticket_addres } from "../logic/ticket_types";
import IconButton from "@/components/IconButton";
import PositionList from "@/components/smp/PositionsList";
import { useState } from "react";
import PhoneInput from "@/components/std/Inputs/PhoneInput";

type props = {
    address_data: ticket_addres;
    handleAdress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    add_address: () => void;
    next_form: () => void;
    prev_form: () => void;
    delete_position: (position: string) => void;
};

export default function AddressForm(props: props) {
    const [errors, set_errors] = useState<string[]>([]);
    const error_styles = {
        borderColor: "red",
    };

    function check_errors(): string[] {
        let errors = [];
        if (props.address_data.positions.length === 0) {
            errors.push("positions");
        }
        if (props.address_data.school_name.trim() === "") {
            errors.push("school_name");
        }
        if (
            props.address_data.school_number != null &&
            !Number.isInteger(Number(props.address_data.school_number))
        ) {
            errors.push("school_number");
        }
        if (props.address_data.address.trim() === "") {
            errors.push("address");
        }
        if (props.address_data.subway.trim() === "") {
            errors.push("subway");
        }
        return errors;
    }

    function save_address() {
        const errors = check_errors();
        if (errors.length > 0) {
            set_errors(errors);
        } else {
            props.add_address();
            props.prev_form();
        }
    }

    return (
        <>
            <div className={styles.form_block}>
                <Container>
                    <Spacer top={2} />
                    <IconButton icon="back" onClick={props.prev_form} />
                    <Spacer top={2} />
                    <Input
                        name="school_name"
                        label="Название ОУ*"
                        placeholder="ГБОУ ..."
                        onChange={props.handleAdress}
                        value={props.address_data.school_name}
                        style={
                            errors.includes("school_name") ? error_styles : {}
                        }
                    />
                    <Spacer top={1} />
                    <Input
                        name="school_number"
                        label="Номер ОУ"
                        type="tel"
                        placeholder="№"
                        onChange={props.handleAdress}
                        value={props.address_data.school_number || ""}
                        style={
                            errors.includes("school_number") ? error_styles : {}
                        }
                    />
                    <Spacer top={1} />
                    <Input
                        name="address"
                        label="Адрес*"
                        onChange={props.handleAdress}
                        value={props.address_data.address}
                        style={errors.includes("address") ? error_styles : {}}
                    />
                    <Spacer top={1} />
                    <SubwayInput
                        label="Ближайшее метро*"
                        onChange={props.handleAdress}
                        value={props.address_data.subway}
                        style={errors.includes("subway") ? error_styles : {}}
                    />
                    <Spacer top={1} />
                    <Input
                        name="contact"
                        label="Заведующий"
                        onChange={props.handleAdress}
                        value={props.address_data.contact}
                    />
                    <Spacer top={1} />
                    <PhoneInput
                        name="phone"
                        label="Номер телефон"
                        onChange={props.handleAdress}
                        value={props.address_data.phone}
                    />
                    <Spacer top={3} />
                </Container>
            </div>
            <Spacer top={1} />
            <Container>
                <PositionList
                    positions={props.address_data.positions}
                    add_position
                    delete_position={props.delete_position}
                />

                {errors.includes("positions") && (
                    <h3 className={styles.error_title}>Добавьте позицию</h3>
                )}

                <Spacer top={3} />
                <Button onClick={props.next_form} expand secondary>
                    Добавить позицию +
                </Button>
                <Spacer top={2} />
                <Button onClick={save_address} expand>
                    Сохранить адрес
                </Button>
            </Container>
        </>
    );
}
