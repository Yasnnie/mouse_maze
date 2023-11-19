export class Step {
    value: number | null;
    next: Step | null;

    constructor() {
        this.value = null;
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

    push(value: number): void {
   
            const new_node = new Step();
            new_node.value = value;
            new_node.next = this.start;
            this.start = new_node;
            this.count++;
  
    }

    verTopo(): void {
        console.log("o valor do topo é:", this.start ? this.start.value : null);
    }

    isEmpty(): boolean {
        return this.count === 0;
    }

   

    pop(): void {
        if (!this.isEmpty()) {
            console.log("saindo");
            const new_start = this.start?.next || null;
            this.start = new_start;
            this.count--;
        }
    }
}

