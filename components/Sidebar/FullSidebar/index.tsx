import styles from "./full.module.css";
import PageBlock from "@/components/PageBlock";
import Spacer from "@/components/std/Spacer";
import Image from "next/image";

import back_arrow from "./back-arrow.svg";

type props = {
    className: string;
    user_type: string | null;
    active: string;
    show: boolean;
    toggle: () => void;
};

export default function FullSidebar(props: props) {
    let sidebar_class = styles.sidebar + " " + props.className;

    if (props.show) sidebar_class += " " + styles.show_sidebar;

    return (
        <div className={styles.sidebar + " " + props.className}>
            <div className={styles.head}>
                <div
                    className={
                        props.show
                            ? styles.show + " " + styles.logo
                            : styles.logo
                    }
                ></div>
                <h3
                    className={
                        props.show
                            ? styles.show + " " + styles.name
                            : styles.name
                    }
                >
                    HR Company
                </h3>
                <div
                    className={
                        props.show
                            ? styles.arrow + " " + styles.active_arrow
                            : styles.arrow
                    }
                    onClick={props.toggle}
                >
                    <Image src={back_arrow} alt="arrow" />
                </div>
            </div>
            <div className={styles.nav}>
                <div className={styles.nav_block}>
                    <PageBlock
                        name="profile"
                        active={props.active == "profile"}
                        show={props.show}
                    />
                    <Spacer top="2" />
                </div>

                {/* <div className={styles.nav_block}>
                    <PageBlock
                        name="chat"
                        active={props.active == "chat"}
                        show={props.show}
                    />
                    <Spacer top="2" />
                </div> */}

                {props.user_type == "worker" && (
                    <>
                        <div className={styles.nav_block}>
                            <PageBlock
                                name="myjob"
                                active={props.active == "myjob"}
                                show={props.show}
                            />
                            <Spacer top="2" />
                        </div>
                        <Spacer top="2" />
                        <PageBlock
                            name="find-job"
                            active={props.active == "find-job"}
                            show={props.show}
                        />
                    </>
                )}

                {props.user_type == "employer" && (
                    <>
                        <div className={styles.nav_block}>
                            <PageBlock
                                name="job-offers"
                                active={props.active == "job-offers"}
                                show={props.show}
                            />
                            <PageBlock
                                name="points"
                                active={props.active == "points"}
                                show={props.show}
                            />
                            <Spacer top="2" />
                        </div>
                        <Spacer top="2" />
                        <PageBlock
                            name="find-workers"
                            active={props.active == "find-workers"}
                            show={props.show}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
