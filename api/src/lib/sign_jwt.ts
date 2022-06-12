import jwt, { SignOptions } from 'jsonwebtoken';
import Result from './Result';
import { ObjectId } from 'mongodb';

const secret = 'shhhh';

function sign_jwt(userID: ObjectId): Result<string> {
    try {
        const payload = { userID };
        const options: SignOptions = { issuer: 'Yakunin Design', algorithm: 'HS256' };
        
        return {
            Ok: jwt.sign(payload, secret, options),
            Err: null
        }

    } catch (e) {
        console.log(e);
        return { Ok: null, Err: new Error('Unable to sign jwt') };
    }
};

export default sign_jwt;