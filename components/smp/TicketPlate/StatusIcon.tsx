import { ticket_status } from "@/types/ticket_status";
import progress_icon from "@/assets/svg/checkmark.svg";
import archive_icon from "@/assets/svg/archive.svg";
import pending_icon from "@/assets/svg/cross.svg";
import default_icon from "@/assets/svg/cross.svg";
import Image from "next/image";

type props = {
    icon: ticket_status;
};

export default function StatusIcon(props: props) {
    let icon = default_icon;

    if (props.icon === "pending") icon = pending_icon;
    if (props.icon === "in progress") icon = progress_icon;
    if (props.icon === "closed") icon = archive_icon;

    return <Image src={icon} alt="status icon" width={14} height={14} />;
}
