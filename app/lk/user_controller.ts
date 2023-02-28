import { useState } from "react";

export default function user_controller() {
    const [user, set_user] = useState({
        user_type: '',
        user_data: {},
    });
    return({user, set_user});
}
