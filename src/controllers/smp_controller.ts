import { Request, Response } from "express";
import { ObjectId, WithId } from "mongodb";
import db from "../lib/idb";
import { ITicket } from "../interfaces/ITicket";
import Result from "../lib/Result";

async function new_ticket(req: Request, res: Response) {
    try {
        const data = req.body;

        // Data prep for ticket creation
        const comment = data.comment;
        const date_of_creation = new Date();
        const status = "pending";
        const extended = false;
        const company_name = data.company_id;
        let accepted = 0;
        const realization_date = data.date;

        let total_workers_count = 0;
        // calculating workers count
        data.addresses.map(adr =>
            adr.positions.map(position => {
                total_workers_count += Number(position.quontity);
            })
        );

        /**
         * Getting company ID || creating a new company
         */
        let company_id: ObjectId = new ObjectId();
        let ticket_city = "";
        const db_company = await db.find(
            { name: data.company_id },
            "smp_clients"
        );
        if (db_company.Err) return res.status(500).send("db failed");

        // Creating new company
        if (db_company.Ok === null) {
            const city = "Санкт-Петербург";
            const new_company = {
                name: data.company_id,
                city: city,
            };

            const db_result = await db.save(new_company, "smp_clients");
            if (db_result.Err) return res.status(500).send("db failed");
            if (db_result.Ok) {
                company_id = db_result.Ok;
                ticket_city = city;
            }
        } else {
            company_id = db_company.Ok._id;
            ticket_city = db_company.Ok.city;
        }

        /**
         * Getting addresses
         */
        const addresses = await Promise.all(
            data.addresses.map(async adr => {
                // Getting school id || creating new school
                let school_id;
                const db_school = await db.find(
                    {
                        $and: [
                            { city: ticket_city },
                            { number: adr.school_number },
                        ],
                    },
                    "schools"
                );
                if (db_school.Err) return res.status(500).send("db failed");

                if (db_school.Ok === null) {
                    const new_school = {
                        city: ticket_city,
                        contact: adr.contact,
                        phone: adr.phone,
                        number: adr.school_number,
                        address: adr.address,
                        subway: adr.subway,
                    };

                    const new_school_query = await db.save(
                        new_school,
                        "schools"
                    );
                    if (!new_school_query.Ok)
                        return res.status(500).send("db failed");
                    school_id = new_school_query.Ok;
                } else {
                    if (
                        db_school.Ok.contact != adr.contact ||
                        db_school.Ok.phone != adr.phone
                    ) {
                        const update_result = await db.update(
                            { _id: db_school.Ok._id },
                            {
                                $set: {
                                    contact: adr.contact,
                                    phone: adr.phone,
                                },
                            },
                            "schools"
                        );
                        if (!update_result.Ok)
                            return res.status(500).send("db failed");
                    }
                    school_id = db_school.Ok._id;
                }

                // Returning arress (school + positions)
                return {
                    school_id: school_id,
                    positions: adr.positions.map(pos => {
                        return { ...pos, price: 100 };
                    }),
                };
            })
        );

        // Saving tickiet to db
        const ticket_data: ITicket = {
            company_id,
            company_name,
            date_of_creation,
            realization_date,
            status,
            extended,
            city: ticket_city,
            total_workers_count,
            accepted,
            comment,
            addresses,
        };

        const new_ticket = await db.save(ticket_data, "tickets");
        if (new_ticket.Err) return res.status(500).send("db failed");

        res.status(200).send("Ticket created");
    } catch (e) {
        console.log("Ticket creation failed, err: " + e);
        res.status(500).send("Something went wrong!");
    }
}

async function get_all_tickets(req: Request, res: Response) {
    const tickets = await db.find_all({}, "tickets");
    if (tickets.Err) return res.status(500).send("db failed");

    const response_tickets = tickets.Ok?.map(ticket => {
        return {
            _id: ticket._id,
            total_workers_count: ticket.total_workers_count,
            accepted: ticket.accepted,
            status: ticket.status,
            realization_date: ticket.realization_date,
            company_id: ticket.company_name,
        };
    });

    res.status(200).send(response_tickets);
}

async function get_ticket_by_id(req: Request, res: Response) {
    try {
        // get ticket id
        const ticket_id = new ObjectId(req.params.id);

        // find ticket in db
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (db_ticket.Err) return res.status(500).send("db failed");

        if (db_ticket.Ok === null)
            return res.status(500).send("bruh why is it null");

        // getting data setup for frontend (school data + worker_count & accepted)
        const address_data = await Promise.all(
            db_ticket.Ok.addresses.map(async adr => {
                // get all school data
                const address = await db.find(
                    { _id: adr.school_id },
                    "schools"
                );

                // getting worker count & accepted count
                let worker_count = 0;
                let accepted = 0;
                adr.positions.map(pos => {
                    worker_count += Number(pos.quontity);
                    accepted += pos.accepted.length;
                });

                return {
                    ...address.Ok,
                    worker_count,
                    accepted,
                };
            })
        );

        const response_data = {
            ...db_ticket.Ok,
            addresses: address_data,
        };

        // send the ticket
        res.status(200).send(response_data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function get_address(req: Request, res: Response) {
    try {
        // get ticket id
        const ticket_id = new ObjectId(req.params.id);
        const adress_number = req.params.number;

        // find ticket in db
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (db_ticket.Err) return res.status(500).send("db failed");

        if (db_ticket.Ok === null)
            return res.status(404).send("ticket was not found :(");

        // getting data setup for frontend (school data + worker_count & accepted)
        if (adress_number > db_ticket.Ok.addresses.length) {
            return res.status(404).send("address not found :(");
        }
        const address_data = db_ticket.Ok.addresses[adress_number];

        const school = await db.find(
            { _id: address_data.school_id },
            "schools"
        );
        if (school.Err) return res.status(500).send("");

        const new_address_data = await Promise.all(
            address_data.positions.map(async pos => {
                const accepted_worker_data = await Promise.all(
                    pos.accepted.map(async id => {
                        const db_worker = await db.find({ _id: id }, "workers");

                        if (db_worker.Err || db_worker.Ok === null)
                            return res.status(400).send("get_address failed");

                        const worker_preview_data = {
                            id: db_worker.Ok._id,
                            full_name: db_worker.Ok.full_name,
                            avatar: db_worker.Ok.logo
                                ? db_worker.Ok.logo
                                : null,
                        };

                        return worker_preview_data;
                    })
                );
                pos.accepted = accepted_worker_data;
                return pos;
            })
        );

        const response_data = {
            ...school.Ok,
            school_id: address_data.school_id,
            positions: new_address_data,
        };

        // send the ticket
        res.status(200).send(response_data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function get_position(req: Request, res: Response) {
    try {
        // get ticket id

        const ticket_id = new ObjectId(req.params.id);
        const adress_number = req.params.number;
        const position_index = req.params.position_index;

        // find ticket in db
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (db_ticket.Err) return res.status(500).send("db failed");

        if (db_ticket.Ok === null)
            return res.status(404).send("ticket was not found :(");

        // getting data setup for frontend (school data + worker_count & accepted)
        if (adress_number > db_ticket.Ok.addresses.length) {
            return res.status(404).send("address not found :(");
        }
        const address_data = db_ticket.Ok.addresses[adress_number];
        const position = address_data.positions[position_index];

        const candidates = await Promise.all(
            position.candidates.map(async candidate => {
                const candidate_data = await db.find(
                    { _id: candidate },
                    "workers"
                );

                if (!candidate_data.Ok) {
                    return res.status(401).send("Worker find err");
                }

                return {
                    id: candidate_data.Ok._id,
                    name: candidate_data.Ok.full_name,
                    status: candidate_data.Ok.status,
                };
            })
        );

        const accepted = await Promise.all(
            position.accepted.map(async accepted_worker => {
                const worker_data = await db.find(
                    { _id: accepted_worker },
                    "workers"
                );

                if (!worker_data.Ok) {
                    return res.status(401).send("Worker find err");
                }

                return {
                    id: worker_data.Ok._id.toString(),
                    name: worker_data.Ok.full_name,
                    status: worker_data.Ok.status,
                };
            })
        );

        // send the ticket
        const response_data = {
            position: position.position,
            quontity: position.quontity,
            candidates,
            accepted,
        };

        return res.status(200).send(response_data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function activate_ticket(req: Request, res: Response) {
    try {
        const id = new ObjectId(req.params.id);
        const ticket = await db.find({ _id: id }, "tickets");
        if (!ticket.Ok || ticket.Ok.length == 0)
            return res.status(404).send("ticket was not found :(");

        if (ticket.Ok.status != "pending")
            return res.status(402).send("already activated");

        let counter = 0;
        await ticket.Ok.addresses.forEach(async adr => {
            adr.positions.forEach(async pos => {
                const jo_data = {
                    creation_time: new Date(),
                    position: pos.position,
                    working_hours: pos.working_hours,
                    price: pos.price,
                    comment: pos.comment,
                    city: ticket.Ok!.city,
                    quontity: pos.quontity,
                    sex: pos.sex,
                    visitors_count: pos.visitors_count,
                    school_id: adr.school_id,
                    ticket_id: ticket.Ok!._id,
                };

                const new_jo = await db.save(jo_data, "smp_job_offers");
                if (new_jo.Err)
                    return res
                        .status(500)
                        .send("smp job offer activation failed");

                counter++;
            });
        });

        await db.update(
            { _id: ticket.Ok._id },
            { $set: { status: "in progress" } },
            "tickets"
        );

        return res.status(200).send(counter + " Job offers was created.");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function close_ticket_logic(
    ticket: any,
    // ticket: Result<WithId<Document> | null>,
    res: Response
) {
    await ticket.Ok!.addresses.forEach(async address => {
        await address.positions.forEach(async position => {
            const filter = {
                ticket_id: ticket.Ok?._id,
                school_id: address.school_id,
                position: position.position,
            };

            const job_offer = await db.find(filter, "smp_job_offers");

            if (job_offer.Ok) {
                const workers = position.accepted;

                await workers.forEach(async worker => {
                    const db_worker = await db.find({ _id: worker }, "workers");

                    if (db_worker.Err)
                        return res.status(400).send("find worker error");

                    if (db_worker.Ok) {
                        const old_worker_work = db_worker.Ok.work;
                        console.log(old_worker_work);
                        const new_worker_work = old_worker_work.filter(
                            work => work.toString() != job_offer.Ok?._id
                        );
                        const update_worker = await db.update(
                            { _id: worker },
                            { $set: { work: new_worker_work } },
                            "workers"
                        );

                        if (update_worker.Err)
                            return res.status(400).send("update error");
                    }
                });

                const delete_job_offer = await db.delete(
                    job_offer.Ok._id.toString(),
                    "smp_job_offers"
                );

                if (delete_job_offer.Err)
                    return res.status(400).send("delete job offer error");
            }
        });
    });

    const update_ticket = await db.update(
        { _id: ticket.Ok?._id },
        { $set: { status: "closed" } },
        "tickets"
    );

    if (update_ticket.Err) return res.status(400).send("update ticket error");
}

async function close_ticket(req: Request, res: Response) {
    try {
        const id = new ObjectId(req.params.id);

        const ticket = await db.find({ _id: id }, "tickets");

        if (!ticket.Ok || ticket.Ok.length == 0)
            return res.status(404).send("ticket was not found :(");

        if (ticket.Ok.status != "in progress")
            return res.status(402).send("ticket not in progress");

        if (res.locals.jwt.user_type != "employer")
            return res.status(401).send("Not your ticket");

        console.log(ticket.Ok);
        await close_ticket_logic(ticket, res);

        return res.status(200).send("ticket closed");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function prolong_ticket(req: Request, res: Response) {
    try {
        const id = new ObjectId(req.params.id);
        const ticket = await db.find({ _id: id }, "tickets");

        if (!ticket.Ok || ticket.Ok.length == 0)
            return res.status(404).send("ticket was not found :(");

        if (ticket.Ok.company_id.toString() != res.locals._id)
            return res.status(401).send("Not your ticket");

        //@ts-ignore
        await close_ticket_logic(ticket, res);

        const realization_date_parts = ticket.Ok.realization_date.split(".");
        const realization_date = new Date(
            +realization_date_parts[2],
            realization_date_parts[1] - 1,
            +realization_date_parts[0]
        );
        const new_realization_date = new Date(realization_date).setDate(
            realization_date.getDate() + 1
        );

        const new_addresses = ticket.Ok.addresses.map(address => {
            const new_positions = address.positions.map(position => {
                return {
                    ...position,
                    candidates: [],
                    accepted: [],
                };
            });

            return {
                ...address,
                positions: new_positions,
            };
        });

        const new_ticket_data = {
            ...ticket.Ok,
            date_of_creation: new Date(),
            realization_date: new_realization_date,
            status: "pending",
            accepted: 0,
            addresses: new_addresses,
        };

        const new_ticket = await db.save(new_ticket_data, "tickets");

        if (new_ticket.Err)
            return res.status(500).send("create new ticket error");

        return res.status(200).send("ticket prolonged");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function get_job_offers(req: Request, res: Response) {
    try {
        const job_offers = await db.find_all({}, "smp_job_offers");
        if (!job_offers.Ok)
            return res.status(500).send("job offers was not found :(");

        const return_data = await Promise.all(
            job_offers.Ok.map(async jo => {
                const school_id = new ObjectId(jo.school_id);
                const db_school = await db.find({ _id: school_id }, "schools");

                const new_data = {
                    ...db_school.Ok,
                    ...jo,
                };

                return new_data;
            })
        );

        return res.status(200).send(return_data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function get_job_offer_by_id(req: Request, res: Response) {
    try {
        const job_offer = await db.find(
            { _id: new ObjectId(req.params.id) },
            "smp_job_offers"
        );
        if (!job_offer.Ok)
            return res.status(500).send("job offer was not found :(");

        const school_id = new ObjectId(job_offer.Ok.school_id);
        const db_school = await db.find({ _id: school_id }, "schools");
        const new_data = {
            ...db_school.Ok,
            ...job_offer.Ok,
        };

        return res.status(200).send(new_data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function respond_status(req: Request, res: Response) {
    try {
        // get data form body
        const position = req.body.position;
        const school_id = req.body.school_id;
        const ticket_id = new ObjectId(req.body.ticket_id);

        if (res.locals.jwt.user_type != "worker")
            return res.status(200).send({ status: "hidden" });

        const worker_id = new ObjectId(res.locals.user._id);

        // find ticket by id
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (db_ticket.Err || db_ticket.Ok === null)
            return res.status(400).send("respond failed: db ticket");

        // to update candidates field on ticket we need address index & positions index
        const addresses = db_ticket.Ok.addresses;
        let address_index = 9;
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].school_id == school_id) {
                address_index = i;
                break;
            }
        }

        const positions = addresses[address_index].positions;
        let position_index = 9;
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].position == position) {
                position_index = i;
                break;
            }
        }

        const old_candidates =
            db_ticket.Ok.addresses[address_index].positions[position_index]
                .candidates;

        // check if worker is already in the array
        let duplicate: boolean = false;
        let already_in_work: boolean = false;
        old_candidates.forEach(candidate => {
            if (candidate.toString() == worker_id) duplicate = true;
        });

        addresses.forEach(address => {
            address.positions.forEach(position => {
                const accepted = position.accepted.map(worker =>
                    worker.toString()
                );
                if (accepted.includes(worker_id.toString()))
                    already_in_work = true;
            });
        });

        if (duplicate) return res.status(200).send({ status: "candidate" });
        if (already_in_work)
            return res.status(200).send({ status: "accepted_worker" });

        return res.status(200).send({ status: "worker" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function respond(req: Request, res: Response) {
    try {
        // get data form body
        const position = req.body.position;
        const school_id = req.body.school_id;
        const ticket_id = new ObjectId(req.body.ticket_id);

        if (res.locals.jwt.user_type != "worker")
            return res.status(400).send("u are not a worker");

        const worker_id = new ObjectId(res.locals.user._id);

        // find ticket by id
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (db_ticket.Err || db_ticket.Ok === null)
            return res.status(400).send("respond failed: db ticket");

        // to update candidates field on ticket we need address index & positions index
        const addresses = db_ticket.Ok.addresses;
        let address_index = 9;
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].school_id == school_id) {
                address_index = i;
                break;
            }
        }

        const positions = addresses[address_index].positions;
        let position_index = 9; // it should not be 9 btw
        for (let i = 0; i < positions.length; i++) {
            if (positions[i].position == position) {
                position_index = i;
                break;
            }
        }

        const old_candidates =
            db_ticket.Ok.addresses[address_index].positions[position_index]
                .candidates;

        // check if worker is already in the array
        let duplicate: boolean = false;
        let already_in_work: boolean = false;
        old_candidates.forEach(candidate => {
            if (candidate.toString() == worker_id) duplicate = true;
        });

        addresses.forEach(address => {
            address.positions.forEach(position => {
                const accepted = position.accepted.map(worker =>
                    worker.toString()
                );
                if (accepted.includes(worker_id.toString()))
                    already_in_work = true;
            });
        });

        if (duplicate)
            return res.status(200).send("You are already a candidate");

        if (already_in_work)
            return res.status(200).send("You are already work in this ticket");

        // push worker id
        const new_candidates = [...old_candidates, worker_id];

        const new_ticket_data = {
            ...db_ticket.Ok,
        };

        new_ticket_data.addresses[address_index].positions[
            position_index
        ].candidates = new_candidates;

        // update ticket
        const updated_db = await db.update(
            { _id: ticket_id },
            { $set: { ...new_ticket_data } },
            "tickets"
        );
        if (updated_db.Err || updated_db.Ok === null)
            return res.status(400).send("respond update failed");

        return res.status(200).send("respond success");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function accept_candidate(req: Request, res: Response) {
    /**
     * req: {
     *  ticket_id: string,
     *  school_id: string,
     *  position_index: number,
     *  candidates: string[],
     *  accepted: string[]
     * }
     */

    // for now we use moderator middleware bc we dont have smp client support yet

    const { candidates, accepted, position_index, address_index } = req.body;
    const ticket_id = new ObjectId(req.body.ticket_id);

    // find ticket
    const ticket = await db.find({ _id: ticket_id }, "tickets");
    if (ticket.Err) {
        return res.status(401).send(ticket.Err.message);
    }

    if (!ticket.Ok) {
        return res
            .status(400)
            .send("Ticket not found: accept candidate failed");
    }

    let new_addresses = ticket.Ok.addresses;
    const position = new_addresses[address_index].positions[position_index];
    const new_workers = accepted
        .filter(worker => !position.accepted.includes(worker))
        .map(worker => worker.toString());

    position.candidates = candidates.map(candidate => new ObjectId(candidate));
    position.accepted = accepted.map(worker => new ObjectId(worker));

    let accepted_count = 0;
    new_addresses = new_addresses.map(adr => {
        const new_positions = adr.positions.map(pos => {
            accepted_count += pos.accepted.length;
            const old_candidates = pos.candidates.map(candidate =>
                candidate.toString()
            );
            const new_candidates = old_candidates
                .filter(worker => !new_workers.includes(worker))
                .map(worker => new ObjectId(worker));
            return { ...pos, candidates: new_candidates };
        });
        return { ...adr, positions: new_positions };
    });

    // create new addresses object
    const new_data = {
        ...ticket.Ok,
        accepted: accepted_count,
        addresses: new_addresses,
    };

    const update_ticket = await db.update(
        { _id: ticket_id },
        { $set: { ...new_data } },
        "tickets"
    );

    if (update_ticket.Err) {
        return res.status(401).send("accept update failed");
    }

    const jo_filter = {
        $and: [
            { ticket_id },
            { school_id: new_addresses[address_index].school_id },
            { position: position.position },
        ],
    };
    const jo_data = await db.find(jo_filter, "smp_job_offers");
    if (!jo_data.Ok) {
        return res.status(400).send("can't find jo");
    }

    if (new_workers.length > 0) {
        const update_workers = await new_workers.forEach(async worker => {
            const worker_id = new ObjectId(worker);

            const worker_data = await db.find({ _id: worker_id }, "workers");
            if (!worker_data.Ok) {
                return res.status(400).send("Wrong worker id");
            }

            const work = worker_data.Ok.work
                ? [...worker_data.Ok!.work, jo_data.Ok?._id]
                : [jo_data.Ok?._id];
            const new_responds = worker_data.Ok!.responds.filter(resp => {
                return resp.toString() != jo_data.Ok?._id.toString();
            });
            const worker_update_data = {
                work,
                responds: new_responds,
            };

            const update_worker = await db.update(
                { _id: worker_id },
                { $set: { ...worker_update_data } },
                "workers"
            );
            if (!update_worker.Ok) {
                return res.status(500).send("worker update err");
            }
        });
    }

    return res.status(200).send("accepted[] updated successfully");
}

export default {
    new_ticket,
    get_all_tickets,
    get_ticket_by_id,
    get_address,
    get_position,
    activate_ticket,
    close_ticket,
    prolong_ticket,
    get_job_offers,
    get_job_offer_by_id,
    respond,
    respond_status,
    accept_candidate,
};
