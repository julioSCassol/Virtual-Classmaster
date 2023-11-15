import { DatabaseConnector } from "../../../../database";

export class AssignmentRepository{
    private databaseConnector: DatabaseConnector;
    constructor(dbConnector: DatabaseConnector){
        this.databaseConnector = dbConnector;
    }
}