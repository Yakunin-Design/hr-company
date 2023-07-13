"use client";
import Card from "@/components/Card";
import Image from "next/image";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import empty_position from "./empty_position.svg";
import style from "./EmptyPosition.module.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

type props = {
    position: string;
    link: number;
    working_time: {
        from: number;
        to: number;
    };
    candidates: number;
};

export default function EmptyPosition(props: props) {
    const pathname = usePathname();

    return (
        <Link href={`${pathname}/${props.link}`}>
            <Card className={style.empty_position}>
                <Row>
                    <div className={style.info}>
                        <Image
                            className={style.icon}
                            src={empty_position}
                            alt="empty position icon"
                        />
                        <Spacer top=".5" />
                        <h3 className={style.empty_headline}>
                            {props.position}
                        </h3>
                        <Spacer top=".05" />
                        <h4 className={style.empty_headline}>
                            С {props.working_time.from}
                            {props.working_time.to && " до "}
                            {props.working_time.to}
                        </h4>
                    </div>

                    <h4 className={style.empty_headline}>
                        Кандидиты: {props.candidates}
                    </h4>
                </Row>
            </Card>
        </Link>
    );
}
