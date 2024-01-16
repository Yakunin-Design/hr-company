import { Request, Response } from "express";
import { ObjectId, WithId } from "mongodb";
import db from "../lib/idb";
import { ITicket } from "../interfaces/ITicket";
import close_ticket_logic from "./smp/close_ticket_logic";
import activate_ticket_logic from "./smp/activate_ticket_logic";
import create_proposal from "./smp/create_proposal";
import get_ticket from "./smp/get_ticket";
import get_smp_job_offer from "./smp/get_smp_job_offer";
import send_notification from "./smp/send_notification";

async function new_ticket(req: Request, res: Response) {
    try {
        const data = req.body;

        // Data prep for ticket creation
        const comment = data.comment;
        const date_of_creation = new Date().getTime();
        const status = "pending";
        const extended = false;
        const _id = data._id;
        const company_name = data.company_id;
        let accepted = 0;
        const realization_timestamp = data.date.split(".");
        const realization_date = new Date(
            realization_timestamp[1] +
                "." +
                realization_timestamp[0] +
                "." +
                realization_timestamp[2]
        ).getTime();

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
                            { school_name: adr.school_name },
                        ],
                    },
                    "schools"
                );
                if (db_school.Err) return res.status(500).send("db failed");

                if (db_school.Ok === null) {
                    const new_school = {
                        school_name: adr.school_name,
                        school_number: adr.school_number,
                        city: ticket_city,
                        address: adr.address,
                        subway: adr.subway,
                        contact_name: adr.contact,
                        contact_number: adr.phone,
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

        if (_id) ticket_data._id = new ObjectId(_id);

        const new_ticket = await db.save(ticket_data, "tickets");
        if (new_ticket.Err) return res.status(500).send("db failed");

        res.status(200).send("Ticket created");
    } catch (e) {
        console.log("Ticket creation failed, err: " + e);
        res.status(500).send("Something went wrong!");
    }
}

async function get_all_tickets(req: Request, res: Response) {
    const tickets = await db.find_all(
        {
            $or: [{ status: "in progress" }, { status: "pending" }],
        },
        "tickets"
    );
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

async function get_archived_tickets(req: Request, res: Response) {
    const tickets = await db.find_all({ status: "closed" }, "tickets");
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
        const ticket_id = req.params.id;
        const data = await get_ticket(ticket_id);

        if (!data)
            return res.status(400).send("[get ticket] unable to get ticket");

        // send the ticket
        res.status(200).send(data);
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
        const result = await activate_ticket_logic(req.params.id, res);
        if (result) return res.status(200).send("ticket activated");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
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

        await close_ticket_logic(ticket, res);

        return res.status(200).send("ticket closed");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function extend_ticket(req: Request, res: Response) {
    try {
        // find ticket
        const id = new ObjectId(req.params.id);
        const old_ticket = await db.find({ _id: id }, "tickets");

        if (!old_ticket.Ok || old_ticket.Ok.length == 0)
            return res.status(404).send("ticket was not found :(");

        // close ticket
        await close_ticket_logic(old_ticket, res);

        // constructing new ticket
        const new_ticket_id = new ObjectId();

        const realization_date = new Date(old_ticket.Ok.realization_date);
        const new_realization_date = new Date(realization_date).setDate(
            realization_date.getDate() + 1
        );

        // mapping old ticket to create new ole
        const old_addresses = old_ticket.Ok.addresses;
        const new_addresses = await Promise.all(
            old_addresses.map(async adr => {
                const new_positions = await Promise.all(
                    adr.positions.map(async pos => {
                        // creating new job offers
                        const jo_data = {
                            creation_time: new Date(),
                            position: pos.position,
                            working_hours: pos.working_hours,
                            price: pos.price,
                            comment: pos.comment,
                            city: old_ticket.Ok!.city,
                            quontity: pos.quontity,
                            sex: pos.sex,
                            visitors_count: pos.visitors_count,
                            school_id: adr.school_id,
                            ticket_id: new_ticket_id,
                        };

                        const new_jo = await db.save(jo_data, "smp_job_offers");
                        if (!new_jo.Ok)
                            return res
                                .status(500)
                                .send("smp job offer activation failed");

                        // saving job offer id to position
                        pos.job_offer_id = new_jo.Ok;

                        // creating proposals
                        const job_offer_id = new_jo.Ok;
                        const worker_list = pos.accepted;
                        const proposal_id = await create_proposal(
                            job_offer_id,
                            worker_list
                        );

                        // send notification
                        worker_list.forEach(worker_id =>
                            send_notification(
                                worker_id.toString(),
                                "Вам предложили работу! Нажмите что бы посмотреть предложение",
                                proposal_id.toString()
                            )
                        );

                        if (!proposal_id)
                            return res
                                .status(500)
                                .send("[extend]: failed to create a proposal");

                        // saving proposal id to position in case we need it later
                        pos.proposal_id = proposal_id;

                        return {
                            ...pos,
                            candidates: [],
                            accepted: [],
                        };
                    })
                );

                return {
                    school_id: adr.school_id,
                    positions: new_positions,
                };
            })
        );

        const new_ticket_data = {
            ...old_ticket.Ok,
            _id: new_ticket_id,
            addresses: new_addresses,
            date_of_creation: new Date(),
            realization_date: new_realization_date,
            status: "in progress",
            accepted: 0,
        };

        // save new ticket
        const db_result = await db.save(new_ticket_data, "tickets");

        if (!db_result.Ok)
            return res
                .status(500)
                .send("[extend ticket]: Can't create new ticket");

        // create send notifications

        return res.status(200).send("ticket successfully extended");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function edit_ticket(req: Request, res: Response) {
    try {
        const ticket_data = req.body;
        const ticket_id = new ObjectId(ticket_data._id);

        const db_ticket = await db.find({ _id: ticket_id }, "tickets");

        if (db_ticket.Ok && db_ticket.Ok.status === "pending") {
            //delete old db_ticket
            const db_delete = await db.delete(
                db_ticket.Ok._id.toString(),
                "tickets"
            );
            if (!db_delete)
                return res.status(400).send("cannot delete old ticket");

            return await new_ticket(req, res);
        }

        return res.status(300).send("wrong ticket status");
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
        const jo_id = req.params.id;

        const job_offer = await get_smp_job_offer(jo_id);

        if (!job_offer)
            return res.status(404).send("job offer was not found :(");

        return res.status(200).send(job_offer);
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
        const job_offer_id = req.body.job_offer_id;
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

        // find and update worker
        const worker = await db.find({ _id: worker_id }, "workers");
        if (!worker.Ok)
            return res.status(500).send("[respond]: failed to find a worker");

        const old_responds = worker.Ok.responds ? worker.Ok.responds : [];
        const new_responds = [...old_responds, job_offer_id];

        const updated_db2 = await db.update(
            { _id: worker_id },
            { $set: { responds: new_responds } },
            "workers"
        );
        if (!updated_db2.Ok)
            return res.status(400).send("respond update failed");

        return res.status(200).send("respond success");
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function accept_candidate(req: Request, res: Response) {
    try {
        // for now we use moderator middleware bc we dont have smp client support yet

        const { candidates, accepted, position_index, address_index } =
            req.body;
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

        position.candidates = candidates.map(
            candidate => new ObjectId(candidate)
        );
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

                const worker_data = await db.find(
                    { _id: worker_id },
                    "workers"
                );
                if (!worker_data.Ok) {
                    return res.status(400).send("Wrong worker id");
                }

                const work = worker_data.Ok.work
                    ? [...worker_data.Ok!.work, jo_data.Ok?._id]
                    : [jo_data.Ok?._id];

                const new_responds = worker_data.Ok!.responds.filter(resp => {
                    return resp?.toString() != jo_data.Ok?._id.toString();
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
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function get_proposal_by_id(req: Request, res: Response) {
    try {
        const proposal_id = new ObjectId(req.params.id);

        // find proposal
        const db_proposal = await db.find({ _id: proposal_id }, "proposals");

        if (!db_proposal.Ok)
            return res
                .status(404)
                .send("[get proposal]: unable to find proposal");

        // check if user can respond to proposal
        const user_id = res.locals.user._id.toString();
        let allow = false;
        db_proposal.Ok.worker_list.forEach(id => {
            if (id.toString() === user_id) allow = true;
        });

        if (!allow) return res.status(403).send("This is not your proposal");

        // get job offer data
        const jo_id: string = db_proposal.Ok.job_offer_id.toString();
        const data = await get_smp_job_offer(jo_id);

        if (!data)
            return res
                .status(404)
                .send("[get proposal]: error: cant find job offer");

        // send the ticket
        return res.status(200).send(data);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function accept_proposal(req: Request, res: Response) {
    try {
        const proposal_id = new ObjectId(req.params.id);
        const user_id = res.locals.user._id;

        // find proposal in db -> job offer id
        const db_proposal = await db.find({ _id: proposal_id }, "proposals");
        if (!db_proposal.Ok) return res.status(404).send("cant find proposal");

        const job_offer_id = db_proposal.Ok.job_offer_id;

        // check if user is able to accept the proposal
        let allow = false;
        db_proposal.Ok.worker_list.forEach(worker => {
            if (worker.toString() === user_id.toString()) allow = true;
        });

        if (!allow)
            return res
                .status(403)
                .send("you are not able to accept this proposal");

        // find job offer -> ticket id
        const db_job_offer = await db.find(
            { _id: job_offer_id },
            "smp_job_offers"
        );
        if (!db_job_offer.Ok)
            return res.status(404).send("cant find job offer");

        const ticket_id = db_job_offer.Ok.ticket_id;

        // find position in ticket with job offer id
        const db_ticket = await db.find({ _id: ticket_id }, "tickets");
        if (!db_ticket.Ok) return res.status(404).send("cant find ticket");

        const new_addresses = db_ticket.Ok.addresses.map(adr => {
            adr.positions.forEach(pos => {
                if (pos.job_offer_id.toString() === job_offer_id.toString()) {
                    // check if there is space
                    if (pos.accepted.length >= Number(pos.quontity))
                        return res
                            .status(200)
                            .send(
                                "there is no space available on that proposal anymore"
                            );

                    // check if person is already there!
                    if (pos.accepted.includes(user_id.toString()))
                        return res
                            .status(301)
                            .send("proposal is already accepted");

                    // add person to accepted
                    pos.accepted.push(user_id);
                }
            });

            return adr;
        });

        const new_ticket_data = {
            ...db_ticket.Ok,
            accepted: db_ticket.Ok.accepted + 1,
            addresses: new_addresses,
        };

        // actual update
        const update_ticket = await db.update(
            { _id: ticket_id },
            { $set: new_ticket_data },
            "tickets"
        );

        if (!update_ticket.Ok)
            return res.status(500).send("[accept proposal] ticket update err");

        const response_object = {
            job_offer_id: job_offer_id.toString(),
        };

        return res.status(200).send(response_object);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function decline_proposal(req: Request, res: Response) {
    try {
        // get data from request
        const proposal_id: ObjectId = new ObjectId(req.params.id);
        const user_id = res.locals.user._id;

        // find proposal in db
        const db_proposal = await db.find({ _id: proposal_id }, "proposals");
        if (!db_proposal.Ok) return res.status(500).send("cant find proposal");
        if (db_proposal.Ok == null)
            return res.status(500).send("cant find proposal");

        // get notification id
        const notificaion_id = db_proposal.Ok.proposal.toString();

        // delete notification
        const db_delete_proposal = await db.delete(
            proposal_id.toString(),
            "proposals"
        );
        if (!db_delete_proposal.Ok)
            return res.status(500).send("cant delete proposal");

        // delete notification
        const db_notifications = await db.delete(
            notificaion_id,
            "notifications"
        );
        if (!db_notifications.Ok)
            return res.status(500).send("cant delete notification");

        const response_object = {
            job_offer_id: db_proposal.Ok.job_offer_id.toString(),
        };

        res.status(200).send(response_object);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

type input_data = {
    school_name: string;
    school_number: string;
    city: string;
    address: string;
    subway: string;
    contact_number: string;
    contact_name: string;
};

function valid_school_data(input_data: input_data) {
    if (input_data.school_name.length >= 0) return true;
    if (input_data.city.length >= 0) return true;
    if (input_data.address.length >= 0) return true;
    if (input_data.subway.length >= 0) return true;

    return false;
}

async function new_school(req: Request, res: Response) {
    try {
        const input_data = req.body;

        // validation
        if (!valid_school_data(input_data))
            return res.status(300).send("wrong input");

        const unique_school_name = await db.find(
            { school_name: req.body.school_name },
            "schools"
        );
        if (unique_school_name.Ok != null)
            return res
                .status(404)
                .send("school with that number alrealy exists");

        const school_data = {
            school_name: req.body.school_name,
            city: req.body.city,
            address: req.body.address,
            subway: req.body.subway,
            contact_number: req.body.contact_number,
            contact_name: req.body.contact_name,
        };

        const db_schools = await db.save(school_data, "schools");
        if (!db_schools)
            return res.status(500).send("Error incerting school in db");

        res.status(200).send(db_schools.Ok);
    } catch (e) {
        console.log("new school creation falid: " + e);
    }
}

async function update_school(req: Request, res: Response) {
    try {
        const school_id = new ObjectId(req.params.id);
        const edits = req.body;
        // validation
        // if (!valid_school_data(edits))
        //   return res.status(300).send("wrong input");

        const db_result = await db.update(
            { _id: school_id },
            { $set: { ...edits } },
            "schools"
        );

        if (!db_result) return res.status(500).send("cant find any schools");

        res.status(200).send("updated");
    } catch (e) {
        console.log("update school creation falid: " + e);
    }
}

async function get_all_schools(req: Request, res: Response) {
    try {
        const db_schools = await db.find_all({}, "schools", 1000);
        if (!db_schools) return res.status(404).send("cant find any schools");

        res.status(200).send(db_schools.Ok);
    } catch (e) {
        console.log("update school creation falid: " + e);
    }
}

async function school_names(req: Request, res: Response) {
    try {
        const db_schools = await db.find_all({}, "schools", 1000);
        if (!db_schools || db_schools.Ok === null)
            return res.status(404).send("cant find any schools");

        const school_names = db_schools.Ok.map(school => {
            return { name: school.school_name, id: school._id };
        });

        res.status(200).send(school_names);
    } catch (e) {
        console.log("update school creation falid: " + e);
    }
}

async function get_school_by_id(req: Request, res: Response) {
    try {
        const school_id = new ObjectId(req.params.id);

        const db_schools = await db.find({ _id: school_id }, "schools");
        if (!db_schools) return res.status(404).send("cant find any schools");

        res.status(200).send(db_schools.Ok);
    } catch (e) {
        console.log("update school creation falid: " + e);
    }
}

async function delete_school_by_id(req: Request, res: Response) {
    try {
        const school_id = req.params.id;

        const db_schools = await db.delete(school_id, "schools");
        if (!db_schools) return res.status(404).send("cant find any schools");

        res.status(200).send(db_schools.Ok);
    } catch (e) {
        console.log("update school creation falid: " + e);
    }
}

async function get_all_clients(req: Request, res: Response) {
    try {
        const db_clients = await db.find_all({}, "smp_clients", 1000);
        if (!db_clients) return res.status(404).send("cant find any clients");

        res.status(200).send(db_clients.Ok);
    } catch (e) {
        console.log("update clients creation falid: " + e);
    }
}

async function get_client_by_id(req: Request, res: Response) {
    try {
        const client_id = new ObjectId(req.params.id);

        const db_clients = await db.find(client_id, "smp_clients");
        if (!db_clients) return res.status(404).send("cant find any clients");

        if (db_clients.Ok === null)
            return res.status(404).send("cant find any clients");

        res.status(200).send(db_clients.Ok);
    } catch (e) {
        console.log("update client creation falid: " + e);
    }
}

type client_data = {
    name: string;
    city: string;
    inn: string;
    password: string;
    contact_number: string;
    contact_name: string;
};

function validate_client_data(input_data: client_data) {
    if (input_data.name.length >= 0) return true;
    if (input_data.city.length >= 0) return true;
    if (input_data.password.length >= 0) return true;

    return false;
}

async function new_client(req: Request, res: Response) {
    try {
        const input_data = req.body;

        // validation
        if (!validate_client_data(input_data))
            return res.status(300).send("wrong input");

        const unique_client_name = await db.find(
            { client_name: req.body.name },
            "smp_clients"
        );
        if (unique_client_name.Ok != null)
            return res.status(404).send("client with that name alrealy exists");

        const password = req.body.password;

        const client_data = {
            name: req.body.name,
            inn: req.body.inn,
            city: req.body.city,
            contact_name: req.body.contact_name,
            contact_number: req.body.contact_number,
            password,
        };

        const db_clients = await db.save(client_data, "smp_clients");
        if (!db_clients)
            return res.status(500).send("Error incerting client in db");

        res.status(200).send(db_clients.Ok);
    } catch (e) {
        console.log("new clients creation falid: " + e);
    }
}

async function update_client(req: Request, res: Response) {
    try {
        const client_id = new ObjectId(req.params.id);
        const edits = req.body;
        // validation
        // if (!valid_school_data(edits))
        //   return res.status(300).send("wrong input");

        const db_result = await db.update(
            { _id: client_id },
            { $set: { ...edits } },
            "smp_clients"
        );

        if (!db_result) return res.status(500).send("cant find any clients");

        res.status(200).send("updated");
    } catch (e) {
        console.log("update client creation falid: " + e);
    }
}

async function get_jobs_by_worker_id(req: Request, res: Response) {
    try {
        const worker_id = res.locals.user._id.toString();

        // get all active tickets
        const active_tickets = await db.find_all(
            { status: "in progress" },
            "tickets"
        );
        if (!active_tickets)
            return res.status(404).send("cant find any clients");

        if (active_tickets.Ok === null)
            return res.status(404).send("cant find any active tickets");

        // get job offer ids
        let job_offer_ids: string[] = [];

        active_tickets.Ok.forEach(ticket => {
            ticket.addresses.forEach(address => {
                address.positions.forEach(pos => {
                    pos.accepted.forEach(acc => {
                        if (acc.toString() === worker_id)
                            job_offer_ids.push(pos.job_offer_id.toString());
                        else return;
                    });
                });
            });
        });

        // check if worker has any active job offers
        if (job_offer_ids.length === 0) return res.status(200).send([]);

        // get job offers data
        /*
		const job_offers = await Promise.all(job_offer_ids.map(async (id: string) => {
			const job_offer_id = new ObjectId(id);
			const job_offer = await db.find(job_offer_id, "smp_job_offers");
			if(job_offer.Ok) 
				return job_offer.Ok
		}));
		*/

        const job_offers = await Promise.all(
            job_offer_ids.map(async (id: string) => {
                return await get_smp_job_offer(id);
            })
        );

        res.status(200).send(job_offers);
    } catch (e) {
        console.log("cant get jobs by worker id" + e);
    }
}

export default {
    new_ticket,
    get_all_tickets,
    get_ticket_by_id,
    get_archived_tickets,
    get_address,
    get_position,
    activate_ticket,
    close_ticket,
    extend_ticket,
    edit_ticket,
    get_job_offers,
    get_job_offer_by_id,
    respond,
    respond_status,
    accept_candidate,
    get_proposal_by_id,
    accept_proposal,
    decline_proposal,
    new_school,
    school_names,
    update_school,
    get_all_schools,
    get_school_by_id,
    delete_school_by_id,
    get_all_clients,
    get_client_by_id,
    new_client,
    update_client,
    get_jobs_by_worker_id,
};
