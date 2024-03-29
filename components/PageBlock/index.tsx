import Row from "@/components/std/Row";

import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import Spacer from "@/components/std/Spacer";

import styles from "./block.module.css";

import ProfileIcon from "./icons/profile_icon.svg";
import ProfileIconWhite from "./icons/profile_icon_white.svg";
import ChatIcon from "./icons/chat_icon.svg";
import ChatIconWhite from "./icons/chat_icon_white.svg";
import SearchIcon from "./icons/search_icon.svg";
import SearchIconWhite from "./icons/search_icon_white.svg";

import VacancyIcon from "./icons/vacancy.svg";
import VacancyIconWhite from "./icons/vacancy_white.svg";
import PointIcon from "./icons/points_icon.svg";
import PointIconWhite from "./icons/points_icon_white.svg";

type props = {
    name: string;
    active: boolean;
    show?: boolean;
    toggle?: () => void;
};

export default function PageBlock(props: props) {
    const href =
        props.name.slice(0, 4) == "find" ? props.name : `/lk/${props.name}`;

    return (
        <>
            <Spacer top="2" />
            <Link href={href} onClick={props.toggle}>
                <div
                    className={
                        props.active
                            ? styles.block + " " + styles.active
                            : styles.block
                    }
                >
                    <Row gap={1} className={styles.row}>
                        {/* General */}
                        {props.name == "profile" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? ProfileIconWhite
                                            : ProfileIcon
                                    }
                                    alt="profile"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Профиль
                                </h3>
                            </>
                        )}
                        {props.name == "chat" && (
                            <>
                                <Image
                                    src={
                                        props.active ? ChatIconWhite : ChatIcon
                                    }
                                    alt="chat"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Чат
                                </h3>
                            </>
                        )}

                        {/* Employer */}
                        {props.name == "job-offers" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? VacancyIconWhite
                                            : VacancyIcon
                                    }
                                    alt="job-offers"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Вакансии
                                </h3>
                            </>
                        )}
                        {props.name == "points" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? PointIconWhite
                                            : PointIcon
                                    }
                                    alt="points"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Точки
                                </h3>
                            </>
                        )}
                        {props.name == "find-workers" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? SearchIconWhite
                                            : SearchIcon
                                    }
                                    alt="find-workers"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Поиск сотрудников
                                </h3>
                            </>
                        )}
                        {props.name == "myjob" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? VacancyIconWhite
                                            : VacancyIcon
                                    }
                                    alt="find-workers"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Моя Работа
                                </h3>
                            </>
                        )}
                        {props.name == "find-job" && (
                            <>
                                <Image
                                    src={
                                        props.active
                                            ? SearchIconWhite
                                            : SearchIcon
                                    }
                                    alt="find-workers"
                                />
                                <h3
                                    className={
                                        props.show ? styles.show : styles.name
                                    }
                                >
                                    Поиск работы
                                </h3>
                            </>
                        )}
                    </Row>
                </div>
            </Link>
        </>
    );
}
