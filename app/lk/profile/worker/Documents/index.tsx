import Card from "@/components/Card";
import Button from "@/components/std/Button";
import Spacer from "@/components/std/Spacer";

import styles from "./documents.module.css";
import DocumentBlock from "./DocunentBlock";

export default function Documents() {
    return (
        <Card className={styles.document_block}>
            <Spacer top="2" />
            <h3>Документы (В разработке)</h3>

            <DocumentBlock
                active="show"
                name="Паспорт РФ"
                foreign="4 018 *** ***"
            />
            <DocumentBlock active="delete" name="Мед. книжка" />

            <Spacer top="1" />
            <Button common>Добавить документ +</Button>
        </Card>
    );
}
