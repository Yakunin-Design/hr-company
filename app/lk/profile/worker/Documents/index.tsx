import Card from "@/components/Card";
import Spacer from "@/components/std/Spacer";

import styles from "./documents.module.css";
import DocumentBlock from "./DocunentBlock";
import WorkerData from "@/types/WorkerData";

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
            <Spacer top="2" />
            <h3>Документы (В разработке)</h3>

            <DocumentBlock
                name="passport"
                ownership={ownership.passport}
                flip={props.change_worker_documents}
            />
            <DocumentBlock
                name="medical_book"
                ownership={ownership.medical_book}
                flip={props.change_worker_documents}
            />
            <DocumentBlock
                name="employment_book"
                ownership={ownership.employment_book}
                flip={props.change_worker_documents}
            />
        </Card>
    );
}
