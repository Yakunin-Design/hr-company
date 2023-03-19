import style from "./profile.module.css";

import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import WorkerData from "@/types/WorkerData";

import MainInfo from "./MainInfo";
import Documents from "./Documents";
import Contacts from "./Contacts";
import Experiences from "./Experience";
import Settings from "./Settings";
import JobPreferences from "./JobPreferences";
import Button from "@/components/std/Button";

type props = {
    user: {
        user_type: string;
        user_data: WorkerData;
    };
    handle_change: (event: any) => void;
    save_data: () => void;
    show_save_btn: boolean;
};

export default function WorkerProfile(props: props) {
    const user = props.user.user_data;

    return (
        <div>
            {/* 
                        ------------ SAVE BUTTON ------------
            */}
            {props.show_save_btn && (
                <div className={style.save}>
                    <Button onClick={props.save_data}>Сохранить</Button>
                </div>
            )}
            {/* 
                        ------------ PROGRESS BAR ------------
            */}
            {/* <Card> </Card> */}

            {/* 
                        ------------ PERSONAL DATA ------------
            */}
            <Spacer top="2" />
            <h2>Персональные данные</h2>
            <Spacer top="2" />
            <Row className={style.personal_row}>
                <MainInfo
                    user_data={user}
                    handle_change={props.handle_change}
                />
                <Documents />
            </Row>

            {/* 
                        ------------ CONTACTS ------------
            */}
            <Spacer top="6" />
            <h2>Контактные данные</h2>
            <Contacts
                status={user.status}
                handle_change={props.handle_change}
                email={user.email}
                phone={user.phone}
            />

            {/* 
                        ------------ PREFERENCES ------------
            */}
            <Spacer top="6" />
            <h2>Желаемая работа</h2>
            <JobPreferences
                job_type={user.job_type}
                district={user.district}
                subway={user.subway}
                salary={user.salary}
                handle_change={props.handle_change}
            />

            {/* 
                        ------------ EXPERIENCES ------------
            */}
            <Spacer top="6" />
            <h2>Опыт работы</h2>
            {/*@ts-ignore*/}
            <Experiences experience={user.experience} />

            {/* 
                        ------------ Settings ------------
            */}
            <Spacer top="6" />
            <h2>Управление аккаунтом</h2>
            <Settings />
        </div>
    );
}
