import {Mongo} from 'meteor/mongo';
import {GiftList} from "../../objects/giftlist/GiftList";
import {Gift} from "../../objects/gift/Gift";
import {createId} from "../utils/HelperUtils";

export class GiftListCollectionManager {

    GiftListCollection: Mongo.Collection<GiftList> = new Mongo.Collection<GiftList>('giftlist');

    private static instance: GiftListCollectionManager = new GiftListCollectionManager();

    static getInstance(): GiftListCollectionManager {
        return this.instance;
    }

    insert(giftList: GiftList): string {
        const Future = Npm.require('fibers/future');
        let future = new Future();

        giftList.userId = Meteor.userId();

        giftList.gifts.forEach(gift => gift._id = createId());

        const id: string = this.GiftListCollection.insert(giftList, () => {
            future.return();
        });

        future.wait();

        return id;
    }

    getById(id: string) : GiftList | undefined{
        return this.GiftListCollection.findOne({_id: id});
    }

    deleteById(id: string): boolean {
        this.GiftListCollection.remove({"_id": id});

        return true;
    }

    getGiftLists(): GiftList[] {
        return this.GiftListCollection.find({userId: Meteor.userId()}).fetch();
    }

    clearAll(): void {
        this.GiftListCollection.remove({});
    }

    addGift(giftListId: string, gift: Gift){
        gift._id = createId();
        this.GiftListCollection.update({_id: giftListId}, {$push: {gifts: gift}});
    }

    removeGift(giftListId: string, giftId: string){
        this.GiftListCollection.update({_id: giftListId}, {$pull: {gifts: {_id: giftId}}});
    }

    updateGiftList(giftList: GiftList) {
        this.GiftListCollection.update({_id: giftList._id}, {$set: giftList});
    }
}
