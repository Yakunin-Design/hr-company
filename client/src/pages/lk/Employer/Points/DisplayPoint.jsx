import React, { useEffect } from 'react';
import axios from 'axios';

import back_arrow_icon from '../../../../assets/svg/back-arrow.svg';
import Subway from '../../../../components/Subway';

import '../../../../styles/utils/lk.css';
import JobOfferCard from '../../../../components/JobOfferCard';

function DisplayPoint(props) {
    const [point_data, set_point_data] = React.useState({
        job_offers: [],
    });

    useEffect(() => {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .post(
                'http://localhost:6969/get-point-data',
                { job_offer_ids: props.data.job_offers },
                config
            )
            .then(res => {
                if (!res.data) {
                    return console.log(res);
                }

                const jo_list = res.data.map(jo => {
                    return {
                        ...jo,
                        address: props.data.address,
                        subway: props.data.subway,
                    };
                });

                set_point_data(prev => {
                    return {
                        ...prev,
                        job_offers: jo_list,
                    };
                });
            })
            .catch(e => {
                console.log(e.message);
            });
    }, []);

    const job_offer_list = point_data.job_offers.map(jo => <JobOfferCard data={jo} key={jo._id} id={jo._id}/>);

    return (
        <div className="--page-container --page-content">
            <button
                className="--floating-btn --mt2"
                onClick={() => props.set_display_point({})}
            >
                <img src={back_arrow_icon} alt="back-btn" />
            </button>
            <h2 className="--mt2 --mb1">{props.data.address}</h2>
            <Subway station={props.data.subway} text_style="h3" />
            {/* <h2 className="--mt2 --mb1">Сотрудники</h2>
            <p>Тут будут отображаться сотрудники</p> */}
            <h2 className="--mt2 --mb1">Вакансии</h2>
            {job_offer_list ? job_offer_list : <p>Тут будут отображаться ваши вакансии</p>}
        </div>
    );
}

export default DisplayPoint;
