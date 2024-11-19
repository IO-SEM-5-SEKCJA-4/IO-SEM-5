export default class User {
    constructor(id, username, email, password) {
        this.id = id || null;
        this.username = username || null;
        this.email = email || null;
        this.password = password || null;
    }
}