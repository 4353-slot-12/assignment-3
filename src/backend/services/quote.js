
export const quotes = []; 

export default class QuoteService {    
    static insert(data) {
        const quote = { ...data };
        console.log(quote);
        // quote_history.push(quote)
    }

    getHistory(userId) { 
        return quotes.filter(quote => quote.userId === userId);
    }
}