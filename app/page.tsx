"use client";
import Header from "@/components/Header";
import Button from "@/components/std/Button";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Link from "next/link";

export default function Home() {
    // shoud be some sort of check if, in case jwt is invalid
    if (localStorage.getItem("jwt")) {
        window.location.replace("/lk/profile");
    }

    return (
        <>
            <Header />
            <Container wrapper>
                <Spacer top="4" />
                <h2>Добро пожаловать на платформу hr company!</h2>
                <Spacer top="2" />
                <p>
                    Тут вы можете найти актуальные вакансии или компетентных
                    работников, для этого предлагаем вам зарегестрироваться.
                    Приятного пользования!
                </p>
                <Spacer top="2" />
                <Link href={"/register"}>
                    <Button>Регистрация</Button>
                </Link>
            </Container>
        </>
    );
}
