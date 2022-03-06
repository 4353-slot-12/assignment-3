import app from '../app';
import request from 'supertest';
import SampleService from '../services/sample';


test('jest only sample demo', () => {
    const res = {
        statusCode: '',
        body: null,
        status(code) { this.statusCode = code; return this; },
        send(obj) { this.body = obj; return this; },
    };

    const req = {
        body: {
            message: 'Hello Jest!'
        }
    };

    SampleService.getSample(req, res);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ echo: req.body.message });
});