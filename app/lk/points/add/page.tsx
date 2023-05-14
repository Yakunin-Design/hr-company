"use client"
import Container from "@/components/std/Container";
import { CheckUser } from "../../checkUser";
import Row from "@/components/std/Row";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";
import user_controller from "../../user_controller";
import point_controller from "../point_controller";
import Point from "../Point";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PointForm from "./PointForm";
import Overlay from "@/components/Overlay";

export default function Page() {
    const {
        user,
        set_user,
    } = user_controller();

    CheckUser(set_user);
    const router = useRouter()
    useEffect(() => {
        user.user_type === "worker" && router.push("/lk/profile")
    },[])

    const {
        points,
        form_data,
        handle_change,
        errors,
        add_point
    } = point_controller();

    let point_list = [];
    if (points) {
        //@ts-ignore
        point_list = points.map(point => <Point data={point} key={point._id}/>);
    }

    return (
        <>
        <Overlay>
            <PointForm add={add_point} data={form_data} onChange={handle_change} errors={errors}/>
        </Overlay>
        <Container lk wrapper>
            <Spacer top="2" />
            <Row>
                <h2>Создание точки</h2>
                <Link
                    href="/lk/points/add"
                >
                    <Button>Создать точку</Button>
                </Link>
            </Row>
            <div>
                {
                    point_list.length > 0 
                    ?
                    point_list
                    :
                    <h3>Вы еще не добавили ни одной точки</h3>
                }
            </div>
        </Container>
        </>
    );
}
