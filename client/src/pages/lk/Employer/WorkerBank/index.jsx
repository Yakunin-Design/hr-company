import React, { useEffect } from 'react';
import axios from 'axios';
import LkNav from '../../../../components/MainNav';
import WorkerCard from '../../../../components/WorkerCard';

import Footer from '../../../../components/Footer';
import '../../../../styles/utils/lk.css';

function WorkerBank(props) {
    const [workers, set_workers] = React.useState([]);

    useEffect(() => {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        };

        axios
            .post('http://localhost:6969/get-worker-bank', {}, config)
            .then(res => {
                if (!res.data) {
                    return console.log(res);
                }
                set_workers(res.data);
            })
            .catch(e => {
                console.log(e.message);
            });
    }, []);

    const candidates = workers.map(worker => <WorkerCard data={worker} />);

    return (
        <div className="lk">
            <LkNav page="worker-bank" user_type={props.user.user_type} />
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <h2>Кандидаты</h2>
                    {candidates}
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default WorkerBank;
