import { MongoClient, ObjectId, WithId, Document } from 'mongoDB';
import Result from '../lib/Result';

class DB {
    private static uri = process.env.DB_URL || 'mongodb://localhost:27017/test_db';
    private static db_limit: number = 100;

    private collection: string;
    data: object;

    constructor(data: object, collection: string) {
        this.data = data;
        this.collection = collection;
    }

    public async add(): Promise<Result<ObjectId>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(this.collection);
            const result = await collection.insertOne(this.data);
            return { Ok: result.insertedId, Err: null };
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }

    }

    public async update(): Promise<Result<boolean>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(this.collection.toString());
            const response = await collection.findOne(this.data);

            const result = collection.updateOne(response!._id, this.data);

            return { Ok: true, Err: null };
        }
        catch (e) {
            console.log(e);
            return { Ok: false, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }
    }

    public async find(filter?: object): Promise<Result<WithId<Document> | null>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(this.collection.toString());
            const response = await collection.findOne(filter || this.data);

            return { Ok: response, Err: null };
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }
    }

    public async getid(): Promise<Result<ObjectId | null>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(this.collection.toString());
            const result = await collection.findOne(this.data);
            const response = result?._id;

            if (response != null) {
                return { Ok: response, Err: null };
            }

            return { Ok: null, Err: new Error("not found, baaaals") };
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }
    }

    public async delete(): Promise<Result<boolean | null>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(this.collection);
            const result = await collection.deleteOne(this.data);

            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
                return { Ok: true, Err: null };
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
                return { Ok: false, Err: new Error("No documents matched the query. Deleted 0 documents.") };
            }
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error("db error") };
        }
        finally {
            await DB.close_connection();
        }
    }

    public static async delete_by_id(collection_name: string, id: string): Promise<Result<boolean>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(collection_name);
            const result = await collection.deleteOne({_id: new ObjectId(id)});

            if (result.deletedCount === 1) {
                console.log("Successfully deleted one document.");
                return { Ok: true, Err: null };
            } else {
                console.log("No documents matched the query. Deleted 0 documents.");
                return { Ok: false, Err: new Error("No documents matched the query. Deleted 0 documents.") };
            }
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error("db error") };
        }
        finally {
            await DB.close_connection();
        }
    }

    public static async find_all(collection_name: string, filter?: object, skip?: number, limit: number = DB.db_limit): Promise<Result<WithId<Document>[]>> {
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(collection_name);

            const cursor = collection
                .find(filter ? filter : {})
                .skip(skip ? skip : 0)
                .limit(limit);

            const result = await cursor.toArray();

            return { Ok: result, Err: null };
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }
    }

    public static async get_document_by_id(collection_name: string, id: string): Promise<Result<WithId<Document>>>{
        try {
            await DB.start_connection();
            const collection = DB.client.db().collection(collection_name);

            const result = await collection.findOne({_id: new ObjectId(id)});

            return { Ok: result, Err: null };
        }
        catch (e) {
            console.log(e);
            return { Ok: null, Err: new Error('db error') };
        }
        finally {
            await DB.close_connection();
        }
    }

    private static client = new MongoClient(this.uri);

    private static async start_connection() {
        try {
            await this.client.connect();
        }
        catch (e) {
            console.log(e);
        }
    }

    private static async close_connection() {
        try {
            await this.client.close();
        }
        catch (e) {
            console.log(e);
        }
    }
}

export default DB;