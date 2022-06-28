import { MongoClient, WithId, Document, UpdateResult, ObjectId } from "mongodb";
import Result from "../lib/Result";

class db {
    private static connection_uri: string = process.env.DB_CONNECTION_URI || 'mongodb://localhost:27017/test_db';
    private static collection: string;
    private static limit: number = 100;
    
    static client = new MongoClient(db.connection_uri);

    /**
     * Configuration methods
     */
    public static set_collection(collection: string) {
        this.collection = collection;
    }

    public static set_connection_uri(db_name: string): void {
        this.connection_uri = 'mongodb://localhost:27017/' + db_name;
        this.client = new MongoClient(db.connection_uri);
    }

    public static set_limit(limit: number): void {
        this.limit = limit;
    }

    /**
     * Start / close connection
     */
    
    static async start_connection() {
        try {
            await this.client.connect();
        }
        catch (e) {
            console.log('[DB]: ' + e);
        }
    }

    static async close_connection() {
        try {
            await this.client.close();
        }
        catch (e) {
            console.log('[DB]: ' + e);
        }
    }

    static async save(data: object, collection_name?: string): Promise<Result<ObjectId>> {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            const id = (await collection.insertOne(data)).insertedId;
            await this.close_connection();
            return {Ok: id};
        }
        catch (e) {
            await this.close_connection();
            console.log(e);
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async find(filter: object, collection_name?: string): Promise<Result<WithId<Document> | null>> {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);

            const data = await collection.findOne(filter);

            await this.close_connection();

            return {Ok: data};
        }
        catch (e) {
            await this.close_connection();
            console.log(e);
            throw new Error("err:" + e);
            // return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async find_all(filter?: object, collection_name?: string, limit?: number, skip?: number): Promise<Result<WithId<Document>[] | null>> {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);

            const cursor = collection.find(filter ? filter : {}).skip(skip ? skip : 0).limit(limit ? limit : db.limit);;
            const all_values = await cursor.toArray();

            await this.close_connection();
            return {Ok: all_values};
        }
        catch (e) {
            await this.close_connection()
            console.log(e)
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async update(filter: object, data: object, collection_name?: string): Promise<Result<UpdateResult | null>> {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            const test = await collection.updateOne(filter, data);
            await this.close_connection();
            return {Ok: test};
        }
        catch (e) {
            await this.close_connection();
            console.log(e);
            return {Ok: null, Err: new Error("err:" + e)}
        }
    }

    static async delete(id: string, collection_name?: string): Promise<Result<boolean>> {
        try {
            await this.start_connection();
            const collection = this.client.db().collection(collection_name ? collection_name : db.collection);
            await collection.deleteOne({_id: new ObjectId(id)});
            await this.close_connection();
            return {Ok: true};
        }
        catch (e) {
            await this.close_connection();
            console.log(e);
            return {Ok: false, Err: new Error("err:" + e)}
        }
    }

    /**
     * Complex funcitons
    */

    // Funciton makes sure that object in this collection is unique. If Object exists, update it, if doesnt, create it.
    static async save_unique(filter: object, new_object: object, collection_name?: string): Promise<Result<ObjectId>> {
        try {
            const collection = collection_name ? collection_name : db.collection;

            const exists = await db.find(filter, collection);
            if (exists.Ok != null) {
                await db.delete(exists.Ok._id.toString(), collection);
            }

            const document = await db.save(new_object, collection);
            if (!document.Ok)
                return { Ok: null, Err: new Error("err:") };
            
            return { Ok: document.Ok };
        }
        catch (e) {
            await this.close_connection();
            console.log(e);
            throw new Error('DB error');
        }
    }
}

export default db