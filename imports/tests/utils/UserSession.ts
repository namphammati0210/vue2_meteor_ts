// @ts-ignore
import {Factory} from 'meteor/dburles:factory';
import {Meteor} from 'meteor/meteor';
import * as tsSinon from "ts-sinon"
import {SinonStub} from "sinon";

export class UserSession {

    userStub: SinonStub;
    userIdStub: SinonStub;

    createUserSession(): void {
        Factory.define('user', Meteor.users, {});

        let currentUser = Factory.create('user');
        this.userStub = tsSinon.default.stub(Meteor, 'user').callsFake(() => currentUser);

        this.userIdStub = tsSinon.default.stub(Meteor, 'userId').callsFake(() => currentUser._id);
    }

    endUserSession(): void {
        this.userStub.restore();
        this.userIdStub.restore();
    }
}