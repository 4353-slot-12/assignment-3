const wordyRegex = /^\w+(\s+\w+){0,5}$/i;
const zipRegex = /^\d{5}$/;

export class Profile{
    constructor(userId, name, addr1, addr2, city, state, zip){
        this.userId = userId
        this.update(name, addr1, addr2, city, state, zip)
    }

    update(name, addr1, addr2, city, state, zip){
        this.name = name
        this.address1 = addr1
        this.address2= addr2
        this.city = city
        this.state = state
        this.zip = zip
    }
}

export const profiles = [];

export default class ProfileService {    
    static validateProfile(profile) {
        for (const [key, value] of Object.entries(profile)) {
            if (key === 'address2' && !value.length) continue;
            const regex = key === 'zip' ? zipRegex : wordyRegex;
            if (regex.test(value)) continue;    
            return key;
        }
    }

    static findByUserId(userId){ 
        return profiles.find(profile => profile.userId === userId)
    }

    static removeProfile(userId) {
        const index = profiles.findIndex(profile => profile.userId === userId);
        const id = profiles[index].userId;
        profiles.slice(index, 1);
        return id;
    }

    static addProfile(profile){
        profiles.push(profile)
        console.log(profiles)
    }

    static updateProfile(id, profile){ // Call using a Profile object
        let selected = profiles.find(p => p.userId === id);
        selected.update(profile.name, profile.address1, profile.address2, profile.city, profile.state, profile.zip);
    }

}
