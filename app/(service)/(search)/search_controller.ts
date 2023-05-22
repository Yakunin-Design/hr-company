"use client"
import axios from "axios"
import { useEffect, useState } from "react"

type worker = {
    _id: string,
    full_name: string,
    specialty: string,
    is_ready: boolean,
    logo: string,
}

export default function search_controller(type: "job" | "workers") {
    const [query, set_query] = useState({
        string: "",
        filters: {}
    })
    const [results, set_results] = useState<Array<worker | any>>([])
    const [bubbles, set_bubbles] = useState([])
    const [all_bubbles, set_all_bubbles] = useState([])

    useEffect(()=>{
        const url = `${process.env.API_ADDRESS}/find-${type}`
        
        axios
        .get(url)
        .then(res => {
            set_results(type=="job" ? res.data.jo : res.data.workers)
            set_bubbles(res.data.bubbles)
            set_all_bubbles(res.data.bubbles)
        })
    },[])

    function handle_change(event: any) {
        const {name, value} = event.target
        if (name === "query") {
            set_query(prev => {
                return {
                    ...prev,
                    string: value
                }
            })
            if (value != "") {
                set_bubbles(
                    all_bubbles.filter(
                        (bubble: string) => bubble.toLocaleLowerCase().includes(value.toLocaleLowerCase())
                    )
                )
            } else {
                set_bubbles(all_bubbles)
            }
        } else {
            set_query(prev => {
                return {
                    ...prev,
                    filters: {
                        ...prev.filters,
                        [name]: value
                    }
                }
            })
        }
        
    }

    function search() {
        const url = `${process.env.API_ADDRESS}/find-${type}`
        axios
        .post(url,query)
        .then(res => {
            console.log(res.data);
            set_results(res.data)
        })
    }

    function append_bubble(value: string) {
        handle_change({target: {name: 'query', value}})
    }

    return {query, handle_change, results, bubbles, search, append_bubble}
}