import app from '../app';
import request from 'supertest';
import { Profile } from '../services/profile_hand.js';
import ProfileService from '../services/profile_hand.js';
import { profiles } from '../services/profile_hand.js';


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
    expect(res).toContainEqual(payload);
});

test('POST api/profile/:id', async () => {
    let payload1 = new Profile(17, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(17, "e", "b", "q", "d", "Z", "f")
    
    profiles.push(payload1)
    
    const res = await request(app).post("/api/profile/:17").send(payload2);

    expect(res.statusCode).toEqual(200);
    expect(profiles).toContainEqual(payload2);
});

test('PUT api/profile', async () => {
    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");
    
    const res = await request(app).put("/api/profile").send(payload);

    expect(res.statusCode).toEqual(200);
    expect(profiles).toContainEqual(payload);
});