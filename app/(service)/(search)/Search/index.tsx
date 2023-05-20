"use client";
import Row from "@/components/std/Row";
import style from "./Search.module.css";
import Spacer from "@/components/std/Spacer";
import Card from "@/components/Card";
import { useState } from "react";
import Button from "@/components/std/Button";
import search_icon from "./icons/search_icon_white.svg";
import Image from "next/image";

type query = {
    string: string,
    filters: Object
}

type props = {
    query: query,
    handle_change: (event: any) => void
    search: () => void,
    bubbles: Array<string>
    append_bubble: (value: string) => void
    type: "job" | "worker"
}

export default function Search(props: props) {
    const [show_filters, set_show_filters] = useState(false)

    function toggle_filters() {
        set_show_filters(prev => !prev);
    }

    const bubbles = props.bubbles.length > 0 ? 
    props.bubbles.map(bubble => {
        return <div key={bubble} className={style.bubble} onClick={() => {props.append_bubble(bubble)}}><p>{bubble}</p></div>
    }).slice(0,5)
    :
    <></>

    return (
        <>
            <form className={style.search_block}>
                <Row gap={1}>
                    <input 
                    name="query" 
                    value={props.query.string} 
                    onChange={props.handle_change} 
                    className={style.search_bar} 
                    placeholder={props.type == "job" ? "Повар-Кондитер" : "ФИО или Специальность"}/>
                    <Button className={style.filter_button} onClick={props.search}>
                        <Image src={search_icon} alt="search" width={19} height={19}/>
                    </Button>
                </Row>
            </form>

            <Spacer top=".5" bottom=".5">
                <Row className={style.actions} gap={1}>
                    <Row gap={1} className={style.bubbles}>
                        {bubbles}
                    </Row>
                    <Button secondary className={style.filter} onClick={toggle_filters}>Фильтры</Button>
                </Row>
            </Spacer>
            {
                show_filters && 
                <Card className={style.filters}>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, aperiam!</p> 
                </Card>
            }
        </>
    )
}