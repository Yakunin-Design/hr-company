type Result<T> = {
    Ok: T | null,
    Err: Error | null
}

export default Result;