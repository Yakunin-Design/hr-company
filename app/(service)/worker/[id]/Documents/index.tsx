import Image from "next/image";
import Padding from "@/components/std/Padding";
import Row from "@/components/std/Row";
import Card from "@/components/Card";

import document_icon from "./document_icon.svg";
import style from "../worker.module.css";

type props = {
	documents: string[],
}

export default function Documents(props: props) {
	const document_list = props.documents.map(doc => <DocumentPlate document={doc} />);

	return (
		<Padding className={style.card_padding}>
			<p className={style.label}>Документы (в разработке)</p>
			{document_list}
		</Padding>
	)
}

function DocumentPlate({document}: {document: string}) {
    return (
		<Card className={style.plate}>
			<Row>
				<Row gap={1}>
					<Image
						src={document_icon}
						alt="star icon"
					/>
				</Row>
				<h3 className={style.title}>{document}</h3>
			</Row>
		</Card>
    )
}
