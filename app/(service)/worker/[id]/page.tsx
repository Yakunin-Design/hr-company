import Overlay from "@/components/Overlay";
import Container from "@/components/std/Container";
import Spacer from "@/components/std/Spacer";
import Padding from "@/components/std/Padding";

import style from "./worker.module.css";
import RatingPlate from "./RatingPlate";
import MainInfo from "./MainInfo";
import get_data from "./get_data";
import Documents from "./Documents";
import Specialty from "./Specialty/Specialy";

type params = {
    id: string;
}

export default async function WorkerPage({params}: {params: params}) {
	const worker = await get_data(params.id);

    return (
		<Container wrapper>
			<Overlay href="/find-workers" avatar={worker.avatar}>
				<Padding className={style.card_padding}>
					<Spacer top={1} bottom={3}>
						<h2 className="--cd">{worker.full_name}</h2>
					</Spacer>
					{/* <RatingPlate rating={4.7} review_count={127}/>	 */}
					<Specialty specialties={worker.specialtes} />
				</Padding>

				<MainInfo {...worker.main_info}/>
				<Documents documents={worker.documents}/>

				<Spacer top={5} />
			</Overlay>
		</Container>
    )
}
