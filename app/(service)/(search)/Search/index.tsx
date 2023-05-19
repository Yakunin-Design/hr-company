import Image from "next/image";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import style from "./Search.module.css"

import FilterButton from "./FilterButton";

export default function Search() {
    return (
        <Row>
            <input className={style.search_bar} type="text" />
            <FilterButton/>
        </Row>
    )
}