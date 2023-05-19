import Container from "@/components/std/Container";
import Search from "../Search";
import Spacer from "@/components/std/Spacer";
export default function FindJobPage() {
    return (
        <Container wrapper>
            <Spacer top={3} bottom={1}>
                <h2>Найти работу</h2>
            </Spacer>
            <Search/>
        </Container>
    )
}