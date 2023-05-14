"use client"
import Container from "@/components/std/Container";
import { CheckUser } from "../checkUser";
import user_controller from "../user_controller";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(set_user);
    const router = useRouter()
    useEffect(() => {
        user.user_type === "worker" && router.push("/lk/profile")
    },[])

    return (
        <Container lk>
            <h1>Job-Offers page</h1>
        </Container>
    );
}
