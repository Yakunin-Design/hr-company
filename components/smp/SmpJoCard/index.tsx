import Link from "next/link";
import style from "./SmpJoCard.module.css";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import Subway from "@/components/Subway";
import Spacer from "@/components/std/Spacer";
import Image from "next/image";
import JoSchedule from "@/components/JoSchedule";
import PositionsIndicator from "../PositionsIndicator";
import address_icon from "./address_icon.svg";
import AddressCard from "@/components/AddressCard";

type props = {
    jo_data: {
        id: string;
        specialty: string;
        positions: number;

        subway: string;
        address: string;

        working_time: {
            start: string;
            end: string;
        };
        salary: {
            amount: number;
            period: string;
        };
    };
};

export default function SmpJoCard(props: props) {
    return (
        <Link href={"/job-offers/" + props.jo_data.id}>
            <Card className={style.card}>
                <div className={style.container + " " + style.main_container}>
                    <Row className={style.header}>
                        <h3>{props.jo_data.specialty}</h3>
                        <PositionsIndicator
                            positions={props.jo_data.positions}
                        />
                    </Row>
                    <Spacer top="1" />
                    <AddressCard
                        subway={props.jo_data.subway}
                        address={props.jo_data.address}
                    />
                    <JoSchedule
                        schedule={false}
                        working_time={props.jo_data.working_time}
                    />
                </div>
                <Spacer top=".5" />
                <hr />
                <div className={style.container}>
                    <h3 className={style.price}>
                        {props.jo_data.salary.amount}₽ -{" "}
                        {props.jo_data.salary.period == "hour"
                            ? "час"
                            : props.jo_data.salary.period == "month"
                            ? "месяц"
                            : "смена"}
                    </h3>
                </div>
            </Card>
        </Link>
    );
}
