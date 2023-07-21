import { IUser } from "../types/user.type";

export class CustomError extends Error {

    response: {
        status: number;
        data: IUser[]
    }

    constructor(message: string) {
        super(message);
        this.response = {
            status: 200,
            data: []
        }
    }
}