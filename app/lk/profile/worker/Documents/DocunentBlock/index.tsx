import Image from "next/image";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";

import style from "./docblock.module.css";

import eye from "./eye.svg";
import delete_icon from "./drop_document.svg";

type props = {
    active: "show" | "delete";
    name: string;
    foreign?: string;
};

export default function DocumentBlock(props: props) {
    return (
        <>
            <Spacer top="1" />
            <Row className={style.block}>
                <div className={style.icon}></div>

                <div className={style.info}>
                    <h4>{props.name}</h4>
                    <p>{props.foreign ? props.foreign : "Есть"}</p>
                </div>

                <div className={style.active}>
                    {props.active === "show" ? (
                        <Image src={eye} alt="show" />
                    ) : (
                        <Image src={delete_icon} alt="delete" />
                    )}
                </div>
            </Row>
        </>
    );
}
