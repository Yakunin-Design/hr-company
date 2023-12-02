import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import SchoolPlate from "./SchoolPlate";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Link from "next/dist/client/link";
import get_data from "./get_data";

export default async function SchoolsPage() {
    const schools_data = await get_data();

    const schools_list = schools_data.map((school: any) => (
        <>
            <SchoolPlate
                school_id={school._id}
                school_name={school.school_name}
                school_number={school.school_number}
                subway={school.subway}
                key={school.id}
            />
            <Spacer top={1} />
        </>
    ));

    return (
        <Container wrapper lk>
            <Spacer top={1} />
            <Row>
                <h2>Ваши адреса</h2>
                <Link href={`/lk/schools/new`}>
                    <Button secondary>Добавить адрес +</Button>
                </Link>
            </Row>

            {schools_list}
        </Container>
    );
}
