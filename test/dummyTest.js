const request = require('supertest');
const { expect } = require('chai');
const config = require('../utils/config');

let header = {
    'Content-Type': 'application/json'
}

let token

describe('E2E API Automation Testing', function () {
    this.timeout(10000)
    it('Login - Get Token', async function () {
        const response = await request(config.baseUrl)
            .post("/auth/login")
            .set(header)
            .send({
                username: config.userName,
                password: config.passWord
            })
        token = response.body.accessToken
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('accessToken');
    })
    it('Get All Comments', async function () {
        const response = await request(config.baseUrl)
            .get("/comments")
        expect(response.status).to.equal(200);
        expect(response.body);
    })
    it('Add New Comments', async function () {
        const response = await request(config.baseUrl)
            .post("/comments/add")
            .set(header)
            .send({
                body: 'This makes all sense to me!',
                postId: 3,
                userId: 1,
            })
        expect(response.status).to.equal(201);
        expect(response.body);
    })
    it('Update Comments', async function () {
        const response = await request(config.baseUrl)
            .put(`/comments/1`)
            .set(header)
            .send({
                body: 'I think I should shift to the moon',
                userId: 1
            })
        expect(response.status).to.equal(200);
        expect(response.body.body).to.equal('I think I should shift to the moon');
        expect(response.body.user.username).to.equal('emilys');
    })
    it('Get Single Comments', async function () {
        const response = await request(config.baseUrl)
            .get("/comments/1")
        expect(response.status).to.equal(200);
        expect(response.body);
    })
    it('Delete Comments', async function () {
        const response = await request(config.baseUrl)
            .delete("/comments/1")
        expect(response.status).to.equal(200);
        expect(response.body);
    })
})