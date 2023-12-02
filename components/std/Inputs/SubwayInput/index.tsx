import subway_stations from "./subway_stations";
import Input from "../Input";
import styles from "./subway_input.module.css";
import Image from "next/image";

import subway_icon from "./subway_icon.svg";
import get_branch_color from "./get_branch_color";
import { CSSProperties, ChangeEvent } from "react";

type props = {
    value: string;
    onChange:
        | ((value: string) => void)
        | ((event: ChangeEvent<HTMLInputElement>) => void);
    label?: string;
    style?: CSSProperties;
};

// Only works with metro stations of Saint. P, Russia

export default function SubwayInput(props: props) {
    // padding that changes when icon is set

    const input_padding = subway_stations.includes(props.value)
        ? { paddingLeft: "3em" }
        : { paddingLeft: "1.2em" };

    const subway_station_icon_color = get_branch_color(props.value);

    const input_style = props.style || {};

    Object.assign(input_padding, input_style);

    return (
        <div className={styles.parant}>
            <Input
                name="subway"
                label={props.label || "Метро"}
                value={props.value}
                onChange={props.onChange}
                list="subways"
                style={input_padding}
            />
            {subway_stations.includes(props.value) && (
                <div
                    className={styles.subway_icon}
                    style={{ background: subway_station_icon_color }}
                >
                    <Image
                        src={subway_icon}
                        alt="Metro station icon"
                        width={12}
                        height={12}
                    />
                </div>
            )}

            <datalist id="subways">
                {subway_stations.map(station => (
                    <option value={station} key={station}>
                        {station}
                    </option>
                ))}
            </datalist>
        </div>
    );
}
