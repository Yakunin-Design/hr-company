import React from 'react';
import LkNav from 'components/MainNav';

import Footer from 'components/Footer';
import 'styles/utils/lk.css';
import './FindWork.css';
import JobOfferCard from 'components/JobOfferCard';
import Search from 'components/Search';
import axios from 'axios';

function FindWork(props) {
    const [filters, set_filters] = React.useState({
        specialty: '',
    });

    const [job_offers, set_job_offers] = React.useState([]);
    const [bubble_list, set_bubble_list] = React.useState([]);

    React.useEffect(() => {
        axios
            .get('http://localhost:6969/find-job')
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                set_job_offers(res.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    function find_work(name,value) {
        axios
            .post('http://localhost:6969/find-job', {...filters, [name]: value})
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                set_job_offers(res.data.jo)
                set_bubble_list(res.data.bubbles)
            })
            .catch(e => {
                console.log(e);
            });
    }

    const job_offers_list = job_offers.map(jo => {
        return <JobOfferCard key={jo._id} data={jo} id={jo._id} />;
    });

    function handle_change(name, value) {
        set_filters(prev => {
            return { ...prev, [name]: value };
        })

        find_work(name, value)
    }

    function on_change(event) {
        const { name, value } = event.target;

        handle_change(name, value)
    }

    return (
        <div className="lk">
            <LkNav page="findwork" user_type={props.user.user_type} />
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <Search
                        bubble_list={bubble_list}
                        on_change={on_change}
                        filters={filters}
                        handle_change={handle_change}
                    />
                    <div className="job-offers-list">{job_offers_list}</div>
                </div>
                <Footer />
            </main>
        </div>
    );
}

export default FindWork;
