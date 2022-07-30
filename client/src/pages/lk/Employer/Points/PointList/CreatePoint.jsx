import React from 'react'
import axios from 'axios'

import '../../../../../styles/modal_sheet.css'

import CloseIcon from '../../../../../assets/svg/close-icon-white'
import subway_stations from '../../../../../data/subway_stations'
import select_arrow from '../../../../../assets/svg/select_arrow.svg'

import Subway from '../../../../../components/Subway'

function CreatePoint(props) {

    const [point_data, set_points_data] = React.useState({
        address: '',
        subway: ''
    })
    const [errors, set_errors] = React.useState([])

    function handle_change(event) {
        const {name, value} = event.target
        set_points_data(prev => {
            return ({
                ...prev,
                [name] : value
            })
        })
    }

    const error_style = {
        border: '2px solid red'
    }

    const subway_input_style = {
        paddingLeft: subway_stations.indexOf(point_data.subway) != -1 ? "3em" : "1.2em",
    }

    function save() {

        const err = []

        if (point_data.address == '') {
            err.push('address')
        }
        if (subway_stations.indexOf(point_data.subway) === -1) {
            err.push('subway')
        }

        if (err.length != 0) {
            set_errors(err)
        } else {
            const config = {
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('jwt')
                }
            }
    
            axios.post ('http://localhost:6969/new-point', point_data, config)
            .then(res => {
                if (!res.data) {
                    return console.log(res)
                }
                console.log(res)
                set_errors([])
                document.location.reload()
            })
            .catch(e => {
                console.log(e.message)
            })
        }
    }

    return (
        <div className="--modal-sheet-overlay">
            <CloseIcon handle_click={props.handle_click} />

            <div className="card modal-sheet">
                <div className="modal-sheet__header modal-sheet__container">
                    <h2 className="modal-sheet__title --cd --mt1 --mb1">Создание точки</h2>
                </div>
                <hr />

                <div className="modal-sheet__container">
                    <div className='JobOffer__edit-location'>

                        <div className='JobOffer__edit__input-block --address'>
                            <h3>Адрес</h3>
                            <input 
                                className='card__input JobOffer__edit__input --address-input' 
                                type="text"
                                name='address' 
                                value={point_data.address}
                                onChange={event => handle_change(event)}
                                style={errors.includes('address') ? error_style : {}}
                            />
                        </div>

                        <div className='JobOffer__edit__input-block --subway'>
                            <h3>Метро</h3>
                            <input 
                                className='card__input JobOffer__edit__input --subway-input' 
                                type="text"
                                name='subway'
                                list='subways'
                                id='--subway-select'
                                value={point_data.subway}
                                onChange={event => handle_change(event)}
                                style={errors.includes('subway') ? {...error_style, ...subway_input_style} : {...subway_input_style}}
                            />
                            <img src={select_arrow} className='--select-arrow'/>
                            {
                                subway_stations.indexOf(point_data.subway) != -1 
                                &&
                                <div className='--subway-input-icon'>
                                    <Subway station={point_data.subway} text_style="h4" />
                                </div>
                            }

                            <datalist id="subways">
                                {subway_stations.map(station => <option key={station} value={station}>{station}</option>)}
                            </datalist>
                        </div>
                    </div>
                    <div className='--row'>
                        <button className="--primary-btn --mt2 --mla --mb2" onClick={save}> Создать</button>
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}

export default CreatePoint