import Subway from "../Subway";
import Row from "../std/Row";
import Image from "next/image"
import Spacer from "../std/Spacer";
import style from "./AddressCard.module.css";
import address_icon from "./address_icon.svg";

type props = {
    subway: string,
    address: string,
}

export default function AddressCard(props: props) {
    return (
    <div>
        <Subway
            station={props.subway}
            text_style="h4"
        />
        <Spacer top=".4" />
        <Row gap={.5}>
            <Image
                src={address_icon}
                alt="address icon"
                height={21}
                width={21}
            />
            <h4 className={style.specialty}>
                {props.address}
            </h4>
        </Row>
    </div>
    )
}