import Image from "next/image";
import style from "./AvatarIcon.module.css";

type props = {
    title: string;
    avatar?: string;
};

export default function AvatarIcon(props: props) {
    return (
        <>
            {props.avatar ? (
                <Image
                    className={style.image}
                    src={props.avatar}
                    alt="avatar icon"
                    width={40}
                    height={40}
                />
            ) : (
                <div className={style.icon}>
                    <span>
                        {props.title.split(" ")[0][0]}
                        {props.title.split(" ")[1][0]}
                    </span>
                </div>
            )}
        </>
    );
}
