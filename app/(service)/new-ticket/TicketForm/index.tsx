"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import styles from "../newTicket.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { ticket_state } from "../logic/ticket_state";
import Button from "@/components/std/Button";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import { ticket_data } from "../logic/ticket_types";
import AddressPlate from "@/components/smp/AddressPlate";

type props = {
    handleForm: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    next_form: () => void,
    ticket_data: ticket_data
};

export default function TicketForm(props: props) {

    const addresses = props.ticket_data.addresses.map(address => {
        let positions = 0;

        address.positions.map(position => positions += Number(position.quontity))

        return <AddressPlate
            key={address.school_number}
            school={address.school_number}
            address={address.address}
            positions={positions}
            available={0}
        />
    });

    return (
        <>
            <div className={styles.form_block}>
                <Container>
                    <Spacer top={2} />
                    <h2>Создание заявки</h2>
                    <Spacer top={1} />
                    <Input
                        name="date"
                        label="Дата*" 
                        placeholder="24 Июня 2023"
                        onChange={props.handleForm} 
                        value={props.ticket_data.date} 
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
            <Container>
                {addresses}
                <Spacer top={3} />
                <Button onClick={props.next_form} expand secondary>Добавить адрес +</Button>
                <Spacer top={2} />
                <Button onClick={() => console.log(props.ticket_data)} expand>Создать заявку</Button>
            </Container>
        </>
    );
}
