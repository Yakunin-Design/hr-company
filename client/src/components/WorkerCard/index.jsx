import React from 'react'
import './worker_card.css'
import star from '../../assets/svg/star.svg'
import ready from '../../assets/svg/ready.svg'
import WorkerProfile from '../WorkerProfile'

function WorkerCard(props) {

    const [worker_profile, set_worker_profile] = React.useState(false)

    function toggle_worker_profile() {
        window.scrollTo({top: 0})
        set_worker_profile(prev => !prev)
    }

    return (
        <>
        { worker_profile && <WorkerProfile handle_click={toggle_worker_profile} data={props.data} /> }

        <div className='card worker-card' onClick={toggle_worker_profile}>
            <div className='worker-card__logo'>
                <h3 className='--cl'>АС</h3>
            </div>
            <h3 className='worker-card__full-name'>{props.data.full_name}</h3>
            <p className='worker-card__speciality'>{props.data.specialty}</p>
            <div className='worker-card__rating'>
                {
                    (props.data.reviews_count && props.data.reviews_count != 0) &&
                    <>
                    <img src={star}/>
                    <h3>{props.data.rating}</h3>
                    <p>{"(" + props.data.reviews_count + " отзывов)"}</p>
                    </>
                }
            </div>
            <div className='worker-card__status'>
                {
                    props.data.status === 'ready'
                    ?
                    <>
                        <img src={ready}/>
                        <h3>Готов работать</h3>
                    </> 
                    :
                    <>
                        {/* unready icon */}
                        <h3>Не готов работать</h3>
                    </>
                }
            </div>
        </div>
        </>
    )
}

export default WorkerCard