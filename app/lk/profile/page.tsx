"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";

import { CheckUser } from "../checkUser";
import user_controller from "../user_controller";
import EmployerProfile from "./employer";
import WorkerProfile from "./worker";

export default function Page() {
    const { user, set_user, handleChange } = user_controller();
    CheckUser(set_user);

    return (
        <>
            <Container lk>
                {user.user_type === "worker" ? (
                    <WorkerProfile user={user} handle_change={handleChange} />
                ) : (
                    <EmployerProfile />
                )}
                <Spacer top="100" />
            </Container>
        </>
    );
}
