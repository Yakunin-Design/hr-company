export default function CloseIcon(props) {
    return (
        <svg width="38px" height="38px" viewBox="0 0 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg" className={props.point ? 'job-offer-row__close' : props.exp ? "experience__delete" :"--modal-sheet-close"} onClick={props.handle_click} style={props.hidden ? {opacity: 0, cursor: 'auto'} : {}}>
            <title>Group 4 Copy</title>
            <g id="06-|-Fild-Job" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="Full-HD-Copy" transform="translate(-1844.000000, -27.000000)" fill="#FFFFFF">
                    <g id="Group-4-Copy" transform="translate(1863.000000, 46.000000) rotate(-315.000000) translate(-1863.000000, -46.000000) translate(1850.000000, 33.000000)">
                        <path d="M13,-2.41762166e-12 C13.7023621,-2.41775068e-12 14.2717391,0.569377003 14.2717391,1.27173913 L14.2717391,24.7282609 C14.2717391,25.430623 13.7023621,26 13,26 C12.2976379,26 11.7282609,25.430623 11.7282609,24.7282609 L11.7282609,1.27173913 C11.7282609,0.569377003 12.2976379,-2.41749264e-12 13,-2.41762166e-12 Z" id="Rectangle" transform="translate(13.000000, 13.000000) rotate(-270.000000) translate(-13.000000, -13.000000) "></path>
                        <rect id="Rectangle" transform="translate(13.000000, 13.000000) rotate(-360.000000) translate(-13.000000, -13.000000) " x="11.7282609" y="0" width="2.54347826" height="26" rx="1.27173913"></rect>
                    </g>
                </g>
            </g>
        </svg>
    )
}