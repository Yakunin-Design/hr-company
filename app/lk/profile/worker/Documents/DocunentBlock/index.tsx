"use client";
import Image from "next/image";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import style from "./docblock.module.css";

import cross_icon from "@/assets/svg/cross.svg";
import checkmark_icon from "@/assets/svg/checkmark.svg";
import Checkbox from "@/components/std/Inputs/Checkbox";

type document_type = "passport" | "medical_book" | "employment_book";

type props = {
    name: document_type;
    ownership: boolean;
    flip: (document_type: document_type) => any;
};

export default function DocumentBlock(props: props) {
    let document_name = "Паспорт РФ";

    if (props.name === "medical_book") document_name = "Мед. книжка";
    if (props.name === "employment_book") document_name = "Трудовая книжка";

    function handle_click() {
        props.flip(props.name);
    }

    return (
        <>
            <Checkbox
                name={props.name}
                value={props.name}
                onChange={handle_click}
            >
                <Row className={style.block}>
                    <div className={style.icon}></div>

                    <div className={style.info}>
                        <h4>{document_name}</h4>
                        <p>{props.ownership ? "Есть" : "Нет"}</p>
                    </div>

                    <div className={style.active}>
                        {props.ownership ? (
                            <Image src={checkmark_icon} alt="checkmark icon" />
                        ) : (
                            <Image src={cross_icon} alt="cross icon" />
                        )}
                    </div>
                </Row>
            </Checkbox>
        </>
    );
}
