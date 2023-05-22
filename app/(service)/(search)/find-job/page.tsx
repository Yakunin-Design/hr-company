"use client"
import Container from "@/components/std/Container";
import Search from "../Search";
import Spacer from "@/components/std/Spacer";
import search_controller from "../search_controller";
import JobOfferCard from "@/components/JobOfferCard";
import style from "../searchPage.module.css"


export default function FindJobPage() {
    const {query, results, bubbles, handle_change, search, append_bubble} = search_controller("job");

    const job_offers = results.length > 0 ? 
    results.map(jo => <JobOfferCard jo_data={jo} key={jo._id}/>)
    :
    <></>

    return (
        <Container wrapper>
            <Spacer top={3} bottom={1}>
                <h2>Найти работу</h2>
            </Spacer>
            <Search 
                query={query} 
                handle_change={handle_change} 
                search={search} 
                bubbles={bubbles} 
                append_bubble={append_bubble}
                type="job"/>
                
            <div className={style.jobs}>
                {job_offers}
            </div>
        </Container>
    )
}