export class Workload {
    x: Date;
    y: number;
    constructor( ts: string, val: number) {
        this.x = new Date(ts);
        this.y = val;
    }
}
