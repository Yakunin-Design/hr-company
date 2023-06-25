import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Padding from "@/components/std/Padding";

import style from "./jobOffer.module.css";
import get_data from "./get_data";

type params = {
    id: string;
}

export default async function JobOffers({params}: {params: params}) {
	const jo_data = await get_data(params.id);

    return (
		<Container wrapper>
			<Overlay href="/job-offers">
				<Padding className={style.card_padding}>
					<Spacer top={1} bottom={3}>
						<h2 className="--cd">{jo_data.position}</h2>
					</Spacer>
				</Padding>


				<Spacer top={5} />
			</Overlay>
		</Container>
    )
}
