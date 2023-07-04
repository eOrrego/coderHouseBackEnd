export class UsersDTO {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.age = user.age;
        this.role = user.role;
        this.status = user.status;
        this.cart = user.cart || null;
        this.orders = user.orders || [];
    }
}

export class UsersViewDTO {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
    }
}