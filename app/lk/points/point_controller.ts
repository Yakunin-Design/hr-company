import axios from "axios";
import { useEffect, useState } from "react";

export default function point_controller() {
    const [points, set_points] = useState();

    useEffect(() => {
        const config = {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('jwt')
            }
        }

        axios.get('http://localhost:6969/get-points', config)
        .then(res => {
            if (!res.data) {
                return console.log(res)
            }
            set_points(res.data)
        })
        .catch(e => {
            console.log(e.message)
        })
    }, [])

    function add_point() {

    }

    function delete_point() {
        
    }

    return {points, add_point, delete_point};
}
