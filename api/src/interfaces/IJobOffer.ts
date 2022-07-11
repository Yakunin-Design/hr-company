interface IJobOffer {
    emoloyer_id: string;

    specialty: string;
    type: 'full time' | 'part time';

    point_id?: string;
}

export default IJobOffer;