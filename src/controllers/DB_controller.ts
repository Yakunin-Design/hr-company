import { MongoClient } from 'mongodb';

class Mongo {
    static client = new MongoClient(process.env.DB_CONNECTION_URL + '/hr-db');

    /**
     * --- Opening and closing connection to db ---
     */

    static async start_connection() {
        try {
            await this.client.connect();
            console.log('Connection with db established successfully!');
        }
        catch (e) {
            console.log(e);
        }
    }

    static async close_connection() {
        try {
            await this.client.close();
            console.log('The connection to the db was closed!');
        }
        catch (e) {
            console.log(e);
        }
    }

    static async write_one(collection_name: string, object) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());
            const result = await collection.insertOne(object);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

    /**
     * Not available yet
     */
    static async write_many(collection_name: string, object) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());
            const result = await collection.insertMany(object);
            console.log(`${result.insertedCount} documents were inserted`);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

    static async read_one(collection_name: string, filter = {}) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());
            return await collection.findOne(filter);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

    static async read_many(collection_name: string, filter = {}) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());

            const cursor = collection.find(filter);
            return await cursor.toArray();
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

    static async update_one(collection_name: string, filter, object) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());
            const result = await collection.updateOne(filter, object);
            console.log(
                `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
            );
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

    static async delete_one(collection_name: string, filter) {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name.toString());
            const result = await collection.deleteOne(filter);

            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            await this.close_connection();
        }
    }

}

export { Mongo as db }