"use client";
import Card from "@/components/Card";
import Image from "next/image";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import replace_icon from "./replace_icon.svg";
import AvatarIcon from "./AvatarIcon/AvatarIcon";
import Link from "next/link";

import style from "../AddressPage.module.css";
import { usePathname } from "next/navigation";

type props = {
    id: string;
    full_name: string;
    position: string;
    link: number;
    avatar?: string;
};

export default function TakenPosition(props: props) {
    const pathname = usePathname();

    return (
        <Card>
            <Row>
                <div>
                    <Link href={`/worker/${props.id}`}>
                        <AvatarIcon
                            title={props.full_name}
                            avatar={props.avatar && props.avatar}
                        />
                        <Spacer top=".5" />
                        <h3 className={style.link_text}>{props.full_name}</h3>
                        <Spacer top=".05" />
                        <h4>{props.position}</h4>
                    </Link>
                </div>
                <Link href={`${pathname}/${props.link}`}>
                    <Image
                        width={25}
                        height={25}
                        src={replace_icon}
                        alt="replace position icon"
                    />
                </Link>
            </Row>
        </Card>
    );
}
