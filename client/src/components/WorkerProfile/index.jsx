import React from 'react';
import axios from 'axios';

import Experience from '../Experience';
import Review from '../Review';
import Subway from '../Subway';

import CloseIcon from '../../assets/svg/close-icon-white';
import ready from '../../assets/svg/ready.svg';

import './WorkerProfile.css';
import '../../styles/modal_sheet.css';

function WorkerProfile(props) {
    const citizenship =
        props.data.citizenship === 'other'
            ? 'другое'
            : props.data.citizenship === 'sng'
            ? 'СНГ'
            : props.data.citizenship === 'bu/ua'
            ? '🇧🇾/🇺🇦'
            : '🇷🇺';
    const birthday =
        new Date().getFullYear() - props.data.birthday.substr(6, 4);

    const experience_list = props.data.experience
        ? props.data.experience.map(exp => <Experience data={exp} display />)
        : [];

    const config = {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('jwt'),
        },
    };

    function accept() {
        const data = {
            jo_id: props.jo_id,
            worker_id: props.data._id,
        };

        axios
            .post('http://localhost:6969/job-offer-accept', data, config)
            .then(res => {
                if (!res.data) {
                    console.log('smth wrong');
                }
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    function chat() {
        console.log('click');

        const data = {
            another_user_id: props.data._id,
        };

        axios
            .post('http://localhost:6969/new-chat', data, config)
            .then(res => {
                console.log(res);
                window.location.replace('/chat');
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="--modal-sheet-overlay">
            <CloseIcon handle_click={props.handle_click} />

            <div className="card modal-sheet">
                <div className="modal-sheet__container modal-sheet__header">
                    <div className="modal-sheet__header-logo">
                        {props.data.logo ? (
                            <img
                                src={props.data.logo}
                                className="modal-sheet__header-img"
                            />
                        ) : (
                            <div className="modal-sheet__header-img"></div>
                        )}
                    </div>

                    <h2 className="modal-sheet__title --cd --mt4">
                        {props.data.full_name}
                    </h2>
                    {props.candidate ? (
                        <div className="--row --mt2">
                            <button
                                className="modal-sheet__cta --primary-btn"
                                onClick={accept}
                            >
                                Принять
                            </button>

                            <button
                                className="--secondary-btn --ml2"
                                onClick={chat}
                            >
                                Чат
                            </button>
                        </div>
                    ) : (
                        <button
                            className="modal-sheet__cta --primary-btn --mt2"
                            onClick={() => console.log('bruh')}
                        >
                            Предложить работу
                        </button>
                    )}
                </div>
                <hr className="--mt2" />

                <div className="modal-sheet__container wp-main">
                    <div className="JobOffer__description wp-main__description">
                        <div className="wp-main__specialty-container">
                            <h3>Специальность</h3>
                            <div className="wp-main__specialty">
                                <div className="wp-main__specialty-block">
                                    <p className="--cd --v2">
                                        {props.data.specialty}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="wp-main__working-info">
                            <div className="wp-main__working-type">
                                <h3 className="--mt2">Тип работы</h3>
                                <div className="--row">
                                    <div className="--icon-square">
                                        <h3 className="--cd">П</h3>
                                    </div>
                                    <p>Полная занятость</p>
                                </div>
                            </div>
                            <div className="wp-main__documents">
                                <h3 className="--mt2">Документы</h3>
                                <div className="--row">
                                    <div className="--icon-square">
                                        <h3 className="--cd">П</h3>
                                    </div>
                                    <div className="--icon-square">
                                        <h3 className="--cd">T</h3>
                                    </div>
                                    <div className="--icon-square">
                                        <h3 className="--cd">Qr</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wp-main__sidebar">
                        <div className="wp-main__sidebar-main">
                            <div className="--row">
                                <div className="--icon-square">
                                    <img src={ready} />
                                </div>
                                <p>Статус</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square --citizenship-isq">
                                    {citizenship}
                                </div>
                                <p>Гражданство</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square">{birthday}</div>
                                <p>Полных лет</p>
                            </div>
                            <div className="--row">
                                <div className="--icon-square">
                                    <Subway station={'Беговая'} />
                                </div>
                                <p>Беговая</p>
                            </div>
                        </div>
                        <div className="wp-main__sidebar-price --cl">
                            3000р - Смена
                        </div>
                    </div>
                </div>
                <hr />

                <div className="wp__experience modal-sheet__container">
                    {experience_list.lenght > 0 ? (
                        <>
                            <h3>Опыт работы</h3>
                            {experience_list}
                        </>
                    ) : (
                        <h3>Опыт работы отсутствует</h3>
                    )}
                </div>
                <hr />

                <div className="wp__reviews modal-sheet__container">
                    {/* <Review data={review_data1} />
                    <Review data={review_data2}/> */}
                    Reviews
                </div>
            </div>
        </div>
    );
}

export default WorkerProfile;
