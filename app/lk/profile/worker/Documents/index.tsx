import Card from "@/components/Card";

import styles from "./documents.module.css";
import DocumentBlock from "./DocunentBlock";
import WorkerData from "@/types/WorkerData";
import Spacer from "@/components/std/Spacer";

type props = {
    user: { user_type: string; user_data: WorkerData };
    change_worker_documents: (
        document_type: "passport" | "medical_book" | "employment_book"
    ) => void;
};

export default function Documents(props: props) {
    const ownership = props.user.user_data.documents;
    if (!ownership) return <h1>BRUH</h1>;

    return (
        <Card className={styles.document_block}>
            <h3>Документы</h3>
            <Spacer top={1} />
            <DocumentBlock
                name="passport"
                ownership={ownership.passport}
                flip={props.change_worker_documents}
            />
            <Spacer top={1} />
            <DocumentBlock
                name="medical_book"
                ownership={ownership.medical_book}
                flip={props.change_worker_documents}
            />
            <Spacer top={1} />
            <DocumentBlock
                name="employment_book"
                ownership={ownership.employment_book}
                flip={props.change_worker_documents}
            />
        </Card>
    );
}
