import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Card from "@/components/Card";
import Column from "@/components/std/Column";
import FaqAccordion from "@/components/FaqAccordion";
import FeedbackForm from "./FeedbackForm";

import data from "./dummy";
import Link from "next/link";
import styles from "./contact.module.css";

export default function ContactPage() {
    const first_section_qa = data.first.map(el => (
        <>
            <FaqAccordion question={el.q} answer={el.a} />
            <Spacer top="2" />
        </>
    ));

    return (
        <Container wrapper>
            <main className={styles.main}>
                <Column>
                    <Card>
                        <h2>Обратная свзязь</h2>
                        <Spacer top="1.5" />
                        <p>
                            Вы также можете написать нам на E-mail:{" "}
                            <span className={styles.link}>
                                <a
                                    href="mailto:test@hr-company.com"
                                    className={styles.link}
                                >
                                    test@hr-company.org
                                </a>
                            </span>
                        </p>
                        <Spacer top="1.5" />
                        <p className="--mt2">
                            Пожулуйста обратите внимание на{" "}
                            <Link href={"/faq"}>
                                <span className={styles.link}>
                                    частые вопросы
                                </span>
                            </Link>
                            . Ниже некоторые из них. Если не найдете ответ на
                            свой вопрос, используйте форму для обращения в
                            поддерждку.
                        </p>
                    </Card>
                    <Card>
                        {first_section_qa}
                        <Spacer top="-2" />
                    </Card>
                </Column>

                <Card>
                    <FeedbackForm/>
                </Card>
            </main>
        </Container>
    );
}
