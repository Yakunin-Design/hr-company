import Indicator from './Indicator';
import get_created_time from '@/functions/get_created_time';
import clock from "./clock.svg"
import style from './JobOfferRow.module.css';
import Row from '@/components/std/Row';
import Image from 'next/image';
import Subway from '@/components/Subway';
import Spacer from '@/components/std/Spacer';

type props = {
    data: {
        address: string
        candidate_count: number
        created: number
        employer_id: string
        id: string
        salary: { 
            amount: string, 
            period: string 
        }
        specialty: string
        status: string
        subway: string
    }
}

function JobOfferRow(props: props) {
    return (
        <>
            <Spacer top="1.2"/>
            <Row className={style.job_offer}>
                <Row className={style.title}>
                    <h3 className="job-offer-row__title">
                        {props.data.specialty}
                    </h3>
                    <Indicator count={props.data.candidate_count} className={style.indicator}/>
                </Row>

                <Row className={style.info}>
                    <div className={style.location}>
                        <h3 className={style.address}>{props.data.address}</h3>
                        <Subway station={props.data.subway}/>
                    </div>

                    <Row className={style.time}>
                        <Image src={clock} alt="clock icon" />
                        <p>{get_created_time(props.data.created)}</p>
                    </Row>
                </Row>
            </Row>
        </>
        
    );
}

export default JobOfferRow;
