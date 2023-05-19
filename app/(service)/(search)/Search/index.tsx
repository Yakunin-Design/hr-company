"use client";
import Row from "@/components/std/Row";
import style from "./Search.module.css";
import Spacer from "@/components/std/Spacer";
import Card from "@/components/Card";
import { useState } from "react";
import Button from "@/components/std/Button";
import search_icon from "./icons/search_icon_white.svg";
import Image from "next/image";

export default function Search() {
    const [show_filters, set_show_filters] = useState(false)

    function toggle_filters() {
        set_show_filters(prev => !prev);
    }

    return (
        <>
            <form className={style.search_block} method="GET">
                <Row gap={1}>
                    <input name="q" onChange={() => {}} className={style.search_bar} placeholder="Повар-Кондитер"/>
                    <Button className={style.filter_button} submit>
                        <Image src={search_icon} alt="search" width={19} height={19}/>
                    </Button>
                </Row>
            </form>

            <Spacer top=".5" bottom=".5">
                <Row className={style.actions} gap={1}>
                    <Row gap={1} className={style.bubbles}>
                        <div className={style.bubble}><p>Повар</p></div>
                        <div className={style.bubble}><p>Повар</p></div>
                        <div className={style.bubble}><p>Повар</p></div>
                        <div className={style.bubble}><p>Повар</p></div>
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