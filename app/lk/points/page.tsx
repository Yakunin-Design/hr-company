"use client";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import CheckUser from "../checkUser";

export default function Points() {
    CheckUser();

    return (
        <>
            <Container lk>
                <h2>This is points page</h2>
                <Spacer top="100" />
            </Container>
        </>
    );
}
