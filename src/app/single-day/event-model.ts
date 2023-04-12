export interface Eventt {
    id: number | null;
    start: number;
    end: number;
    name: string;
    description?: string;
    place?: string;
}