export class Quote{
    constructor(id, gallonsRequested, deliveryAddress, deliveryDate){
        this.id = id;
        this.timeStamp = new Date().setMilliseconds(0);
        this.gallonsRequested = gallonsRequested;
        this.deliveryAddress = deliveryAddress;
        this.deliveryDate = deliveryDate.toISOString();
        this.price = 1.00;
        this.totalPrice = this.price * 5;
    }
}

export const quote_history = []; 

export default class QuoteHistoryService {    

    constructor(){
        while(quote_history.length > 0){
            quote_history.pop();
        }
    }

    addQuote(quote){
        quote_history.push(quote)
    }

    getQuote(id){ 
        return quote_history.find(p => p.id === id)
    }

}