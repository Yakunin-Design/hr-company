"use client";
import Avatar from "@/components/Avatar";
import Card from "@/components/Card";
import Spacer from "@/components/std/Spacer";
import Input from "@/components/std/Inputs/Input";
import TextArea from "@/components/std/Inputs/TextArea";
import Row from "@/components/std/Row";
import EmpolyerData from "@/types/EmployerData";

import Image from "next/image";
import { useState } from "react";
import style from "./mi.module.css";

import edit_pencil from "@/assets/svg/edit_pencil.svg";

type props = {
    user_data: EmpolyerData;
    handle_change: (event: any) => void;
};

export default function MainInfo(props: props) {
    const [edit_info, set_edit_info] = useState(false);

    return (
        <Card>
            <Avatar
                value={props.user_data.logo}
                input
                onChange={props.handle_change}
            />

            <Row className={style.pencil_row}>
                <Image
                    src={edit_pencil}
                    alt="edit pencil"
                    className={style.pencil}
                    onClick={() => {
                        set_edit_info(!edit_info);
                    }}
                />
            </Row>

            <Spacer top="2" />
            {!edit_info ? (
                <>
                    <h2>{props.user_data.company}</h2>

                    <Spacer top="1" />
                    <p>{props.user_data.description}</p>
                </>
            ) : (
                <>
                    <h3>Название Компании</h3>
                    <Input
                        name="company"
                        onChange={props.handle_change}
                        placeholder="Название Компании"
                        value={props.user_data.company}
                    />

                    <Spacer top="2" />
                    <h3>Описание Компании</h3>
                    <TextArea
                        name="description"
                        onChange={props.handle_change}
                        placeholder="Опишите вашу компанию"
                        value={props.user_data.description}
                        className={style.description}
                    />
                </>
            )}
        </Card>
    );
}
