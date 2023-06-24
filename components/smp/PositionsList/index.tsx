import Column from "@/components/std/Column";
import PositionBlock from "./PositionBlock";
import style from "./positionList.module.css";

export type candidate = {
    id: string;
    avatar: string;
    fullname: string;
};

type position = {
    position: string;
    quontity: number;
    working_hours: {
        from: string;
        to: string;
    };
    candidates: candidate[];
    accepted: string[];
};

type props = {
    positions: position[];
    add_position: boolean;
    delete_position?: (position: string) => void;
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
            position: position.position,
        };
        workers.push(<PositionBlock position_data={position_data} />);
    }
    return workers;
};

const get_empty_cards = (
    position: position,
    add_position: boolean,
    delete_position?: (position: string) => void
) => {
    const quontity = position.quontity - position.accepted.length;
    const cards = [];
    if (add_position) {
        const position_data = {
            candidates: position.candidates,
            position: position.position,
            quontity: position.quontity,
            time: `c ${position.working_hours.from} ${
                position.working_hours.to && `до ${position.working_hours.to}`
            }`,
        };

        cards.push(
            <PositionBlock
                position_data={position_data}
                add_position
                onClick={delete_position}
            />
        );
    } else {
        for (let i = 0; i < quontity; i++) {
            const position_data = {
                candidates: position.candidates,
                position: position.position,
                quontity: position.quontity,
                time: `c ${position.working_hours.from} ${
                    position.working_hours.to &&
                    `до ${position.working_hours.to}`
                }`,
            };
            cards.push(
                <PositionBlock
                    position_data={position_data}
                    add_position
                    onClick={delete_position}
                />
            );
        }
    }
    return cards;
};

export default function PositionList(props: props) {
    const positions = props.positions.map(position => {
        const workers = get_workers(position);
        const cards = get_empty_cards(
            position,
            props.add_position,
            props.delete_position
        );
        return [...workers, ...cards];
    });
    return <Column className={style.list}>{positions}</Column>;
}
