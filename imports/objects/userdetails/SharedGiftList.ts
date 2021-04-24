export class SharedGiftList {
    giftListId: string
    accepted: boolean

    constructor(giftListId: string, accepted: boolean) {
        this.giftListId = giftListId;
        this.accepted = accepted;
    }
}