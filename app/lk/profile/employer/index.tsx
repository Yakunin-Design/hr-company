import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import EmpolyerData from "@/types/EmployerData";
import Settings from "../worker/Settings";
import Contacts from "./Contacts";
import MainInfo from "./MainInfo";
import style from "./profile.module.css";
type props = {
    user: {
        user_type: string;
        user_data: EmpolyerData;
    };
    handle_change: (event: any) => void;
    save_data: () => void;
    show_save_btn: boolean;
    edit_errors: Array<string>;
};

export default function EmployerProfile(props: props) {
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
                        ------------ MAIN INFO ------------
            */}
            <Spacer top="5" />
            <div>
                <MainInfo
                    user_data={user}
                    handle_change={props.handle_change}
                />
            </div>

            {/* 
                        ------------ CONTACTS ------------
            */}
            <Spacer top="6" />
            <h2>Контактное лицо</h2>
            <Contacts user_data={user} handle_change={props.handle_change} />

            {/* 
                        ------------ SETTINGS ------------
            */}
            <Spacer top="6" />
            <h2>Управление аккаунтом</h2>
            <Settings />
        </div>
    );
}
