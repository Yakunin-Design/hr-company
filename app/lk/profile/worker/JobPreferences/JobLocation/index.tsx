import Input from "@/components/std/Inputs/Input";
import SubwayInput from "@/components/std/Inputs/SubwayInput";
import Row from "@/components/std/Row";

import districts from "@/data/districts.js";
import style from "./place.module.css";

type props = {
    district: string;
    subway: string;
    onChange: (value: string) => void;
    edit_errors: Array<string>;
};

const error_style = {
    border: "2px solid red",
};

export default function JobLocation(props: props) {
    return (
        <Row className={style.location}>
            <div className={style.district}>
                <Input
                    name="district"
                    label="Район"
                    value={props.district}
                    onChange={props.onChange}
                    list="districts"
                    style={
                        props.edit_errors.includes("district")
                            ? error_style
                            : {}
                    }
                />
            </div>
            <div className={style.subway}>
                <SubwayInput
                    value={props.subway}
                    onChange={props.onChange}
                    style={
                        props.edit_errors.includes("subway") ? error_style : {}
                    }
                />
            </div>

            <datalist id="districts">
                {districts.map(district => (
                    <option value={district}>{district}</option>
                ))}
            </datalist>
        </Row>
    );
}
