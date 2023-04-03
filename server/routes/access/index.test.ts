import fetch from 'node-fetch';
import appConfig from '../../configs/app.config';
import { z } from 'zod';
import { signUpValidator } from '../../validators/access.validator';
import { makeid } from '../../helpers';

const PORT = appConfig.app.port;
const uri = `http://localhost:${PORT}/api/v1`;

describe('signUpUser', () => {
  const bodySchema = signUpValidator.shape.body;
  const request = (body: Partial<z.infer<typeof bodySchema>>) =>
    fetch(`${uri}/user/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  const badResponse = (message: string) => ({
    status: 'error',
    statusCode: 400,
    message: message,
  });

  it('should return message when the username is not provided', async () => {
    const result = await request({});
    expect(result).toEqual(badResponse('Username is required'));
  });

  it('should return message when username length is less than 5 characters', async () => {
    const result = await request({
      username: '1234',
    });
    expect(result).toEqual(badResponse('Username must be 5 or more characters long'));
  });

  it('should return message when username length is more than 32 characters', async () => {
    const result = await request({
      username: 'toilahuongtoilahuongtoilahuongtoilahuongtoilahuongtoilahuong',
    });
    expect(result).toEqual(badResponse('Username must be 32 or fewer characters long'));
  });

  it('should return message when the email is not provided', async () => {
    const result = await request({
      username: '123456',
    });
    expect(result).toEqual(badResponse('Email is required'));
  });

  it('should return message when the email is not valid', async () => {
    const result = await request({
      username: '123456',
      email: '123@gm',
    });
    expect(result).toEqual(badResponse('Invalid email address'));
  });

  it('should return message when password is not provided', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
    });
    expect(result).toEqual(badResponse('Password is required'));
  });

  it('should return message when password length is less than 6 characters', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '12345',
    });
    expect(result).toEqual(badResponse('Password must be 6 or more characters long'));
  });

  it('should return message when confirm password is not provided', async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '123456',
    });
    expect(result).toEqual(badResponse('Confirm password is required'));
  });

  it("should return message when passwords don't match", async () => {
    const result = await request({
      username: '123456',
      email: '123@gmail.com',
      password: '123456',
      confirmPassword: '1234567',
    });
    expect(result).toEqual(badResponse("Passwords don't match"));
  });

  const randomId = makeid(10);
  it('should return message when registered success', async () => {
    const result = await request({
      username: randomId,
      email: `${randomId}@gmail.com`,
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.statusCode).toBe(201);
  });

  it('should return message when username or email exists', async () => {
    const result = await request({
      username: randomId,
      email: `${randomId}@gmail.com`,
      password: '123456',
      confirmPassword: '123456',
    });
    expect(result.statusCode).toBe(409);
  });
});
