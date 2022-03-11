import app from '../app.js';
import request from 'supertest';
import require from 'supertest';
import { Profile } from '../services/profile_hand.js';
import ProfileService from '../services/profile_hand.js';
import { profiles } from '../services/profile_hand.js';
import { expect } from '@jest/globals';
import UserService from '../services/user.js';

UserService.insertUser("test", "test");
let USER_ID = UserService.findByUsername("test").id;
console.log(USER_ID);

function clearProfiles(){
    for(let i = 0; i < profiles.length; i++){
        profiles.pop();
    }
}

test('Add profile', async () => {
    clearProfiles()

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    ProfileService.addProfile(payload);
    expect(profiles).toContainEqual(payload);
});

test('Modify profile', async () => {
    clearProfiles()

    let payload1 = new Profile(12, "a", "b", "c", "d", "e", "f")
    let payload2 = new Profile(12, "e", "b", "q", "d", "Z", "f")

    profiles.push(payload1);
    ProfileService.updateProfile(12, payload2)

    expect(profiles).toContainEqual(payload2);
});

test('Find profile', async () => {
    clearProfiles()

    let payload = new Profile(12, "a", "b", "c", "d", "e", "f");

    profiles.push(payload);    
    let ret = ProfileService.findByUserId(12);
    
    expect(ret).toEqual(payload)
});

// test('GET profile', async() => {
//     clearProfiles()
//     let payload = new Profile(USER_ID, "a", "b", "c", "d", "e", "f");
//     profiles.push(payload);    

//     res = await testagent.get('/api/profile');

//     expect(res.status).toEqual(302);
//     expect(res.data).toEqual(payload);
// });