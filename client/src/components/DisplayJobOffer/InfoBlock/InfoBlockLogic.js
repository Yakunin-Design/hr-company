import React from 'react'

export default function InfoBlockLogic(job_offer_data) {

    const schedule_blocks = []
    if (job_offer_data.schedule) {
        for (let i = 0; i < job_offer_data.schedule.weekdays; i++) {
            schedule_blocks.push(<div className="schedule-block --weekdays"></div>)
        }

        for (let i = 0; i < job_offer_data.schedule.weekends; i++) {
            schedule_blocks.push(<div className="schedule-block --weekends"></div>)
        }
    }

    const citizenships = []
    if (job_offer_data.citizenship) {
        if (job_offer_data.citizenship === 'ru') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
        }

        if (job_offer_data.citizenship === 'bu/ua') {
            citizenships.push(<div className="info-block__citizenships-block">🇷🇺</div>)
            citizenships.push(<div className="info-block__citizenships-block">🇧🇾/🇺🇦</div>)
        }

        if (job_offer_data.citizenship === 'sng') {
            citizenships.push(<div className="info-block__citizenships-block">СНГ</div>)
        }

        if (job_offer_data.citizenship === 'other') {
            citizenships.push(<h3>Любое</h3>)
        }
    }

    return { schedule_blocks, citizenships }
}