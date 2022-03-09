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

    service.addProfile(payload1);
    service.updateProfile(12, payload2)

    expect(profiles).toContainEqual(payload2);
});

test('Get profile', async () => {
    let service = new ProfileService();

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    service.addProfile(payload);
    let ret = service.getProfile(12);

    expect(ret).toEqual(payload)
});
