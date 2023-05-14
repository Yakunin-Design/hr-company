import { ObjectId } from 'mongodb';
import { subway, salary } from '../types/worker_types';

interface IJobOffer {
    // [Created by server]
    emoloyer_id: ObjectId;
    status: 'active' | 'closed';
    created: number;

    point_id?: string;
    candidates: ObjectId[];
    candidate_count: number;

    // Required [Passed by user]
    type: 'full time' | 'part time';

    specialty: string;
    city?: string;
    address?: string;
    subway?: subway;
    salary: salary;

    // General 
    experience?: number;
    schedule?: {
        weekdays: number;
        weekends: number;
    }
    working_time?: {
        start: string;
        end: string;
    }

    // Additional
    citizenships?: 'bu/uk' | 'ru' | 'sng' | 'other';
    sex?: 'male' | 'female' | 'any';
    age?: {
        from: number;
        to: number;
    }
    description?: string;
}

export default IJobOffer;