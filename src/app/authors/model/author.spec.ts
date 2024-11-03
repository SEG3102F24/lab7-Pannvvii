import { Book } from './author';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book(1, 'test', 'test', 1)).toBeTruthy();
  });
});
