import PageBlock from "@/components/PageBlock";
import Spacer from "@/components/std/Spacer";
import styles from "./menu.module.css";

type props = {
    user_type: string | null;
    active: string;
    toggle: () => void;
};

export default function MobileMenu(props: props) {
    return (
        <div className={styles.menu}>
            <div className={styles.nav_block}>
                <PageBlock
                    name="profile"
                    active={props.active == "profile"}
                    toggle={props.toggle}
                />
                <Spacer top="2" />
            </div>
            <Spacer top="2" />
            <div className={styles.nav_block}>
                <PageBlock
                    name="notifications"
                    active={props.active == "notifications"}
                    toggle={props.toggle}
                />
                <Spacer top="2" />
            </div>

            {/* <div className={styles.nav_block}>
        <PageBlock name="chat" active={props.active == "chat"} toggle={props.toggle}/>
        <Spacer top="2" />
      </div> */}

            {props.user_type == "worker" && (
                <>
                    <Spacer top="2" />
                    <div className={styles.nav_block}>
                        <PageBlock
                            name="myjob"
                            active={props.active == "myjob"}
                            toggle={props.toggle}
                        />
                        <Spacer top="2" />
                    </div>
                    <Spacer top="2" />
                    <PageBlock
                        name="job-offers"
                        active={props.active == "job-offers"}
                        toggle={props.toggle}
                    />
                </>
            )}

            {props.user_type == "employer" && (
                <>
                    <div className={styles.nav_block}>
                        <PageBlock
                            name="tickets"
                            active={props.active == "tickets"}
                            toggle={props.toggle}
                        />
                        <Spacer top="2" />
                        <PageBlock
                            name="schools"
                            active={props.active == "schools"}
                            toggle={props.toggle}
                        />
                        <Spacer top="2" />
                    </div>
                    <Spacer top="2" />
                    <PageBlock
                        name="find-workers"
                        active={props.active == "find-workers"}
                        toggle={props.toggle}
                    />
                </>
            )}
        </div>
    );
}
