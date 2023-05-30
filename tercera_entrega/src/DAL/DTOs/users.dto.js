export default class UsersDTO {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
        this.orders = user.orders || [];
    }
}