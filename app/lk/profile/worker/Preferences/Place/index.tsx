import Input from "@/components/std/Inputs/Input";
import Row from "@/components/std/Row";

import districts from "@/data/districts.js";
import subway_stations from "@/data/subway_stations.js";

type props = {
    district: string;
    subway: string;
    onChange: (value: string) => void;
};

export default function Place(props: props) {
    return (
        <Row>
            <div>
                <Input
                    name="district"
                    label="Район"
                    value={props.district}
                    onChange={props.onChange}
                    list="districts"
                />
            </div>
            <div>
                <Input
                    name="subway"
                    label="Метро"
                    value={props.subway}
                    onChange={props.onChange}
                    list="subways"
                />
            </div>

            <datalist id="subways">
                {subway_stations.map(station => (
                    <option value={station}>{station}</option>
                ))}
            </datalist>
            <datalist id="districts">
                {districts.map(district => (
                    <option value={district}>{district}</option>
                ))}
            </datalist>
        </Row>
    );
}
