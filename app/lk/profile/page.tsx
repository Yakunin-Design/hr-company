"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import { useEffect } from "react";
import check_user from "../check_user";

export default function Profile() {
    useEffect(() => {
        check_user();
    }, []);

    return (
        <>
            <Container lk>
                <h2>This is profile page</h2>
                <Spacer top="100" />
            </Container>
        </>
    );
}
