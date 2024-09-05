export interface DbHelper {
    select(tableName: string);
    insert(tableName: string, value:Object)
    delete(tableName: string, id: string)
    update(tableName: string, id: string, value:Object)
}