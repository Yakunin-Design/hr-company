import Card from "@/components/Card";
import SalaryRangeInput from "@/components/SalaryRangeInput";
import Radio from "@/components/std/Inputs/Radio";
import Row from "@/components/std/Row";
import Spacer from "@/components/std/Spacer";
import JobLocation from "./JobLocation";

import style from "./preferences.module.css";

type props = {
    job_type?: string;
    district?: string;
    subway?: string;
    salary?: {
        amount: number;
        period: string;
    };
    handle_change: (event: any) => void;
    edit_errors: Array<string>;
};

export default function JobPreferences(props: props) {
    return (
        <Card>
            {/* Part time / full time selection */}
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
            <SalaryRangeInput
                salary={props.salary}
                handle_change={props.handle_change}
            />

            {/* JobLocation */}
            <Spacer top="2" />
            <JobLocation
                district={props.district!}
                subway={props.subway!}
                onChange={props.handle_change}
                edit_errors={props.edit_errors}
            />
        </Card>
    );
}
