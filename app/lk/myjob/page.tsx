import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import { jo_data } from "@/components/JobOfferCard";
import Row from "@/components/std/Row";
import style from "./myjob.module.css";

type my_jobs = {
    my_job: jo_data[];
    responds: jo_data[];
};

export default function MyJobPage() {
    return (
        <Container lk wrapper>
            <Spacer top="2" />
            <h2>Моя работа</h2>
            <Spacer top="1" />
            <Row className={style.responds}>
                <p>
                    Тут будут отображаться вакансии, на которые вы откликнулись
                </p>
            </Row>
        </Container>
    );
}
