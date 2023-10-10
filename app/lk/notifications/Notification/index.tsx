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
	const date = new Date(props.timestamp);

	const dispaly_date = date.toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
		day: "numeric",
		month: "long"
	});

	const dispaly_time = date.toLocaleString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "numeric",
        minute: "numeric",
	});

    const full_date = dispaly_date + " " + dispaly_time;

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
                        <p>{full_date}</p>
                    </div>
                    ❌
                </Row>
            </Card>
        </Link>
    );
}
