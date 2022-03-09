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
    addProfile(profile){
        profiles.push(profile)
    }

    getProfile(id){ 
        return profiles.find(p => p.id === id)
    }

    updateProfile(profile){ // Call using a Profile object
        for(let i = 0; i < profiles.length; i++){ 
            if(profile.id == id){
                profiles[i].update(profile.name, profile.addr1, profile.addr2, profile.city, profile.state, profile.zip);
            }
        }
    }

    clearProfiles(){
        profiles = []
        return profiles
    }
}
