"use client";
import Container from "@/components/std/Container";

import { CheckUser } from "../checkUser";
import user_controller from "../user_controller";
import EmployerProfile from "./employer";
import WorkerProfile from "./worker";

export default function Page() {
    const {
        user,
        set_user,
        handleChange,
        save_data,
        show_save_btn,
        edit_errors,
        change_worker_documents,
    } = user_controller();
    CheckUser(user, set_user);

    console.log(user);

    return (
        <>
            <Container lk>
                {user.user_type === "worker" ? (
                    <WorkerProfile
                        user={user}
                        handle_change={handleChange}
                        change_worker_documents={change_worker_documents}
                        save_data={save_data}
                        show_save_btn={show_save_btn}
                        edit_errors={edit_errors}
                    />
                ) : (
                    <EmployerProfile
                        user={user}
                        handle_change={handleChange}
                        save_data={save_data}
                        show_save_btn={show_save_btn}
                        edit_errors={edit_errors}
                    />
                )}
            </Container>
        </>
    );
}
