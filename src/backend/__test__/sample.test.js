import app from '../app';
import request from 'supertest';
import SampleService from '../services/sample';


test('jest + supertest sample', async () => {
    const payload = { message: 'Hello Jest!' }
    const res = await request(app).post('/api/sample').send(payload);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: payload.message });
});


test('jest only sample', () => {
    const res = {
        statusCode: '',
        body: null,
        status: function(code) { 
            this.statusCode = code;
            return this; 
        },
        send: function(obj) { 
            this.body = obj; 
            return this; 
        },
    };

    const req = {
        body: {
            message: 'Hello Jest!'
        }
    };

    SampleService.echoMessage(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: req.body.message });
});