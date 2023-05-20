import Input from "@/components/std/Inputs/Input";
import SubwayInput from "@/components/std/Inputs/SubwayInput";
import Row from "@/components/std/Row";

import districts from "@/data/districts.js";
import style from "./place.module.css";
import Spacer from "@/components/std/Spacer";

type props = {
    city: string;
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
        <>
            <Row className={style.location}>
                <div className={style.city}>
                    <Input
                        name="city"
                        label="Город"
                        value={props.city}
                        onChange={props.onChange}
                        disabled
                        style={
                            props.edit_errors.includes("city")
                                ? error_style
                                : {}
                        }
                    />
                </div>
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
                {/* 
                    <Districts city={city}>
                */}
                <datalist id="districts">
                    {districts.map(district => (
                        <option value={district}>{district}</option>
                    ))}
                </datalist>
            </Row>
            <Spacer top='1' />
            <div className={style.subway}>
                <SubwayInput
                    value={props.subway}
                    onChange={props.onChange}
                    style={
                        props.edit_errors.includes("subway") ? error_style : {}
                    }
                />
            </div>
        </>

    );
}
