type props = {
    children: React.ReactNode;
    horisontal?: number;
    vertical?: number;

    onClick?: () => void;
    className?: string;
    title?: string;
};

export default function Padding(props: props) {
    let style = {};
    if (props.vertical || props.horisontal) {
        style = {
            paddingTop: props.vertical + "rem",
            paddingBottom: props.vertical + "rem",

            paddingRight: props.horisontal + "em",
            paddingLeft: props.horisontal + "em",
        };
    }

    return (
        <div
            className={props.className}
            onClick={props.onClick}
            title={props.title}
            style={style}
        >
            {props.children}
        </div>
    );
}
