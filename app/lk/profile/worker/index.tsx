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
    change_worker_documents: (
        document_type: "passport" | "medical_book" | "employment_book"
    ) => void;
    handle_change: (event: any) => void;
    save_data: () => void;
    show_save_btn: boolean;
    edit_errors: Array<string>;
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
                    edit_errors={props.edit_errors}
                />
                <Documents
                    user={props.user}
                    change_worker_documents={props.change_worker_documents}
                />
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
                edit_errors={props.edit_errors}
            />

            {/* 
                        ------------ PREFERENCES ------------
            */}
            <Spacer top="6" />
            <h2>Желаемая работа</h2>
            <JobPreferences
                job_type={user.job_type}
                city={user.city}
                district={user.district}
                subway={user.subway}
                salary={user.salary}
                handle_change={props.handle_change}
                edit_errors={props.edit_errors}
            />

            {/* 
                        ------------ EXPERIENCES ------------
            */}
            <Spacer top="6" />
            <h2>Опыт работы</h2>
            <Experiences
                /*@ts-ignore*/
                experience={user.experience}
                edit_errors={props.edit_errors}
                handle_change={props.handle_change}
            />

            {/* 
                        ------------ Settings ------------
            */}
            <Spacer top="6" />
            <h2>Управление аккаунтом</h2>
            <Settings />
        </div>
    );
}
