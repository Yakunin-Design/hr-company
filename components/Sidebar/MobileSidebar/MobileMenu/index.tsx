import PageBlock from "@/components/PageBlock";
import Spacer from "@/components/std/Spacer";
import styles from "./menu.module.css";

type props = {
    user_type: string | null;
    active: string;
};

export default function MobileMenu(props: props) {
    return (
        <div className={styles.menu}>
            <div className={styles.nav_block}>
                <PageBlock name="profile" active={props.active == "profile"} />
                <Spacer top="2" />
            </div>

            <div className={styles.nav_block}>
                <PageBlock name="chat" active={props.active == "chat"} />
                <Spacer top="2" />
            </div>

            {props.user_type == "worker" && (
                <>
                    <div className={styles.nav_block}>
                        <PageBlock
                            name="myjob"
                            active={props.active == "myjob"}
                        />
                        <Spacer top="2" />
                    </div>
                    <Spacer top="2" />
                    <PageBlock
                        name="findwork"
                        active={props.active == "findwork"}
                    />
                </>
            )}

            {props.user_type == "employer" && (
                <>
                    <div className={styles.nav_block}>
                        <PageBlock
                            name="vacancy"
                            active={props.active == "vacancy"}
                        />
                        <PageBlock
                            name="points"
                            active={props.active == "points"}
                        />
                        <Spacer top="2" />
                    </div>
                    <Spacer top="2" />
                    <PageBlock
                        name="find-workers"
                        active={props.active == "find-workers"}
                    />
                </>
            )}
        </div>
    );
}
