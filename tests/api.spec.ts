import { test, expect } from '@playwright/test';
import { Interface } from 'node:readline';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API Tests', () => {

    interface Post  {
      id: number;
      title: string;
      body: string;
      userId: number;
    }

    interface User {
      id: number;
      name: string;
      email: string;
    }

  // GET — Read data
  test('GET — should fetch list of users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users`);

    // check status code
    expect(response.status()).toBe(200);

    // get body as JSON
    const users: User[] = await response.json();

    // check we got 10 users
    expect(users).toHaveLength(10);

    // check first user has correct fields
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');

    console.log(`✅ Got ${users.length} users`);
    console.log(`✅ First user: ${users[0].name}`);
  });

  // GET single item
  test('GET — should fetch single user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/1`);

    expect(response.status()).toBe(200);

    const user: User = await response.json();

    // check specific user data
    expect(user.id).toBe(1);
    expect(user.name).toBe('Leanne Graham');
    expect(user.email).toBe('Sincere@april.biz');

    console.log(`✅ User found: ${user.name}`);
  });

  // POST — Create data
  test('POST — should create a new post', async ({ request }) => {
    const newPost: Omit<Post, 'id'> = {
      title: 'My Test Post',
      body: 'This is my test post body',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, {
      data: newPost,
    });

    // 201 = created successfully
    expect(response.status()).toBe(201);

    const createdPost: Post = await response.json();

    // check created post has our data
    expect(createdPost.title).toBe('My Test Post');
    expect(createdPost.body).toBe('This is my test post body');
    expect(createdPost).toHaveProperty('id'); // server assigned an id

    console.log(`✅ Post created with id: ${createdPost.id}`);
  });

  // PUT — Update data
  test('PUT — should update a post', async ({ request }) => {
    const updatedPost = {
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1,
    };

    const response = await request.put(`${BASE_URL}/posts/1`, {
      data: updatedPost,
    });

    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.title).toBe('Updated Title');

    console.log(`✅ Post updated: ${post.title}`);
  });

  // DELETE — Delete data
  test('DELETE — should delete a post', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/posts/1`);

    // 200 = deleted successfully
    expect(response.status()).toBe(200);

    console.log('✅ Post deleted successfully');
  });

  // 404 — Not found
  test('GET — should return 404 for non existing user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/999`);

    expect(response.status()).toBe(404);

    console.log('✅ 404 returned correctly for missing user');
  });

});