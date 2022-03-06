class Profile{
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
let profiles = [] // Temporary until we get a database

function createProfile(id, name, addr1, addr2, city, state, zip){
    p = Profile(id, name, addr1, addr2, city, state, zip);
    profiles.push(p)
}

// Linear search for now, could be faster.
function getProfile(id){ 
    for(p in profiles){ 
        if(p.id == id){
            return p;
        }
    }
}

function updateProfile(id, name, addr1, addr2, city, state, zip){
    for(p in profiles){ 
        if(p.id == id){
            p.update(name, addr1, addr2, city, state, zip)
        }
    }
}