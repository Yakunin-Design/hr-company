import Container from "@/components/std/Container";
import Search from "../Search";
import Spacer from "@/components/std/Spacer";
import axios from "axios";

async function get_jobs() {
    // return axios.post();
    return {}
}

export default async function FindJobPage() {
    const res = await get_jobs();

    console.log(res);

    // jobOffers = map(res.body)

    return (
        <Container wrapper>
            <Spacer top={3} bottom={1}>
                <h2>Найти работу</h2>
            </Spacer>
            <Search/>
        </Container>
        // {jobOffers}
    )
}