type InternalState = {
    event: String
}

abstract class Subscriber {
    abstract update(state: InternalState): void
}

abstract class Publisher {

    protected observers: Subscriber[] = [] //the list of observers
    protected state: InternalState = { event: "" } //the internal state observers are watching

    public addObserver(s: Subscriber): void {
        this.observers.push(s)
    }

    protected notify() {
        this.observers.forEach(o => o.update(this.state))
    }
}

//Actual implementations
class ConsoleLogger extends Subscriber {

    public update(newState: InternalState) {
        console.log("New internal state update: ", newState)
    }
}

class InputElement extends Publisher {

    public click(): void {
        this.state = { event: "click" }
        this.notify()
    }

}

const input = new InputElement()
input.addObserver(new ConsoleLogger())

input.click()