"use client";
import Image from "next/image";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Button from "@/components/std/Button";

import form_block from "../newTicket.module.css";
import styles from "./PositionForm.module.css";

import { useState, useEffect } from "react";
import { ticket_position } from "../logic/ticket_types";

import Input from "@/components/std/Inputs/Input";
import Row from "@/components/std/Row";
import TextArea from "@/components/std/Inputs/TextArea";

import Radio from "@/components/std/Inputs/Radio";
import man from "@/assets/svg/man.svg";
import woman from "@/assets/svg/woman.svg";
import { ticket_state } from "../logic/ticket_state";
import IconButton from "@/components/IconButton";

type props = {
    position_data: ticket_position;
    handlePosition: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    add_position: () => void;
    prev_form: () => void;
};

export default function PositionForm(props: props) {
    const [errors, set_errors] = useState<string[]>([]);
    const error_styles = {
        borderColor: "red"
    }

    function check_errors(): string[] {
        let errors = [];
        if (props.position_data.position.trim() === "") {
            errors.push("position");
        }
        if (props.position_data.working_hours.from.trim() === "") {
            errors.push("from");
        }
        return errors;
    }

    function save_position() {
        const errors = check_errors();
        if (errors.length > 0) {
            set_errors(errors);
        } else {
            props.add_position();
            props.prev_form();
        }
    }

    return (
        <>
            <div className={form_block.form_block}>
                <Container>
                    <Spacer top={2} />
                    <IconButton icon="back" onClick={props.prev_form} />
                    <Spacer top={2} />
                    <h3>Кто нужен*</h3>
                    <Row gap={2} justifyContent="flex-start">
                        <div className={styles.specialty_input}>
                            <Input
                                name="position"
                                placeholder="Повар универсал"
                                onChange={props.handlePosition}
                                value={props.position_data.position}
                                style={errors.includes('position') ? error_styles : {}}
                            />
                        </div>
                        <div>
                            <Input
                                name="quontity"
                                onChange={props.handlePosition}
                                value={props.position_data.quontity}
                                type="tel"
                                placeholder="1"
                            />
                        </div>
                    </Row>
                    <Spacer top={1} />
                    <Row gap={2} justifyContent="space-between">
                        <div>
                            <Input
                                name="from"
                                label="С*"
                                placeholder="7:00"
                                onChange={props.handlePosition}
                                value={props.position_data.working_hours.from}
                                style={errors.includes('from') ? error_styles : {}}
                            />
                        </div>
                        <div>
                            <Input
                                name="to"
                                label="До"
                                placeholder="18:00"
                                onChange={props.handlePosition}
                                value={props.position_data.working_hours.to}
                            />
                        </div>
                    </Row>
                    <Spacer top="1" />
                    <Input
                        name="visitors_count"
                        onChange={props.handlePosition}
                        type="tel"
                        value={props.position_data.visitors_count || ""}
                        label="На сколько человек готовить"
                        placeholder="30"
                    />
                    <Spacer top="1" />
                    <h3>Пол</h3>
                    <Spacer top="1" />
                    <Row className={styles.sex}>
                        <Radio
                            name="sex"
                            value="any"
                            currentValue={props.position_data.sex}
                            onChange={props.handlePosition}
                            style={{}}
                            lk
                        >
                            Любой
                        </Radio>

                        <Radio
                            name="sex"
                            value="male"
                            currentValue={props.position_data.sex}
                            onChange={props.handlePosition}
                            style={{}}
                            lk
                        >
                            <Image src={man} alt="man" />
                        </Radio>

                        <Radio
                            name="sex"
                            value="female"
                            currentValue={props.position_data.sex}
                            onChange={props.handlePosition}
                            style={{}}
                            lk
                        >
                            <Image src={woman} alt="man" />
                        </Radio>
                    </Row>

                    <Spacer top={1} />
                    <TextArea
                        name="comment"
                        label="Комментарий"
                        onChange={props.handlePosition}
                        value={props.position_data.comment}
                    />
                    <Spacer top={3} />
                </Container>
            </div>
            <Spacer top={3} />
            <Container>
                <Button onClick={save_position} expand>
                    Добавить
                </Button>
            </Container>
        </>
    );
}
