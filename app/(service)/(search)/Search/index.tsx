"use client";
import Row from "@/components/std/Row";
import style from "./Search.module.css"
import FilterButton from "./FilterButton";
import Spacer from "@/components/std/Spacer";
import Card from "@/components/Card";
import Input from "@/components/std/Inputs/Input";
import { useState } from "react";

export default function Search() {

    const [show_filters, set_show_filters] = useState(false)

    function toggle_filters() {
        set_show_filters(prev => !prev);
    }

    return (
        <>
            <div className={style.search}>
                <div className={style.search_block}>
                    <Row gap={1}>
                        <input name="search" onChange={() => {}} className={style.search_bar} placeholder="Повар-Кондитер"/>
                        <FilterButton onClick={toggle_filters}/>
                    </Row>
                </div>
                {
                    show_filters && 
                    <Card className={style.filters}>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque, aperiam!</p> 
                    </Card>
                }
            </div>
        </>
    )
}