"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import styles from "../newTicket.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import Button from "@/components/std/Button";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import { ticket_data } from "../logic/ticket_types";
import AddressPlate from "@/components/smp/AddressPlate";
import axios from "axios";

type props = {
    handleForm: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    next_form: () => void;
    ticket_data: ticket_data;
    open_address: (address_name: string) => void;
    edit?: boolean;
};

export default function TicketForm(props: props) {
    const [errors, set_errors] = useState<string[]>([]);
    const error_styles = {
        borderColor: "red",
    };

    function check_date(date: string): boolean {
        const input_date = date.split(".");
        const day = Number(input_date[0]);
        const month = Number(input_date[1]);
        const year = Number(input_date[2]);

        if (day < 0 || day > 31) return false;
        if (month < 0 || month > 12) return false;

        if (
            year < new Date().getFullYear() ||
            year > new Date().getFullYear() + 1
        )
            return false;

        return true;
    }

    function check_errors(): string[] {
        let errors = [];
        if (props.ticket_data.addresses.length === 0) {
            errors.push("addresses");
        }
        if (props.ticket_data.company_id.length === 0) {
            errors.push("company_id");
        }
        if (
            props.ticket_data.date.trim() === "" ||
            !check_date(props.ticket_data.date)
        ) {
            errors.push("date");
        }
        return errors;
    }

    function handle_address_plate_click(address: string) {
        props.open_address(address);
        props.next_form();
    }

    function date_change(event: React.ChangeEvent<HTMLInputElement>) {
        let value = String(event.target.value);
        const now_value = props.ticket_data.date;
        value = value.trim();
        if (value.length > now_value.length) {
            if (value.length === 2) event.target.value += ".";
            if (value.length === 5) event.target.value += ".";
        }
        props.handleForm(event);
    }

    function create_ticket() {
        const errors = check_errors();
        if (errors.length > 0) {
            set_errors(errors);
        } else {
            set_errors([]);
            const jwt = localStorage.getItem("jwt") || "";
            const config = {
                headers: {
                    authorization: "Bearer " + jwt,
                },
            };

            axios
                .post(
                    `${process.env.API_ADDRESS}/new-ticket`,
                    props.ticket_data,
                    config
                )
                .then(res => (window.location.href = "/tickets"));
        }
    }

    function edit_ticket() {
        const errors = check_errors();
        if (errors.length > 0) {
            set_errors(errors);
        } else {
            set_errors([]);
            const jwt = localStorage.getItem("jwt") || "";
            const config = {
                headers: {
                    authorization: "Bearer " + jwt,
                },
            };

            axios
                .post(
                    `${process.env.API_ADDRESS}/edit-ticket`,
                    props.ticket_data,
                    config
                )
                .then(res => (window.location.href = "/tickets"));
        }
    }

    const addresses = props.ticket_data.addresses.map(address => {
        let positions = 0;

        address.positions.map(
            position => (positions += Number(position.quontity))
        );

        return (
            <AddressPlate
                key={address.school_number}
                school={address.school_name + " №" + address.school_number}
                address={address.address}
                worker_count={positions}
                onClick={() => handle_address_plate_click(address.address)}
            />
        );
    });

    const today = new Date();
    let tommorow = new Date();
    tommorow.setDate(today.getDate() + 1);
    const display_date = tommorow
        .toLocaleDateString("en-GB")
        .split("/")
        .join(".");

    return (
        <>
            <div className={styles.form_block}>
                <Container>
                    <Spacer top={2} />
                    {props.edit ? (
                        <h2>Редактирование заявки</h2>
                    ) : (
                        <h2>Создание заявки</h2>
                    )}

                    <Spacer top={1} />
                    <Input
                        name="company_id"
                        label="Название компании*"
                        onChange={props.handleForm}
                        value={props.ticket_data.company_id}
                        style={
                            errors.includes("company_id") ? error_styles : {}
                        }
                    />
                    <Spacer top={1} />
                    <Input
                        name="date"
                        label="Дата реализации*"
                        type="tel"
                        maxLength={10}
                        placeholder={display_date}
                        onChange={date_change}
                        value={props.ticket_data.date}
                        style={errors.includes("date") ? error_styles : {}}
                    />
                    <Spacer top={1} />
                    <TextArea
                        name="comment"
                        label="Комментарий"
                        onChange={props.handleForm}
                        value={props.ticket_data.comment}
                    />
                    <Spacer top={3} />
                </Container>
            </div>
            <Spacer top={3} />
            {errors.includes("addresses") && (
                <h3 className={styles.error_title}>Добавьте адрес</h3>
            )}
            <Container>
                {addresses}
                <Spacer top={3} />
                <Button onClick={props.next_form} expand secondary>
                    Добавить адрес +
                </Button>
                <Spacer top={2} />
                {props.edit ? (
                    <Button onClick={edit_ticket} expand>
                        Редактировать заявку
                    </Button>
                ) : (
                    <Button onClick={create_ticket} expand>
                        Создать заявку
                    </Button>
                )}
            </Container>
        </>
    );
}
