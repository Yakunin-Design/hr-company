import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import { jo_data } from "@/components/JobOfferCard";
import Row from "@/components/std/Row";
import style from "./myjob.module.css";
import get_job_offers from "./get_job_offers";
import SmpJoCard from "@/components/smp/SmpJoCard";

type my_jobs = {
    my_job: jo_data[];
    responds: jo_data[];
};

export default async function MyJobPage() {
	const job_offers = await get_job_offers();

    const job_offers_list = job_offers.map((jo: any) => {
        const jo_data = {
            id: jo._id,
            specialty: jo.position,
            positions: jo.quontity,
            subway: jo.subway,
            address: jo.address,
            working_time: {
                start: jo.working_hours.from,
                end: jo.working_hours.to,
            },
            salary: {
                amount: jo.price,
                period: "day",
            },
        };

        return <div className={style.respond}><SmpJoCard jo_data={jo_data} key={jo_data.id} /></div>;
    });

    return (
        <Container lk wrapper>
            <Spacer top="2" />
            <h2>Моя работа</h2>
            <Spacer top="1" />
			{job_offers.length === 0 && 
                <p>
                    Тут будут отображаться вакансии, на которые Вас приняли
                </p>
			}
            <Row className={style.responds}>
				{job_offers_list}
            </Row>
        </Container>
    );
}

