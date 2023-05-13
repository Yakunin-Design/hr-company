"use client"
import Container from "@/components/std/Container";
import { CheckUser } from "../checkUser";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import user_controller from "../user_controller";
import point_controller from "./point_controller";
import Point from "./Point";

export default function Page() {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(set_user);

    const {
        points,
        add_point
    } = point_controller();

    console.log(points);

    let point_list;
    if (points) {
        //@ts-ignore
        point_list = points.map(point => <Point data={point} key={point._id}/>);
    }

    return (
        <Container lk>
            <Spacer top="2" />
            <Row>
                <h2>Ваши точки</h2>
                <Button>Создать точку</Button>
            </Row>
            <div>
                {point_list}
            </div>
        </Container>
    );
}
