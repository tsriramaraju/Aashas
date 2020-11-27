import { getAccounts } from './../getAccounts';

it('should return number of accounts available', async () => {
  await global.register();
  await global.register();
  await global.register();
  await global.register();
  await global.register();

  const result = await getAccounts();

  expect(result.length).toBe(5);
});
