import { NextFunction, Request, Response } from 'express';
import Result from '../lib/Result';
import UserModel from '../models/UserModel';
import User from '../interfaces/User';
import sign_jwt from '../lib/sign_jwt';

function validate(data: User): Result<User> {
    
    // Username and password exist
    if (!data.username || !data.password) {
        return { Ok: null, Err: new Error("Invalid data")};
    }

    // Password Length < 4
    if (data.password.length < 4) {
        return { Ok: null, Err: new Error("Your password is too short")};
    }

    // Data is correct
    return {
        Ok: { username: data.username, password: data.password },
        Err: null
    }

}

async function register(req: Request, res: Response, next: NextFunction) {
    // Parse incoming data
    const request_data: User = {
        username: req.body.username,
        password: req.body.password
    }

    // Primary validate
    const valid_user = validate(request_data);
    
    if (valid_user.Err) {
        return res.status(400).send(valid_user.Err.message)
    }
    
    // Create user
    const user = new UserModel(request_data);

    // Checking if user exists
    const dbResult = await user.find({username: request_data.username});

    if(dbResult.Err) {
        return res.status(500).send('Something went wrong');
    }

    if (dbResult.Ok && dbResult != null) { 
        return res.status(400).send('User already exists!');
    }

    // Add user to db
    const userID = await user.add();

    // Sign JWT
    if(userID.Ok) {
        const jwt = sign_jwt(userID.Ok);

        return res.status(200).send(jwt.Ok);
    }

    // DB error
    res.status(500).send(userID.Err?.message);
}

async function login(req: Request, res: Response) {
    // Parse incoming data
    const request_data: User = {
        username: req.body.username,
        password: req.body.password
    }

    // Primary validate
    const valid_user = validate(request_data);
    
    if (valid_user.Err) {
        return res.status(400).send(valid_user.Err.message)
    }

    // Find user in db
    const user = new UserModel(request_data);

    // Checking if user exists
    const existingUser = await user.find();

    if(existingUser.Err) {
        return res.status(500).send('Something went wrong');
    }

    if (existingUser.Ok === null) { 
        return res.status(400).send('Wrong cardentials');
    }

    // Sign new JWT
    console.log(existingUser.Ok);
    const jwt = sign_jwt(existingUser.Ok._id);

    return res.status(200).send(jwt.Ok);

    // redirect to router with auth
}

function whoami(req: Request, res: Response) {

    res.send(res.locals.user.username);

}

export default { register, login, whoami };