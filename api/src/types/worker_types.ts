type salary = {
    period: "month" | "hour" | "day",
    amount: number
}

type metro = {
    branch: number,
    name: string
}

type experience = {
    organization_name: string,
    position: string,
    responseabilities: string,
    start: string,
    end: string
}

type passport = {
    number: number,
    signed: string,
    code: number,
    date: string
}

type document = {
    type: "passport" | "qr-code" | "medical-book" | "workersbook",
    data: boolean | passport
}

type change = {
    name: string,
    value: string | salary
}

export {salary, metro, experience, passport, document, change}