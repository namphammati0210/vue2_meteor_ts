import {SharedGiftList} from "./SharedGiftList";

export class UserDetails {
    userId: string
    sharedGiftLists: SharedGiftList[]

    constructor(userId: string, sharedGiftLists: SharedGiftList[]) {
        this.userId = userId;
        this.sharedGiftLists = sharedGiftLists;
    }
}