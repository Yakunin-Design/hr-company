import Row from "@/components/std/Row";
import Card from "@/components/Card";

type props = {
    text: string;
    timestamp: string;
    icon?: "warn" | "success" | "error";
};

export default function Notification(props: props) {
    let icon = "ℹ️";
    if (props.icon === "warn") icon = "⚠️";
    if (props.icon === "success") icon = "✅";
    if (props.icon === "error") icon = "❌";

    return (
        <Card>
            <Row>
                <Row gap={1}>
                    <p>{icon}</p>
                    <div>
                        <h3>{props.text}</h3>
                        <p>{props.timestamp}</p>
                    </div>
                </Row>
                clear
            </Row>
        </Card>
    );
}
