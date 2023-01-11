import Link from "next/link";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import TouCheckbox from "@/components/std/Inputs/TouCheckbox";
import style from "./usertype.module.css";

export default function UserType(props: {
    next_step: (user_type: string) => void;
    tou: boolean;
    toggle_tou: () => void;
    err: Array<any>;
}) {
    const show_err = props.err.includes("tou");

    return (
        <>
            <h2>Регистрация</h2>
            <Spacer top="2" />
            <Button
                expand
                onClick={() => {
                    props.next_step("worker");
                }}
            >
                Как работник
            </Button>
            <Spacer top="1" />
            <Button
                secondary
                expand
                onClick={() => {
                    props.next_step("employer");
                }}
            >
                Как работодатель
            </Button>
            <Spacer top="1" />
            {show_err && (
                <>
                    <p className={style.err}>
                        Пожалуйста примите пользовательское соглашение
                    </p>
                    <Spacer top="1" />
                </>
            )}
            <div className={style.row}>
                {props.tou ? (
                    <TouCheckbox onChange={props.toggle_tou} checked />
                ) : (
                    <TouCheckbox onChange={props.toggle_tou} />
                )}

                <div className={style.tou}>
                    Я прочитал и принимаю{" "}
                    <Link href="/terms-of-use">
                        пользовательское соглашение
                    </Link>
                </div>
            </div>
        </>
    );
}
