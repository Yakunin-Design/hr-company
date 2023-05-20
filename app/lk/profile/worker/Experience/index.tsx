import Card from "@/components/Card";
import Spacer from "@/components/std/Spacer";
import Experience from "@/types/Experience";

import { useState } from "react";
import Image from "next/image";
import style from "./experience.module.css";

import add_icon from "./floating_plus.svg";
import ExperienceBlock from "./ExperienceBlock";
import Add from "./Add";

type props = {
    experience?: Array<Experience>;
    edit_errors: Array<string>;
    handle_change: (event: any) => void;
};

export default function Experiences(props: props) {
    const [add, set_add] = useState(false);

    let id = 0;
    const ExperienceList = props.experience?.map(el => {
        id += 1;

        return (
            <ExperienceBlock
                id={id - 1}
                title={el.title}
                employer={el.employer}
                description={el.description}
                start_month={el.start_month}
                start_year={el.start_year}
                end_month={el.end_month}
                end_year={el.end_year}
            />
        );
    });

    return (
        <div className={style.experiences}>
            {props.experience?.length! > 0 ? (
                ExperienceList
            ) : (
                <Card>Вы не добавили свой опыт работы</Card>
            )}
            {add && (
                <>
                    <Spacer top="1" />
                    <Add
                        edit_errors={props.edit_errors}
                        handle_change={props.handle_change}
                    />
                </>
            )}
            <Spacer top="2" />
            <Image
                src={add_icon}
                alt="add"
                className={style.add}
                width={56}
                height={56}
                onClick={() => set_add(!add)}
            />
        </div>
    );
}
