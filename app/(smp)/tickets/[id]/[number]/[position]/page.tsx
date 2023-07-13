"use client";
import axios from "axios";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import IconButton from "@/components/IconButton";
import Link from "next/link";
import styles from "../AddressPage.module.css";
import Padding from "@/components/std/Padding";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import Column from "@/components/std/Column";
import StatusIcon from "@/components/WorkerCard/StatusIcon";
import Image from "next/image";
import checked_icon from "@/components/std/Inputs/TouCheckbox/check.svg";
import Button from "@/components/std/Button";

type params = {
    id: string;
    number: number;
    position: number;
};

type worker = {
    id: string;
    name: string;
    status: string;
};

type position_data = {
    position: string;
    quontity: number;
    candidates: worker[];
    accepted: worker[];
};

export default function PositionPage({ params }: { params: params }) {
    const [position_data, set_position_data] = useState<position_data>({
        position: "",
        quontity: 0,
        candidates: [],
        accepted: [],
    });
    const [available_workers, set_available_workers] = useState<number>(0);
    const [show_save_btn, set_show_save_btn] = useState(false);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };
        axios
            .get(
                `${process.env.API_ADDRESS}/address/${params.id}/${params.number}/${params.position}`,
                config
            )
            .then(res => {
                set_position_data(res.data);
                set_available_workers(
                    res.data.quontity - res.data.accepted.length
                );
            });
    }, []);

    function handle_change(event: any) {
        const { name, checked } = event.target;

        set_show_save_btn(true);
        set_position_data(prev => {
            let candidates: worker[] = [];
            let accepted: worker[] = [];
            if (checked) {
                const candidate = prev.candidates.find(
                    candidate => candidate.id === name
                );
                if (candidate) {
                    candidates = prev.candidates.filter(
                        prev_candidate => prev_candidate.id != candidate.id
                    );
                    accepted = [...prev.accepted, candidate];
                    set_available_workers(prev => prev - 1);
                }
            } else {
                const worker = prev.accepted.find(worker => worker.id === name);
                if (worker) {
                    accepted = prev.accepted.filter(
                        worker => worker.id != name
                    );
                    candidates = [...prev.candidates, worker];
                    set_available_workers(prev => prev + 1);
                }
            }

            return {
                ...prev,
                candidates,
                accepted,
            };
        });
    }

    function WorkerRow({
        worker,
        accepted,
    }: {
        worker: worker;
        accepted?: boolean;
    }) {
        return (
            <Card>
                <Row>
                    <Column>
                        <h3>{worker.name}</h3>
                        <Spacer top={0.25} />
                        <Link href={`/worker/${worker.id}`} target="_blank">
                            <Row justifyContent="flex-start" gap={1}>
                                {StatusIcon({
                                    is_ready: worker.status === "ready",
                                })}
                                <p>
                                    {worker.status === "ready"
                                        ? "Готов"
                                        : "Не готов"}
                                </p>
                            </Row>
                        </Link>
                    </Column>
                    <div>
                        <input
                            type="checkbox"
                            name={worker.id}
                            id={worker.id}
                            onChange={handle_change}
                            checked={accepted}
                            className={styles.input}
                            disabled={!accepted && available_workers === 0}
                        />
                        <label htmlFor={worker.id}>
                            <div className={styles.tou}>
                                {accepted && (
                                    <Image src={checked_icon} alt="checked" />
                                )}
                            </div>
                        </label>
                    </div>
                </Row>
            </Card>
        );
    }

    function send_data() {
        const jwt = localStorage.getItem("jwt");
        const config = {
            headers: {
                authorization: "Bearer " + jwt,
            },
        };

        const data = {
            ticket_id: params.id,
            address_index: params.number,
            position_index: params.position,
            candidates: position_data.candidates.map(candidate => candidate.id),
            accepted: position_data.accepted.map(
                accepted_worker => accepted_worker.id
            ),
        };

        axios
            .post(`${process.env.API_ADDRESS}/smp-accept`, data, config)
            .then(res => {
                window.location.href = `/tickets/${params.id}/${params.number}`;
            });
    }

    const accepted_workers = position_data.accepted.map(worker => (
        <WorkerRow worker={worker} accepted key={worker.id} />
    ));
    const candidates = position_data.candidates.map(candidate => (
        <WorkerRow worker={candidate} key={candidate.id} />
    ));

    return (
        <>
            <div className={styles.overlay}></div>
            <Spacer top={2} />
            <Container>
                <Link
                    href={`/tickets/${params.id}/${params.number}`}
                    className={styles.link}
                >
                    <IconButton icon="back" />
                </Link>
            </Container>
            <Spacer top={2} />
            <Padding
                vertical={2}
                horisontal={0.5}
                className={styles.address_card}
            >
                <Container>
                    <h2>{position_data.position}</h2>
                    {accepted_workers}
                    {candidates}
                    <Spacer top={1} />
                    {show_save_btn && (
                        <Row justifyContent="flex-end">
                            <Button onClick={send_data}>Сохранить</Button>
                        </Row>
                    )}
                    <Spacer top={20} />
                </Container>
            </Padding>
            <Spacer top={-5} />
        </>
    );
}
