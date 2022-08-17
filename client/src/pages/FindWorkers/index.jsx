import React from 'react'
import LkNav from '../../components/MainNav'

import Footer from '../../components/Footer'
import '../../styles/utils/lk.css'
import './FindWorkers.css'
import WorkerCard from '../../components/WorkerCard'
import Search from '../../components/Search'
import axios from 'axios'

function FindWorkers(props) {

    const [workers, set_workers] = React.useState([])
    const [bubble_list, set_bubble_list] = React.useState([])
    const [filters, set_filters] = React.useState({
        full_name: '',
    })

    React.useEffect(() => {
        axios.get('http://localhost:6969/find-workers')
        .then(res => {
            if (!res.data) {
                return console.log('bruh')
            }

            set_workers(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    console.log(workers)

    const workers_list = workers.map(worker => <WorkerCard key={worker._id} data={worker} /> )

    function find_workers(name,value) {
        axios
            .post('http://localhost:6969/find-workers', {...filters, [name]: value})
            .then(res => {
                if (!res.data) {
                    return console.log('bruh');
                }

                set_workers(res.data.workers)
                set_bubble_list(res.data.bubbles)
            })
            .catch(e => {
                console.log(e);
            });
    }

    function handle_change(name, value) {
        set_filters(prev => {
            return { ...prev, [name]: value };
        })

        find_workers(name, value)
    }

    function on_change(event) {
        const { name, value } = event.target;

        handle_change(name, value)
    }

    return (
        <div className="lk">
            <LkNav page="find-workers" user_type={props.user.user_type}/>
            <main className="lk__container">
                <div className="--page-container --page-content">
                    <Search
                    employers
                    bubble_list={bubble_list}
                    on_change={on_change}
                    filters={filters}
                    handle_change={handle_change}
                    />
                    <div className="find-workers">
                        {workers_list}
                    </div>
                </div>
                <Footer />
            </main>
        </div>
    )
}

export default FindWorkers