import React from 'react';
import axios from 'axios';

import Subway from '../../../../../../components/Subway';

import './PointCard.css';

import CloseIcon from 'assets/svg/close-icon-white';

function PointCard(props) {

    function delete_point (e) {
        e.stopPropagation();
        console.log(props.data)

        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .post('http://localhost:6969/delete-point',{id: props.data._id.toString()},config)
            .then(res => {
                if (!res.data) { return console.log(res); }
                window.location.reload();
            })
    }

    return (
        <>
            <div
                className="job-offer-row card"
                onClick={() => {
                    props.set_display_point(props.data);
                }}
            >
                <div className="job-offer-row__address">
                    <h3>{props.data.address}</h3>
                    <Subway station={props.data.subway} />
                </div>
                <div className="--mla --row">
                    <p className="--v2">
                        Вакансий: {props.data.job_offers.length}
                    </p>
                    <p className="--v2 --ml2">
                        Сотрудников: {props.data.workers.length}
                    </p>
                    {props.data.job_offers.length == 0 ? 
                    <CloseIcon handle_click={delete_point} point />
                    :
                    <CloseIcon point hidden/>
                    }
                </div>
            </div>
        </>
    );
}

export default PointCard;
