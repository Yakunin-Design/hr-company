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

type props = {
    address_data: ticket_addres;
    handleAdress: (event: React.ChangeEvent<HTMLInputElement>) => void;
    add_address: () => void;
    next_form: () => void;
    prev_form: () => void;
    delete_position: (position: string) => void;
};

export default function AddressForm(props: props) {
    function save_address() {
        props.add_address();
        props.prev_form();
    }

    return (
        <>
            <div className={styles.form_block}>
                <Container>
                    <Spacer top={2} />
                    <IconButton icon="back" onClick={props.prev_form} />
                    <Spacer top={2} />
                    <Input
                        name="school_number"
                        label="Номер ОУ*"
                        placeholder="Школа №488"
                        onChange={props.handleAdress}
                        value={props.address_data.school_number}
                    />
                    <Spacer top={1} />
                    <Input
                        name="address"
                        label="Адрес*"
                        onChange={props.handleAdress}
                        value={props.address_data.address}
                    />
                    <Spacer top={1} />
                    <SubwayInput
                        label="Ближайшее метро*"
                        onChange={props.handleAdress}
                        value={props.address_data.subway}
                    />
                    <Spacer top={1} />
                    <Input
                        name="contact"
                        label="Заведующий"
                        onChange={props.handleAdress}
                        value={props.address_data.contact}
                    />
                    <Spacer top={1} />
                    <Input
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
                <Spacer top={3} />
                <Button onClick={props.next_form} expand secondary>
                    Добавить позицию +
                </Button>
                <Spacer top={2} />
                <Button onClick={save_address} expand>
                    Сохранить
                </Button>
            </Container>
        </>
    );
}
