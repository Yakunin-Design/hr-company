import styles from "./avatar.module.css";
import logo from "./logo.svg";
import Image from "next/image";
type props = {
    input?: boolean;
    value?: string;
    onChange?: (event: any) => void;
};

export default function Avatar(props: props) {
    return (
        <div className={styles.avatar}>
            {props.input ? (
                <>
                    <input
                        className={styles.input}
                        id="logo"
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={event => props.onChange!(event)}
                    />
                    <label htmlFor="logo">
                        {props.value ? (
                            <Image
                                className={styles.photo}
                                src={props.value}
                                alt=""
                                width={22}
                                height={22}
                            />
                        ) : (
                            <Image className={styles.plug} src={logo} alt="" />
                        )}
                    </label>
                </>
            ) : (
                <div>
                    {props.value ? (
                        <Image
                            className={styles.photo}
                            src={props.value}
                            alt=""
                        />
                    ) : (
                        <Image className={styles.plug} src={logo} alt="" />
                    )}
                </div>
            )}
        </div>
    );
}
