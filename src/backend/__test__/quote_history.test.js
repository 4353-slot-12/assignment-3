import app from '../app';
import request from 'supertest';
import { Quote } from '../services/quote_history.js';
import { quote_history } from '../services/quote_history.js';
import QuoteHistoryService from '../services/quote_history.js';

test('Add profile', async () => {
    let service = new QuoteHistoryService();

    let tmpDate = new Date(2022, 6, 5)
    let payload = new Quote(1, 5, "133 Apple Drive", tmpDate);

    service.addQuote(payload);
    expect(quote_history).toContainEqual(payload);
});

test('GET api/quote/:id', async () => {
    let tmpDate = new Date(2022, 6, 5);

    let payload = new Quote(1, 5, "133 Apple Drive", tmpDate);
    quote_history.push(payload);

    const res = await request(app).get("/api/quote/:1")

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)).toEqual(payload);
});

test('POST api/quote/', async () => {

});

test('jest + supertest sample', async () => {
    const tmpDate = new Date(2022, 6, 5);
    const payload = {gallonsRequested: 3, deliveryDate: tmpDate.toISOString()}

    const res = await request(app).post('/api/quote').send(payload);

    expect(res.statusCode).toBe(201);
    expect(quote_history).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ gallonsRequested: 3, deliveryDate: tmpDate.toISOString() }),
        ])
    )
});