import request from 'supertest'
import usersApp from '../app.js'
import mongoose from 'mongoose';
import Users from '../models/user.js';
process.env.PORT = 4001

describe('User Routes', () => {
  // Clear the database before each test
  beforeAll(async () => {
    // Connect to Test MongoDB
    mongoose.connect('mongodb://127.0.0.1/motiv8-DB-Test', {})
      .then(() => console.log('MongoDB connected'))
      .catch(err => console.error('MongoDB connection error:', err));

    await Users.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();   
  })

  it('should create a new user and add a number', async () => {
    const res = await request(usersApp)
      .post('/api/v1/number')
      .send({ userId: '1000', number: '7777' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.userId).toBe('1000');
    expect(res.body.number).toBe('7777');
  });

  it('should fail to get user data with number', async () => {
    const res=await request(usersApp).get("/api/v1/users/1000");
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Missing Character');
  })

  it('should fail to add more than one character', async () => {
    const res=await request(usersApp)
      .post('/api/v1/character')
      .send({ userId: '1000', character: 'xx' });
    expect(res.statusCode).toBe(400)
    expect(res.body.error).toBe('Single character is required');
  })

  it('should add a character to user ', async () => {
    const res = await request(usersApp)
      .post('/api/v1/character')
      .send({ userId: '1000', character: 'x' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.userId).toBe('1000');
    expect(res.body.number).toBe('7777');
    expect(res.body.character).toBe('x');
  });

  it('should get user data with number and character', async () => {
    const res=await request(usersApp).get("/api/v1/users/1000");
    expect(res.statusCode).toBe(200)
    expect(res.body).toBe('result: x_7777');
  })

  it('should get all users', async () => {
    const res=await request(usersApp).get("/api/v1/users");
    expect(res.statusCode).toBe(200)
  })

});