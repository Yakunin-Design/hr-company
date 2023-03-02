"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import { useEffect } from "react";
import check_user from "../check_user";

export default function Points() {
    useEffect(() => {
        check_user();
    }, []);

    return (
        <>
            <Container lk>
                <h2>This is points page</h2>
                <Spacer top="100" />
            </Container>
        </>
    );
}
