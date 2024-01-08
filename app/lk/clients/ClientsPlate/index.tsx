import Card from "@/components/Card";
import Link from "next/link";

type props = {
    id: string;
    name: string;
};

export default function ClientsPlate(props: props) {
    return (
        <Link href={`/lk/clients/${props.id}`}>
            <Card>
                <h3>{props.name}</h3>
            </Card>
        </Link>
    );
}
