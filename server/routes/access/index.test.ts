import fetch from 'node-fetch';
import appConfig from '../../configs/app.config';

const PORT = appConfig.app.port;
const uri = `http://localhost:${PORT}/api/v1`;

describe('signUpUser', () => {
  it('should return message when the username is not provided', async () => {
    const response = await fetch(`${uri}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    expect(result).toEqual({
      status: 'error',
      code: 400,
      message: 'Username is required',
    });
  });

  it('should return message when username length is less than 5 characters', async () => {
    const response = await fetch(`${uri}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username: '1234',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    expect(result).toEqual({
      status: 'error',
      code: 400,
      message: 'Username must be 5 or more characters long',
    });
  });

  it('should return message when the email is not provided', async () => {
    const response = await fetch(`${uri}/user/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username: '123456',
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    expect(result).toEqual({
      status: 'error',
      code: 400,
      message: 'Email is required',
    });
  });
});
