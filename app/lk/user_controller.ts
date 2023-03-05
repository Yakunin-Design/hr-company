import { useState } from "react";
import { CheckUser } from "./checkUser";
export default function user_controller() {
    const [user, set_user] = useState({
        user_type: "",
        user_data: {
            _id: "",
            birthday: "",
            citizenship: "",
            email: "",
            full_name: "",
            phone: "",
            specialty: [],
            status: "",
        },
    });

    function handleChange(event: any) {}

    return { user, set_user, handleChange };
}
