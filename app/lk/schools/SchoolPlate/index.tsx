import Card from "@/components/Card";
import Link from "next/dist/client/link";
import Subway from "@/components/Subway";
import saint_petersburg_subway from "@/types/saint_petersburg_subway";
import Row from "@/components/std/Row";
import style from "./SchoolPlate.module.css";

type props = {
    school_id: string;
    school_name: string;
    subway: saint_petersburg_subway;
    school_number: number;
    address?: string;
};

export default function SchoolPlate(props: props) {
    return (
        <Link href={`/lk/schools/${props.school_id}`}>
            <Card className={style.school_plate}>
                <Row>
                    <h3>{props.school_name}</h3>

                    {props.address ? (
                        <Row gap={2}>
                            <Subway station={props.subway} />

                            <p>{props.address}</p>
                        </Row>
                    ) : (
                        <Subway station={props.subway} />
                    )}
                </Row>
            </Card>
        </Link>
    );
}
