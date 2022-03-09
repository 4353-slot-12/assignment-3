import app from '../app';
import request from 'supertest';
import { Profile } from '../services/profile_hand.js';
import ProfileService from '../services/profile_hand.js';
import { profiles } from '../services/profile_hand.js';


test('Add profile', async () => {
    let service = new ProfileService();

    service.addProfile(new Profile(12, "a", "b", "c", "d", "e", "f"));
    expect(profiles).toEqual(
    expect.arrayContaining([
        expect.objectContaining({ id: 12 }),
    ])
)
});