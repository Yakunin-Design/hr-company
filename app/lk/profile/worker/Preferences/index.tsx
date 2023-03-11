import Card from "@/components/Card";
import Radio from "@/components/std/Inputs/Radio";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import Place from "./Place";

import style from "./preferences.module.css";

type Props = {
    job_type?: string;
    district?: string;
    subway?: string;
    salary?: {
        amount: number;
        period: string;
    };
    handle_change: (event: any) => void;
};

export default function Preferences(props: Props) {
    return (
        <Card>
            <h3>Тип работы</h3>
            <Spacer top="1" />
            <Row className={style.type}>
                <Radio
                    name="job_type"
                    value="any"
                    currentValue={props.job_type!}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Любая
                </Radio>

                <Radio
                    name="job_type"
                    value="part_time"
                    currentValue={props.job_type!}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Временная
                </Radio>

                <Radio
                    name="job_type"
                    value="full_time"
                    currentValue={props.job_type!}
                    onChange={props.handle_change}
                    style={{}}
                    lk
                >
                    Постоянная
                </Radio>
            </Row>

            <Spacer top="2" />
            <Place
                district={props.district!}
                subway={props.subway!}
                onChange={props.handle_change}
            />
        </Card>
    );
}
