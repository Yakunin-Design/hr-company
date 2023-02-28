"use client";
import register_controller from "./register_controller";
import set_data from "./set_data";

// std imports
import Container from "@/components/std/Container";
import Card from "@/components/Card";
import Spacer from "@/components/std/Spacer";

// custom conponents
import IconButton from "@/components/IconButton";
import Link from "next/link";

import UserType from "./shared/UserType";
import PersonalData from "./worker/PersonalData";
import Contacts from "./worker/Contacts";
import OrgData from "./employer/OrgData";

import styles from "./register.module.css";
import Button from "@/components/std/Button";
import OrgAgent from "./employer/OrgAgent";
import Confirm from "./shared/Confirm";

export default function RegisterPage() {
    if (localStorage.getItem("jwt")) {
        window.location.replace("/lk");
    }

    const {
        step,
        next_step,
        prev_step,
        tou,
        toggle_tou,
        errors,
        form_data,
        handle_change,
    } = register_controller();

    let page;

    if (step.step === 0 || step.step === 3) {
        if (step.step === 0)
            page = (
                <UserType
                    next_step={next_step}
                    tou={tou}
                    toggle_tou={toggle_tou}
                    err={errors}
                />
            );
        if (step.step === 3)
            page = <Confirm data={set_data(form_data, step)} />;
    } else if (step.type === "employer") {
        if (step.step === 1)
            page = (
                <OrgData
                    err={errors}
                    onChange={handle_change}
                    form_data={form_data}
                />
            );
        if (step.step === 2)
            page = (
                <OrgAgent
                    err={errors}
                    onChange={handle_change}
                    form_data={form_data}
                />
            );
    } else if (step.type === "worker") {
        if (step.step === 1)
            page = (
                <PersonalData
                    err={errors}
                    onChange={handle_change}
                    form_data={form_data}
                />
            );
        if (step.step === 2)
            page = (
                <Contacts
                    err={errors}
                    onChange={handle_change}
                    form_data={form_data}
                />
            );
    }

    return (
        <Container>
            <div className={styles.auth}>
                {step.step != 0 && (
                    <>
                        <Spacer top="2" />
                        <IconButton icon="back" onClick={prev_step} />
                    </>
                )}
                <Card>
                    {page}

                    {step.step != 0 && step.step != 3 && (
                        <>
                            <Spacer top="3" />
                            <Button
                                onClick={() => {
                                    next_step();
                                }}
                                expand
                            >
                                Далее
                            </Button>
                        </>
                    )}

                    {step.step !== 3 && (
                        <>
                            <Spacer top="1" />
                            <Link href="/login">
                                <div className={styles.login}>
                                    Уже есть аккаунт?
                                </div>
                            </Link>
                        </>
                    )}
                </Card>
            </div>
        </Container>
    );
}
