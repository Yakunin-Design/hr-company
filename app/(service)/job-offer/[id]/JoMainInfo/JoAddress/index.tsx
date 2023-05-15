import Subway from "@/components/Subway";
import Spacer from "@/components/std/Spacer";
import Link from "next/link";
import Image from "next/image";
import mark_filled from "./mark_filled.svg"
import Row from "@/components/std/Row";
import style from "./joaddr.module.css"

export default function JoAddress({jo_data}: {jo_data: any}) {
   return(
    <>
        <h4>{jo_data.city}</h4>
        <Spacer top=".5"/>
        <Subway station={jo_data.subway} text_style="h4"/>
        <Spacer top=".5"/>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            <Row className={style.addr}>
                <Image src={mark_filled} alt="map" height={24}/>
                <h4 title="Показать на карте" className={style.addr_text}>{jo_data.address}</h4>
            </Row>
        </a>
    </>
   )
}