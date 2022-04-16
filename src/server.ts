// tests
import './tests/models';
import { Organization } from './models/Organization';
import { FullTimeJobOffer } from './interfaces/JobOffer';

const YakuninDesign = new Organization('Yakunin Design');

const job1: FullTimeJobOffer = {
    host: YakuninDesign,
    title: 'Sheff',
    location: {
        metro_station: 'Begovaya',
        address: 'Drortsovaya 1'
    },
    description: 'We need an awesome sheff',
    hour_rate: 260,
    skills: [
        {
            title: 'responsebility',
            priority: 5
        }
    ],
    scedule: {
        work_days: 2,
        non_working_days: 2
    }
}

YakuninDesign.add_job_offer(job1);

YakuninDesign.log_all_job_offers();
