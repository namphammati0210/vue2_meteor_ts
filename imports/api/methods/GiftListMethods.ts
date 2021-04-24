import {GiftListCollectionManager} from "../collections/GiftListCollection";
import {GiftList} from "../../objects/giftlist/GiftList";
import {Gift} from "../../objects/gift/Gift";

Meteor.methods({
    "getGiftLists": function (): GiftList[] {
        return GiftListCollectionManager.getInstance().getGiftLists();
    }
});

Meteor.methods({
    "getGiftListById": function (id: string): GiftList {
        return GiftListCollectionManager.getInstance().getById(id);
    }
});

Meteor.methods({
    "addGiftList": function (giftList: GiftList): string {
        return GiftListCollectionManager.getInstance().insert(giftList);
    }
});

Meteor.methods({
    "deleteGiftList": function (giftListId: string): boolean {
        return GiftListCollectionManager.getInstance().deleteById(giftListId);
    }
});

Meteor.methods({
    "updateGiftList": function (giftList: GiftList): void {
        return GiftListCollectionManager.getInstance().updateGiftList(giftList);
    }
});

Meteor.methods({
    "addGift": function (giftListId:string, gift:Gift): void {
        return GiftListCollectionManager.getInstance().addGift(giftListId, gift);
    }
});
