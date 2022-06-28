type Result<T> = {
    Ok: T | null,
    Err?: Error
}

export default Result;