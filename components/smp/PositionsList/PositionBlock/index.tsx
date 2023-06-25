"use clien"
import Image from "next/image";

import Card from "@/components/Card";
import { candidate } from "../index";
import Row from "@/components/std/Row";
import EmptyPosition from "./empty_position.svg";
import replace_icon from "./replace_icon.svg";
import Spacer from "@/components/std/Spacer";

import style from "./positionList.module.css";
import Link from "next/link";

import delete_icon from "./drop_document.svg"

interface userdata {
    id: string;
    avatar: string;
    fullname: string;
    position: string;
}

interface position_data {
    candidates: candidate[];
    quontity: number;
    position: string;
    time: number | string;
}

type props = {
    position_data: userdata | position_data,
    add_position?: boolean,
    onClick?: (position: string) => void
};

function isUser(data: any): data is userdata {
    return "id" in data;
}

function parse_candidates(count: number, add_position?: boolean) {
    if (add_position) {
        if (count < 2) {
            return `${count} человек`;
        } else if (count < 5) {
            return `${count} человека`;
        } else {
            return `${count} человек`;
        }
    } else {
        if (count == 0) {
            return `${count} кандидатов`;
        } else if (count < 2) {
            return `${count} кандидат`;
        } else if (count < 5) {
            return `${count} кандидата`;
        } else {
            return `${count} кандидатов`;
        }
    }
    
}

export default function PositionBlock(props: props) {
    const type = !isUser(props.position_data) ? "empty" : "user";

    const textstyle = type === "empty" ? style.empty : "";
    const position_style =
        type === "empty" ? style.empty_position : style.position;

    function get_actions(type: string) {
        if (props.add_position) {
            return <Image src={delete_icon} alt={""} className={style.delete_icon} onClick={() => {props.onClick && props.onClick(props.position_data.position)}}/>
        }
        if (type === "empty") {
            return (
                <h4 className={textstyle}>
                    {!isUser(props.position_data) && parse_candidates(props.position_data.candidates.length, props.add_position)}
                </h4>
            );
        } else {
            return (
                <Row className={style.actions}>
                    <Image
                        className={style.image}
                        src={replace_icon}
                        alt="switch"
                    />
                </Row>
            );
        }
    }

    function get_image(avatar: string) {
        if (avatar === "") {
            return (
                <div className={style.logo}>
                    <span>
                        {info.title.split(" ")[0][0]}
                        {info.title.split(" ")[1][0]}
                    </span>
                </div>
            );
        } else {
            return (
                <Image className={style.image} src={info.avatar} alt="avatar" />
            );
        }
    }

    function get_info() {
        if (isUser(props.position_data)) {
            return {
                avatar: props.position_data.avatar,
                title: props.position_data.fullname,
                subtitle: props.position_data.position,
            };
        } else {
            return {
                avatar: EmptyPosition,
                title: `${props.position_data.position} ${props.add_position ? `(${props.position_data.quontity})` : ""}`,
                subtitle: props.position_data.time,
            };
        }
    }

    const info = get_info();
    const actions = get_actions(type);
    const image = get_image(info.avatar);
    const card = (
        <Card className={position_style}>
            <Row>
                <div className={style.info}>
                    {image}
                    <Spacer top=".5" />
                    <h3 className={textstyle}>{info.title}</h3>
                    <Spacer top=".05" />
                    <h4 className={textstyle}>{info.subtitle}</h4>
                </div>
                {actions}
            </Row>
        </Card>
    );

    return !props.add_position && type === "empty" ? <Link href="/test">{card}</Link> : card;
}
