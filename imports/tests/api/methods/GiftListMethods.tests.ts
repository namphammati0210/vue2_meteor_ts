// @ts-ignore
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {GiftListCollectionManager} from "../../../api/collections/GiftListCollection";
import {UserSession} from "../../utils/UserSession";
import {GiftList} from "../../../objects/giftlist/GiftList";
import * as assert from "assert";
import {Gift} from "../../../objects/gift/Gift";
import {GiftListManager} from "../../../ui/managers/GiftListManager";
import {createId} from "../../../api/utils/HelperUtils";

describe("GiftListCollection test", function () {

    const userSession: UserSession = new UserSession();
    const Future = Npm.require('fibers/future');

    beforeEach(() => {
        resetDatabase();
        userSession.createUserSession();
    });

    afterEach(() => {
        userSession.endUserSession();
        resetDatabase();
    });

    it("Adds an empty gift list", () => {

        let future = new Future();

        GiftListManager.getInstance().addGiftList(new GiftList(), () => {
            future.return();
        })

        future.wait();

        assert.strictEqual(1, GiftListCollectionManager.getInstance().getGiftLists().length);
    })

    it("Adds a populated gift list", () => {

        let future = new Future();
        const giftList = new GiftList();
        giftList.personName = "Person Name";
        giftList.username = "Username";
        giftList.gifts = [new Gift().setName("Gift")];

        GiftListManager.getInstance().addGiftList(giftList, () => {


            future.return();
        });

        future.wait();

        const dbGiftLists: GiftList[] = GiftListCollectionManager.getInstance().getGiftLists();
        assert.strictEqual(1, dbGiftLists.length);

        const dbGiftList = dbGiftLists[0];
        assert.strictEqual("Person Name", dbGiftList.personName);
        assert.strictEqual("Username", dbGiftList.username);

        assert.strictEqual(1, dbGiftList.gifts.length);
        assert.strictEqual("Gift", dbGiftList.gifts[0]._name);
    });

    it("Adds a gift to a gift list", () => {

        const giftList = new GiftList();
        giftList.personName = "Person Name";
        giftList.username = "Username";
        giftList.gifts = [];

        GiftListCollectionManager.getInstance().insert(giftList);

        const dbGiftLists = GiftListCollectionManager.getInstance().getGiftLists();
        assert.strictEqual(1, dbGiftLists.length);

        const dbGiftList = dbGiftLists[0];

        assert.strictEqual(0, dbGiftList.gifts.length);

        const gift = new Gift().setName("Name").setDescription("Description").setCost(100).setIsPrivate(true);

        let future = new Future();
        GiftListManager.getInstance().addGift(dbGiftList._id, gift, () => {

            future.return();
        });

        future.wait();

        const updatedGiftList: GiftList = GiftListCollectionManager.getInstance().getById(dbGiftList._id);

        assert.strictEqual(1, updatedGiftList.gifts.length);

        const dbGift: Gift = updatedGiftList.gifts[0];

        assert.strictEqual("Name", dbGift._name);
        assert.strictEqual("Description", dbGift._description);
        assert.strictEqual(100, dbGift._cost);
        assert.strictEqual(true, dbGift._isPrivate);
        assert.notStrictEqual(null, dbGift._id);
        assert.notStrictEqual(undefined, dbGift._id);
    });

    it("Clears all gifts from a gift list", () => {


    });

    it("Removes a gift by id", () => {

    });
});
