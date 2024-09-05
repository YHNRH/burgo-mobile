import { DbHelper } from "../dbHelper";
export class CouchDB implements DbHelper{
    dbModule = require("../../patched_node_modules/nativescript-couchbase")
    db
    constructor(){
        this.db = new this.dbModule.Couchbase("test1");
        this.db.createView("relays", "10", function(document, emitter) {
            emitter.emit(document._id, document);
            console.dir(document)
            console.dir(emitter)
        });
    }
    update(tableName: string, id: string, value: Object) {
        return this.db.updateDocument(id, value)
    }
    delete(tableName: string, id: string) {
        return this.db.deleteDocument(id)
    }
    select(tableName: string) {
        return this.db.executeQuery(tableName, {});
    }

    insert(tableName: string, value: Object){
        console.dir(value)
        let id = this.db.createDocument(value);
        console.dir(this.db.getDocument(id))
        return id
    }
}