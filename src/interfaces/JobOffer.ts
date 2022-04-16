import { Employer } from '../models/Employer';

type location = {
    metro_station: string;
    address: string;
}

type scedule = {
    work_days: number;
    non_working_days: number; 
}

interface skill {
    title: string;
    priority: number;
}

interface JobOffer {
    host: Employer;
    title: string;
    location: location;
    description: string;
    hour_rate: number;
    skills: skill[];
}

interface FullTimeJobOffer extends JobOffer {
    scedule: scedule;
}

interface EventJobOffer extends JobOffer {
    start_date: Date;
    end_date: Date;
    guest_count: number;
    stuff_count: number;
}

export { JobOffer, EventJobOffer, FullTimeJobOffer }