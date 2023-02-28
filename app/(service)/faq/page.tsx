import Container from '@/components/std/Container';
import Spacer from '@/components/std/Spacer';
import FaqAccordion from '@/components/FaqAccordion';

import styles from './faq.module.css';
import Link from 'next/link';
import Card from '@/components/Card';
import Column from '@/components/std/Column';

import data from './dummy';

export default function FaqPage() {
    const fist_section_qa = data.first.map(el => (
        <>
            <FaqAccordion question={el.q} answer={el.a} />
            <Spacer top="2" />
        </>
    ));

    const second_section_qa = data.second.map(el => (
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
                        <h2>Частые вопросы</h2>
                        <Spacer top="1.5" />
                        <p>
                            Не нашли ответа на свой вопрос? Тогда задайте нам
                            вопрос на{' '}
                            <Link href="/contact">
                                <span className={styles.link}>
                                    странице обратной связи
                                </span>
                            </Link>
                            .
                        </p>
                    </Card>
                    <Card>
                        {fist_section_qa}
                        <Spacer top="-2" />
                    </Card>
                </Column>

                <Card>
                    {second_section_qa}
                    <Spacer top="-2" />
                </Card>
            </main>
        </Container>
    );
}
