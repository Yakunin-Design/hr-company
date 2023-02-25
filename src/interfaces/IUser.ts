interface IUser {
    email: string,
    phone: string,
    password: string,
    full_name: string,
    photo?: File
}

export default IUser;