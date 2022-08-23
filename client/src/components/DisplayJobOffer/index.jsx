import React from 'react';
import DisplayJobOfferLogic from './DisplayJobOfferLogic';

import '../../styles/modal_sheet.css';
import './DisplayJobOffer.css';

import CloseIcon from '../../assets/svg/close-icon-white';
import clock from '../../assets/svg/clock.svg';

import get_period from '../../lib/get_created_time';
import EditJobOffer from '../EditJobOffer';
import InfoBlock from './InfoBlock';
import WorkerCard from '../WorkerCard';

function DisplayJobOffer(props) {
    const {
        job_offer_data,
        description,
        toggle_edit,
        show_edit,
        jo_respond,
        responded,
        user_type,
        workers,
    } = DisplayJobOfferLogic(props);

    const candidates = workers.map(worker => <WorkerCard data={worker} />);

    return (
        <div className="--modal-sheet-overlay">
            {show_edit && (
                <EditJobOffer
                    old_data={job_offer_data}
                    id={props.id}
                    toggle_new_job_offer={toggle_edit}
                    points={props.points}
                />
            )}

            <CloseIcon handle_click={props.handle_click} />

            <div className="card modal-sheet JobOffer">
                <div className="modal-sheet__header modal-sheet__container JobOffer__header">
                    <div className="modal-sheet__header-logo">
                        {job_offer_data.logo ? (
                            <img
                                src={job_offer_data.logo}
                                className="modal-sheet__header-img"
                            />
                        ) : (
                            <div className="modal-sheet__header-img"></div>
                        )}
                    </div>

                    <h2 className="modal-sheet__title --cd">
                        {job_offer_data.specialty}
                    </h2>
                    <div className="modal-sheet__subtitle">
                        <h4 className="JobOffer__company-name">Макдональдс</h4>
                        <h4 className="modal-sheet__separator">|</h4>
                        <div className="JobOffer__time-created">
                            <img src={clock} />
                            <h4>{get_period(job_offer_data.created)}</h4>
                        </div>
                    </div>
                    {props.worker ? (
                        <>
                            {responded === '' ? (
                                <button
                                    className="modal-sheet__cta --primary-btn --mt2"
                                    onClick={jo_respond}
                                >
                                    Откликнуться
                                </button>
                            ) : responded === 'ok' ? (
                                <h3 className="--cd --mt1">
                                    Вы успешно откликнулись
                                </h3>
                            ) : (
                                <h3 className="--cd --mt1">
                                    Вы уже откликнулись на эту вакансию
                                </h3>
                            )}
                        </>
                    ) : (
                        <button
                            className="modal-sheet__cta --primary-btn --mt2"
                            onClick={toggle_edit}
                        >
                            Редактировать
                        </button>
                    )}
                </div>
                <hr />

                <div className="modal-sheet__container JobOffer__main">
                    <div className="JobOffer__description">
                        {job_offer_data.description ? (
                            <p>{description}</p>
                        ) : (
                            <h3>Описание отсутствует</h3>
                        )}
                    </div>

                    <InfoBlock job_offer_data={job_offer_data} />
                </div>

                {user_type === 'employer' && (
                    <>
                        <hr className="--mt2" />
                        <div className="modal-sheet__container JobOffer__candidates --mt2 --pb2">
                            {job_offer_data.candidate_count === 0 ? (
                                <h3 className="--mt1 --cd">
                                    Вы увидете кандидатов тут как только кто
                                    нибудь откликнется на вакансию
                                </h3>
                            ) : (
                                <>
                                    <h2 className="--cd">Кандидаты</h2>
                                    <div className="JobOffer__candidates_container">
                                        {candidates}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DisplayJobOffer;
