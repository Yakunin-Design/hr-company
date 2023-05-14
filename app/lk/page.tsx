"use client"

import { useEffect } from "react"

export default function Page() {
    useEffect(()=> {
        window.location.href = "/lk/profile"
    }, [])
    return <></>
}