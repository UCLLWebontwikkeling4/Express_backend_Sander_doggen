export interface Student {
    id: number;
    name: string;
    status: string;
    messages: Array<Message> | null;
}

export interface Message {
    id: number;
    author: string;
    date: Date;
    text: string;
}

