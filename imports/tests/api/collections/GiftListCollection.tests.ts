// @ts-ignore
import {resetDatabase} from 'meteor/xolvio:cleaner';
import {GiftListCollectionManager} from "../../../api/collections/GiftListCollection";
import {UserSession} from "../../utils/UserSession";
import {GiftList} from "../../../objects/giftlist/GiftList";
import * as assert from "assert";
import {Gift} from "../../../objects/gift/Gift";

describe("GiftListCollection test", function () {

    const userSession: UserSession = new UserSession();

    beforeEach(() => {
        resetDatabase();
        userSession.createUserSession();
    });

    afterEach(() => {
        userSession.endUserSession();
        resetDatabase();
    });

    it("Adds an empty gift list", () => {
        GiftListCollectionManager.getInstance().insert(new GiftList());
        assert.strictEqual(1, GiftListCollectionManager.getInstance().getGiftLists().length);
    })

    it("Adds a populated gift list", () => {

        const giftList = new GiftList();
        giftList.personName = "Person Name";
        giftList.username = "Username";
        giftList.gifts = [new Gift().setName("Gift")];

        GiftListCollectionManager.getInstance().insert(giftList);

        const dbGiftLists = GiftListCollectionManager.getInstance().getGiftLists();
        assert.strictEqual(1, dbGiftLists.length);

        const dbGiftList = dbGiftLists[0];
        assert.strictEqual("Person Name", dbGiftList.personName)
        assert.strictEqual("Username", dbGiftList.username)

        assert.strictEqual(1, dbGiftList.gifts.length)
        assert.strictEqual("Gift", dbGiftList.gifts[0]._name)
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
        GiftListCollectionManager.getInstance().addGift(dbGiftList._id, gift);

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


    it("Clears all gift lists", () => {


    });

    it("Removes a gift by id", () => {

    });
});
