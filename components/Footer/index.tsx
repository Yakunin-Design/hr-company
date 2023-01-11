import Link from "next/link";
import Container from "@/components/std/Container";
import Row from "@/components/std/Row";

import styles from "./footer.module.css";

export default function Footer(props : {lk?: boolean}) {
    return (
        <footer className={styles.footer}>
            <Container lk={props.lk}>
                <Row className={styles.content}>
                    <h3>Hr company</h3>
                    <div className={styles.grid}>
                        <Link href="/faq" className={styles.link}>
                            Частые вопросы
                        </Link>
                        <Link href="/contact" className={styles.link}>
                            Обратная связь
                        </Link>
                        <Link href="/terms-of-use" className={styles.link}>
                            Пользовательское соглашение
                        </Link>
                        <Link href="/loyalty" className={styles.link}>
                            Партнеры
                        </Link>
                    </div>
                </Row>
            </Container>
        </footer>
    );
}
