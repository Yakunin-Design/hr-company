type props = {
    children: React.ReactNode;
	horisontal?: number,
	vertical?: number,

    onClick?: () => void;
    className?: string;
    title?: string;
};

export default function Padding(props: props) {
	const style = {
		paddingTop: (props.vertical || 0) + "rem",
		paddingBottom: (props.vertical || 0) + "rem",

		paddingRight: (props.horisontal || 0) + "em",
		paddingLeft: (props.horisontal || 0) + "em",
	}

    return (
        <div className={props.className} onClick={props.onClick} title={props.title} style={style}>
            {props.children}
        </div>
    );
}
