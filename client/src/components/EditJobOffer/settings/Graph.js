import React from 'react'

export default function Graph(props) {

    const { period, amount } = props
    const graph_blocks = []

    let min_amount, max_amount, count_step

    if (period === 'hour') {
        min_amount = 100
        max_amount = 1000
        count_step = 20
    } else if (period === 'day') {
        min_amount = 500
        max_amount = 5000
        count_step = 100
    } else {
        min_amount = 15000
        max_amount = 150000
        count_step = 3000
    }

    for (let i = 2; i < 43; i++) {
        // const graph_element = <div className='graph__block' style={(amount <= i*20 + 120 && amount > i*20 + 100) ? {backgroundColor: "var(--accent)"} : {}}></div>
        const graph_element = <div className='graph__block' style={(amount > i*count_step + min_amount) ? {backgroundColor: "var(--accent)"} : {}}></div>

        graph_blocks.push(graph_element)
    }

    return (
        <div className='range-block__graph graph'>
            <div className='graph__block' style={amount >= min_amount ? {backgroundColor: "var(--accent)"} : {}}></div>
            {/* <div className='graph__block' style={amount <= 120 ? {backgroundColor: "var(--accent)"} : {}}></div> */}
            {graph_blocks}
            <div className='graph__block' style={amount >= max_amount ? {backgroundColor: "var(--accent)"} : {}}></div>
        </div>
    )
}