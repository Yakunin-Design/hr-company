export default function unwrap(value: any, null_value: string) {
    if (value === null) return null_value;

    if (value === undefined) return null_value;

    return value;
}
