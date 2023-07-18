import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const mockUserRegistration = {
    name: "UserTest1",
    email: "usertest1@gmail.com",
    password: "123456",
}

const mockUserLoggedIn = {
    email: "orregoe@gmail.com",
    password: "12345679"
}

describe('test endpoint de user, register, login, logout y session', () => {
    it('Probar el login de un usuario metodo POST api/users/login', async () => {
        const result = await requester.post('/api/users/login').send(mockUserLoggedIn);
        expect(result.status).to.be.equal(200);
    })
    it('Probar el logout de un usuario metodo POST api/users/logout', async () => {
        const result = await requester.post('/api/users/logout');
        expect(result.status).to.be.equal(200);
    })
    it('Probar el register de un usuario metodo POST api/users', async () => {
        const result = await requester.post('/api/users').send(mockUserRegistration);
        expect(result.status).to.be.equal(200);
    })
})