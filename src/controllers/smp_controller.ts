import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import db from '../lib/idb'
import { ITicket } from '../interfaces/ITicket';

async function new_ticket(req: Request, res: Response) { 
    try {
        const data: ITicket = req.body;
        const user_type = res.locals.jwt.user_type;

        // Data prep for ticket creation
        const comment = data.comment;
        const date_of_creation = new Date();
        const status = "Pending";
        let accepted = 0;
        const progress = 0;
        const realization_date = data.date;

        let total_workers_count = 0;
        // calculating workers count
        data.addresses.map(adr => adr.positions.map(position => {
            total_workers_count += position.quontity;
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
        const ticket_data = {
            company_id,
            date_of_creation,
            realization_date,
            status,
            city: ticket_city,
            total_workers_count,
            accepted,
            progress,
            comment,
            addresses
        }
        console.log(ticket_data);

        const new_ticket = await db.save(ticket_data,"tickets");
        if (new_ticket.Err) return res.status(500).send("db failed");

        res.status(200).send("Ticket created");
    } catch (e) {
        console.log('Ticket creation failed, err: ' + e);
        res.status(500).send('Something went wrong!');
    }
    
}

export default { new_ticket };