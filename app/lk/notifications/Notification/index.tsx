import Row from "@/components/std/Row";
import Card from "@/components/Card";
import Link from "next/link";

type props = {
    text: string;
    timestamp: string;
    icon?: "warn" | "success" | "error";
    proposal_id: string;
};

export default function Notification(props: props) {
    let icon = "ℹ️";
    if (props.icon === "warn") icon = "⚠️";
    if (props.icon === "success") icon = "✅";
    if (props.icon === "error") icon = "❌";

    return (
        <Link href={`/proposal/${props.proposal_id}`}>
            <Card>
                <Row>
                    <div>
                        <h3>
                            {icon} {props.text}
                        </h3>
                        <p>{props.timestamp}</p>
                    </div>
                    ❌
                </Row>
            </Card>
        </Link>
    );
}
