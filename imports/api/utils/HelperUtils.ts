import ObjectID = Mongo.ObjectID;

export function createId(): string{
   return new ObjectID().toHexString();
}