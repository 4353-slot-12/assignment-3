export class Profile{
    constructor(id, name, addr1, addr2, city, state, zip){
        this.id = id
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

    constructor(){
        while(profiles.length > 0){
            profiles.pop();
        }
    }

    addProfile(profile){
        profiles.push(profile)
    }

    getProfile(id){ 
        return profiles.find(p => p.id === id)
    }

    updateProfile(id, profile){ // Call using a Profile object
        let selected = profiles.find(p => p.id === id);
        selected.update(profile.name, profile.address1, profile.address2, profile.city, profile.state, profile.zip);
    }
}
