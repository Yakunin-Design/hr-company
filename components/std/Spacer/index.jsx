export default function Spacer(props) {
    const { top, bottom, left, children } = props;

    const style = {
        marginTop: top ? `${top}rem` : "0rem",
        marginBottom: bottom ? `${bottom}rem` : "0rem",
        marginLeft: left ? `${left}rem` : "0rem",
    };

    if (top || bottom) return <div style={style}>{children}</div>;
    else return <span style={style}>{children}</span>;
}
