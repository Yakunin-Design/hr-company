type Result<T> = {
    Ok: T | null,
    Err?: Error
}

// type Result<T> = T extends null ? { Err: Error } : { Ok: T }

export default Result;