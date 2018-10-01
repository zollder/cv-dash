export class WorkloadData {
    private historical: any[];
    private today: any[];

    public getToday(): any[] {
        return this.today;
    }

    public getHistorical(): any[] {
        return this.historical;
    }
}
