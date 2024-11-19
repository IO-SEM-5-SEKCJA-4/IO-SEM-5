import Manager from "./Manager";

export default class Admin extends Manager {
    constructor(id, username, email, password) {
        super(id, username, email, password);
    }
}