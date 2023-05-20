"use client"
import Container from "@/components/std/Container";
import search_controller from "../search_controller";
import WorkerCard from "@/components/WorkerCard";
import Spacer from "@/components/std/Spacer";
import Search from "../Search";
import style from "../searchPage.module.css"

export default function FindWorkersPage() {

    const {query, results, bubbles, handle_change, search, append_bubble} = search_controller("workers");

    const workers = results.length > 0 ? 
    results.map((worker) => {
        return <WorkerCard worker_data={worker} key={worker._id}/>
    })
    :
    <></>

    return (
        <Container wrapper>
            <Spacer top={3} bottom={1}>
                <h2>Найти сотрудников</h2>
            </Spacer>
            <Search 
                query={query} 
                handle_change={handle_change} 
                search={search} 
                bubbles={bubbles} 
                append_bubble={append_bubble}
                type="worker"/>
            <div className={style.workers}>
                {workers}
                {workers}
                {workers}
                {workers}
            </div>
        </Container>
    )
}