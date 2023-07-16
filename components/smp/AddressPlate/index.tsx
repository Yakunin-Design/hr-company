import styles from "./AddressPlate.module.css";
import Card from "@/components/Card";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Subway from "@/components/Subway";
import PositionsIndicator from "@/components/smp/PositionsIndicator";

type props = {
    school: string;
    address: string;
    subway?: string;
    worker_count: number;
    accepted?: number;
    onClick?: () => void;
};

export default function AddressPlate(props: props) {
    return (
        <div onClick={props.onClick}>
            <Card className={styles.card}>
                <Row>
                    <div>
                        <h3 className={styles.headers}>{props.school}</h3>
                        {props.subway && (
                            <>
                                <Spacer top={1} />
                                <Subway station={props.subway} />
                            </>
                        )}
                        <p>{props.address}</p>
                    </div>

                    <PositionsIndicator
                        available={props.accepted}
                        positions={props.worker_count}
                    />
                </Row>
            </Card>
        </div>
    );
}
