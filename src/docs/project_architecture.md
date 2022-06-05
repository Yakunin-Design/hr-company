# Project Architecture

## This is what we have done so far
![what is done so far](../docs/img/2.svg)


# DB struct

## User

```JavaScript

// [DB collection]
interface Chat {
    people: [UserID, UserID]
    messages: Message[]
}

interface Message {
    job_offer: JobOfferID | none
    time: date
    text: string
    sender: UserID
    attachments: file
}

interface User {
    email: string
    phone: string (hashed)
    password: string (hashed)

    full_name: string
    photo: file.png

    avg_rating: number 
    reviews: ReviewID[]

    payments: PaymentID[]
   
    chat: ChatID[]
}

interface MinRate {
    type: "per hour" | "per day" | "per month"
    value: number
}

interface JobPreferences {
    type: "part time" | "full time"
    specialty: Spetialty[]
    min_rate: MinRate
    location: {
        district: string, metro_station: string
    }
    experience: Experience[]
}

// [DB collection]
interface Worker  extends User{
    birthday: date
    citizenship: sitizenship
    documents: Document[] 
    status: worker_status

    job_preferences: JobPreferences
}
 
// [DB collection]
interface Employer extends User {
    organization_name: string
    description: string
    points: Point[]
    balance: string (hashed)
}

```

## Point
```JavaScript

interface address {
    full_address: string
    metro_station: string
}

// [DB collection]
interface Point {
    owner: UserID
    address: address
    employee: UserID[]
    job_offers: JobOfferID[]
}

```

## Job offer

```JavaScript
enum jo_category {
    kitchen,
    hall,
    managment,
    no_special_background,
    other
}

interface Application: {
    applicant: UserID
    time: date
} 

// [DB collection]
interface JobOffer {
    employer: userID
    
    category: jo_category
    specialty: jo_specialty

    location: point
    rate: jo_rate

    experience: number
    schedule: jo_schedule    
    working_hours: jo_working_hours
    description: string

    addons: {
        age: {number, number}
        citizenship: citizenship
        sex: man | woman
    }

    status: jo_status
    type: "full time" | "part time"
    creation_time: date 

    applicants: Application[]
    
    has_manager: bool
}
```

## Other

```JavaScript

// [DB collection]
interface Review {
    rater: UserID
    evaluated: UserID
    job_offer_id: JobOfferID
    message: string
    avg_rating: number
    qualities: qualities[]
}

// [DB collection]
interface FAQ {
    qustion: string
    answer: string
}

// [DB collection]
interface FeedbackTicket {
    time: Date.now()
    mail: string
    question: string
}

// [DB collection]
interface PartnerProgram {
    logo: file.jpg
    title: string
    description: string
    category: string
}

// [DB collection]
interface Payment {
    crediting: bool
    id: number
    amount: number(hashed)
    title: string
}

type citizenship = RF | BU | SNG | Other

type worker_status = ready | not_ready

interface Document {
    type: PassportRF | medicine_book | worker_book | QR_code | 
}

```

# Classes

``` bash
abstract user {
    login()
    abstract reg()

}

```




