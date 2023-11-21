export class Step {
    value: number | string;
    x: number;
    y: number;
    checked: boolean;
    noWayOut: boolean;
    next: Step | null;

    constructor(value: number, x: number, y: number) {
        this.value = value;
        this.checked = false
        this.x = x;
        this.y = y;
        this.noWayOut = false;
        this.next = null;
    }
}



export class Stack {
    private start: Step | null;
    private count: number;


    constructor() {
        this.start = null;
        this.count = 0;
    }

    push(step: Step): void {
        step.next = this.start;


        this.start = step;
        console.log(this.start)
        this.count++;

    }

    verTopo(): Step | null {
        console.log(this.start)

        return this.start
    }

    isEmpty(): boolean {
        return this.count === 0;
    }



    pop(): void {
        if (!this.isEmpty() && this.start) {
            this.start.noWayOut = true
            const new_start = this.start.next || null;
            this.start = new_start;
            this.count--;
        }
    }
}

