import {Gift} from "../gift/Gift";

export class GiftList {

    _id?: string;

    userId:string = null as any;

    personName: string = "";

    username: string = "";

    gifts: Gift[] = [];
}
