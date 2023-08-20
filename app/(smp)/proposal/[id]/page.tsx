import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Padding from "@/components/std/Padding";
import Image from "next/image";

import man from "@/assets/svg/man.svg";
import woman from "@/assets/svg/woman.svg";
import time_span from "@/assets/svg/time_span.svg";

import styles from "./proposal.module.css";
import get_data from "./get_data";
import Row from "@/components/std/Row";
import PositionsIndicator from "@/components/smp/PositionsIndicator";
import Subway from "@/components/Subway";
import RespondButton from "./RespondButton";

type params = {
    id: string;
};

export default async function Proposal({ params }: { params: params }) {
    const jo_data = await get_data(params.id);
    const formated_created_time = jo_data.creation_time;

    return (
        <Container wrapper>
            <Overlay href="/job-offers">
                <Padding className={styles.card_padding}>
                    <Spacer top={1} bottom={2}>
                        <div className={styles.proposal_header}>
                            <h2>{jo_data.position}</h2>
                            <Spacer top={1} bottom={1}>
                                <p>
                                    Сможете ли Вы выйти снова на таких же
                                    условиях ?
                                </p>
                            </Spacer>
                            <RespondButton />
                        </div>
                    </Spacer>

                    <Spacer top={1} />

                    <Row>
                        <p>Позиции:</p>
                        <PositionsIndicator
                            positions={jo_data.quontity}
                            light
                        />
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Создана:</p>
                        <h3>{formated_created_time}</h3>
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Оплата (за смену):</p>
                        <h3>{jo_data.price} ₽</h3>
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Город:</p>
                        <h3>{jo_data.city}</h3>
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Адресс:</p>
                        <h3>{jo_data.address}</h3>
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Метро:</p>
                        <Subway station={jo_data.subway} text_style="h3" />
                    </Row>
                    <Spacer top={1} />

                    <Row>
                        <p>Номер ОУ:</p>
                        <h3>{jo_data.number}</h3>
                    </Row>
                    <Spacer top={1} />

                    {jo_data.working_hours.to != "" ? (
                        <>
                            <Spacer top="1" />
                            <Row>
                                <div>
                                    <p>Начало</p>
                                    <h3>{jo_data.working_hours.from}</h3>
                                </div>

                                <Image src={time_span} alt="time_span" />

                                <div>
                                    <p>Окончание</p>
                                    <h3>{jo_data.working_hours.to}</h3>
                                </div>
                            </Row>
                        </>
                    ) : (
                        <Row>
                            <p>Начало</p>
                            <h3>{jo_data.working_hours.from}</h3>
                        </Row>
                    )}

                    {jo_data.sex != "any" && (
                        <>
                            <Spacer top="1" />
                            <Row>
                                {jo_data.sex === "male" ? (
                                    <>
                                        <div>
                                            <Image src={man} alt="man" />
                                        </div>
                                        <h3>Только мужчины</h3>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Image src={woman} alt="women" />
                                        </div>
                                        <h3>Только женщины</h3>
                                    </>
                                )}
                            </Row>
                            <Spacer top={1} />
                        </>
                    )}

                    {jo_data.visitors_count != null && (
                        <>
                            <Row>
                                <p>Готовить на</p>
                                <h3>{jo_data.visitors_count} человек</h3>
                            </Row>
                            <Spacer top={1} />
                        </>
                    )}

                    {jo_data.comment != "" && (
                        <>
                            <Spacer top={1} />
                            <p>Комментарий:</p>
                            <h3>{jo_data.comment}</h3>
                            <Spacer top={1} />
                        </>
                    )}
                </Padding>
                <Spacer top={5} />
            </Overlay>
        </Container>
    );
}
