import style from "./profile.module.css";

import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import WorkerData from "@/types/WorkerData";

import MainInfo from "./MainInfo";
import Documents from "./Documents";
import Contacts from "./Contacts";
import Experiences from "./Experience";

type props = {
    user: {
        user_type: string;
        user_data: WorkerData;
    };
    handle_change: (event: any) => void;
};

export default function WorkerProfile(props: props) {
    const { user } = props;

    return (
        <div>
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
                    user_data={user.user_data}
                    handle_change={props.handle_change}
                />
                <Documents />
            </Row>

            <Spacer top="6" />
            <h2>Контактные данные</h2>
            <Contacts
                status={props.user.user_data.status}
                handle_change={props.handle_change}
                email={props.user.user_data.email}
                phone={props.user.user_data.phone}
            />

            <Spacer top="6" />
            <h2>Опыт работы</h2>

            {/*@ts-ignore*/}
            <Experiences experience={props.user.user_data.experience} />
        </div>
    );
}
