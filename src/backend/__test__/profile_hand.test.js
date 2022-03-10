import app from '../app.js';
import request from 'supertest';
import { Profile } from '../services/profile_hand.js';
import ProfileService from '../services/profile_hand.js';
import { profiles } from '../services/profile_hand.js';
import { expect } from '@jest/globals';

test('Add profile', async () => {
    let service = new ProfileService();

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    service.addProfile(payload);
    expect(profiles).toContainEqual(payload);
});

test('Modify profile', async () => {
    let service = new ProfileService();

    let payload1 = new Profile(12, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(12, "e", "b", "q", "d", "Z", "f")

    profiles.push(payload1);
    service.updateProfile(12, payload2)

    expect(profiles).toContainEqual(payload2);
});

test('Get profile', async () => {
    let service = new ProfileService();

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    profiles.push(payload);    
    let ret = service.getProfile(12);
    
    expect(ret).toEqual(payload)
});

test('GET api/profile/:id', async () => {
    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");
    profiles.push(payload);

    const res = await request(app).get("/api/profile/:12")

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual(payload);
});

test('GET invalid api/profile/:id', async () => {
    const res = await request(app).get("/api/profile/:45269646")

    expect(res.statusCode).toEqual(404);
});

test('POST api/profile/:id', async () => {
    expect.assertions(2);
    let payload1 = new Profile(17, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(17, "e", "b", "q", "d", "Z", "f")
    
    profiles.push(payload1)
    
    const res = await request(app).post("/api/profile/:17").send({profile: JSON.stringify(payload2)});

    expect(res.statusCode).toEqual(202);
    expect(profiles).toContainEqual(payload2);
});

test('PUT api/profile', async () => {
    expect.assertions(2);
    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");
    const res = await request(app).put("/api/profile").send({profile: JSON.stringify(payload)});

    expect(res.statusCode).toEqual(201);
    expect(profiles).toContainEqual(payload);
});