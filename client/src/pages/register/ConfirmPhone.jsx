import React from 'react'

import axios from 'axios'

function ConfirmPhone({data}) {

    React.useEffect(() => {
        axios.post("http://localhost:3000/signup", data)
        .then(result => {

            // validate

            console.log(result)
        }).catch(err => {console.log(err)});
    }, [])

    return(
        <>
            <h2 className="card__title --ld">Подтверждение</h2>
        </>
    )
}

export default ConfirmPhone