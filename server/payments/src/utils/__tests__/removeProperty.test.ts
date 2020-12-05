import { removeProperty } from '../removeProperty';

describe('Remove property util method test group', () => {
  it('should remove property successfully', async () => {
    const res = removeProperty({ hello: 'hello', name: 'john' }, 'name');
    expect(JSON.stringify(res)).toBe(JSON.stringify({ hello: 'hello' }));
  });

  it("should return same object if property doesn't exist", async () => {
    const res = removeProperty({ hello: 'hello' }, 'name');
    expect(JSON.stringify(res)).toBe(JSON.stringify({ hello: 'hello' }));
  });
});
