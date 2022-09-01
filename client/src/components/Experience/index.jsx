import React from 'react'
import axios from 'axios'

import './Experience.css'

import time_span from 'assets/svg/time_span.svg'
import Delete_icon from 'assets/svg/close-icon-white'

function Experience({ data, display }) {

    function delete_exp() {
        const send_data = {...data}

        delete send_data.start_month
        delete send_data.start_year
        delete send_data.end_month
        delete send_data.end_year
        
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }

        axios.post('http://localhost:6969/delete-exp', send_data, config)
            .then(res => {
                if (!res.data) {
                    return console.log(res)
                }
                window.location.reload()
            })
            .catch(e => {
                console.log(e.message)
            })
    }

    return (
        <section className="lk__section lk__experience experience">
                <div className="experience__header --row">
                    <span className='experience__company'>{data.employer}</span>
                    {!display && <Delete_icon exp handle_click={delete_exp}/>}
                </div>
                <h3 className='--mt2 experience__tittle'>{data.title}</h3>
                <p className="experience__text --mt1">{data.description}</p>
                <div className="experience__data --mt2">
                    <p className="experience__data__start --v2">{data.start_month}.{data.start_year}</p>
                    <img className="--time_span" src={time_span} alt="" />
                    <p className="experience__data__end --v2">{data.end_month}.{data.end_year}</p>
                </div>
        </section>
    )
}

export default Experience