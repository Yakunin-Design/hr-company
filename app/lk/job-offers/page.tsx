"use client"
import Container from "@/components/std/Container";
import { CheckUser } from "../checkUser";
import user_controller from "../user_controller";

export default function Page() {
    const {
        user,
        set_user,
        handleChange,
        save_data,
        show_save_btn,
        edit_errors,
    } = user_controller();

    CheckUser(set_user);

    return (
        <Container lk>
            <h1>Job-Offers page</h1>
        </Container>
    );
}
