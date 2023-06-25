import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import db from '../lib/idb'
import { ITicket } from '../interfaces/ITicket';
import Result from '../lib/Result';

async function new_ticket(req: Request, res: Response) { 
    try {
        const data = req.body;
        const user_type = res.locals.jwt.user_type;

        // Data prep for ticket creation
        const comment = data.comment;
        const date_of_creation = new Date();
        const status = "pending";
        const company_name = data.company_id;
        let accepted = 0;
        const realization_date = data.date;

        let total_workers_count = 0;
        // calculating workers count
        data.addresses.map(adr => adr.positions.map(position => {
            total_workers_count += Number(position.quontity);
        }))

        /**
         * Getting company ID || creating a new company
         */
        let company_id: ObjectId = new ObjectId();
        let ticket_city = "";
        const db_company = await db.find({name: data.company_id}, "smp_clients");
        if (db_company.Err) return res.status(500).send("db failed");

        // Creating new company
        if (db_company.Ok === null) {
            const city = "Санкт-Петербург";
            const new_company = {
                name: data.company_id,
                city: city
            }
                
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
        const addresses = await Promise.all(data.addresses.map(async (adr) => {
            // Getting school id || creating new school
            let school_id;
            const db_school = await db.find({$and: [{city: ticket_city}, {number: adr.school_number}]}, "schools");
            if (db_school.Err) return res.status(500).send("db failed");

            if(db_school.Ok === null) {
                const new_school = {
                    city: ticket_city,
                    contact: adr.contact,
                    phone: adr.phone,
                    number: adr.school_number,
                    address: adr.address,
                    subway: adr.subway
                }

                const new_school_query = await db.save(new_school, "schools");
                if (!new_school_query.Ok) return res.status(500).send("db failed")
                school_id = new_school_query.Ok;
            } else {
                if (db_school.Ok.contact != adr.contact || db_school.Ok.phone != adr.phone) {
                    const update_result = await db.update({ _id: db_school.Ok._id }, { $set: { contact: adr.contact, phone: adr.phone } }, "schools");
                    if (!update_result.Ok) return res.status(500).send("db failed");
                }
                school_id = db_school.Ok._id;
            }

            // Returning arress (school + positions) 
            return {
                school_id: school_id,
                positions: adr.positions.map(pos => { return { ...pos, price: 100 }}),
            }
        }));
        
        // Saving tickiet to db
        const ticket_data: ITicket = {
            company_id,
            company_name,
            date_of_creation,
            realization_date,
            status,
            city: ticket_city,
            total_workers_count,
            accepted,
            comment,
            addresses
        }

        const new_ticket = await db.save(ticket_data,"tickets");
        if (new_ticket.Err) return res.status(500).send("db failed");

        res.status(200).send("Ticket created");
    } catch (e) {
        console.log('Ticket creation failed, err: ' + e);
        res.status(500).send('Something went wrong!');
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
        }
    });

    res.status(200).send(response_tickets);
}

async function get_ticket_by_id(req: Request, res: Response) {
    // get ticket id
    const ticket_id = new ObjectId(req.params.id);

    // find ticket in db
    const db_ticket = await db.find({ _id: ticket_id }, "tickets");
    if (db_ticket.Err) return res.status(500).send("db failed");
    
    if (db_ticket.Ok === null) return res.status(500).send("bruh why is it null")

    // getting data setup for frontend (school data + worker_count & accepted)
    const address_data = await Promise.all(db_ticket.Ok.addresses.map(async adr => {
        // get all school data
        const address = await db.find({ _id: adr.school_id}, "schools");

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
            accepted
        };
        
    }));

    const response_data = {
        ...db_ticket.Ok,
        addresses: address_data
    }
    
    // send the ticket
    res.status(200).send(response_data);
}

async function get_address(req: Request, res: Response) {
    // get ticket id
    const ticket_id = new ObjectId(req.params.id);
    const adress_number = req.params.number;

    // find ticket in db
    const db_ticket = await db.find({ _id: ticket_id }, "tickets");
    if (db_ticket.Err) return res.status(500).send("db failed");
    
    if (db_ticket.Ok === null) return res.status(404).send("ticket not found :(");

    // getting data setup for frontend (school data + worker_count & accepted)
    if (adress_number > db_ticket.Ok.addresses.length) {
        return res.status(404).send("address not found :(");
    }
    const address_data = db_ticket.Ok.addresses[adress_number];
    const school = await db.find({ _id: address_data.school_id}, "schools");
    if (school.Err) return res.status(500).send("");

    const response_data = {
        ...school.Ok,
        ...address_data
    }
    
    // send the ticket
    res.status(200).send(response_data);
}

export default { new_ticket, get_all_tickets, get_ticket_by_id, get_address };