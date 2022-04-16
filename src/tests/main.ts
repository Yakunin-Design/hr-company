interface GameObject {
    x: number;
    y: number;
}

abstract class Player implements GameObject {
    x: number = 0;
    y: number = 0;

    static playerCount = 0;
    static readonly maxSpeed = 12;

    constructor(public name: string) {
        Player.playerCount++;
    }

    display(prefix: string): void {
        console.log(
            prefix + 
            " Player " + this.name + 
            " is at (" + this.x + ", " + this.y + ")"
        );
    }

    abstract update(): void;
}

class Gunner extends Player {
    bullets: number = 0;

    constructor(name: string, public guntype: string) {
        super(name);
    }

    update() {
        this.bullets += 1;
    }
}

const p1 = new Gunner('Master', 'handgun');

export { Gunner }