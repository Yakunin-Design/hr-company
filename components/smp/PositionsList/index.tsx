import Column from "@/components/std/Column";
import PositionBlock from "./PositionBlock";
import style from "./positionList.module.css";

export type candidate = {
    id: string;
    avatar: string;
    fullname: string;
};

type position = {
    specialty: string;
    count: number;
    time: number;
    candidates: candidate[];
    accepted: string[];
};

type props = {
    positions: position[];
};

const get_workers = (position: position) => {
    const accepted = position.accepted.length;
    const workers = [];
    for (let i = 0; i < accepted; i++) {
        const userdata = position.candidates.find(candidate => {
            return candidate.id === position.accepted[i];
        });
        if (!userdata) {
            return [];
        }
        const position_data = {
            ...userdata,
            specialty: position.specialty,
        };
        workers.push(<PositionBlock position_data={position_data} />);
    }
    return workers;
};

const get_empty_cards = (position: position) => {
    const count = position.count - position.accepted.length;
    const cards = [];
    for (let i = 0; i < count; i++) {
        const position_data = {
            candidates: position.candidates,
            specialty: position.specialty,
            time: position.time,
        };
        cards.push(<PositionBlock position_data={position_data} />);
    }
    return cards;
};

export default function PositionList(props: props) {
    const positions = props.positions.map(position => {
        const workers = get_workers(position);
        const cards = get_empty_cards(position);
        return [...workers, ...cards];
    });
    return <Column className={style.list}>{positions}</Column>;
}
