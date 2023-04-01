export interface Eventt {
    id: number | null;
    start: Date;
    end: Date;
    name: string;
    description?: string;
    place?: string;
}