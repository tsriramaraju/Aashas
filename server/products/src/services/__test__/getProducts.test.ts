import { maleProductData } from '../../dummy Data/Product';
import { Product } from '../../models/Products';
import { getProducts } from '../getProducts';

describe('Get Products service test group', () => {
  it('should return list of all existing products if filter is not defined', async () => {
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    await global.createProduct();
    const res = await getProducts();
    expect(res.length).toBe(4);
  });

  it('should return empty list if no products is found and if filter is not defined', async () => {
    const res = await getProducts();
    expect(res.length).toBe(0);
  });

  it('should return list of all existing designer products if designer is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({
      ...maleProductData,
      designerCollection: true,
    }).save();
    await Product.build({ ...maleProductData, inOffer: true }).save();

    const res = await getProducts({ designerCollection: true });
    expect(res.length).toBe(1);
  });
  it('should return empty if no existing designer products are found and  if designer is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({ ...maleProductData, inOffer: true }).save();

    const res = await getProducts({ designerCollection: true });
    expect(res.length).toBe(0);
  });
  it('should return list of all existing inOffer products if inOffer is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({ ...maleProductData, inOffer: true }).save();
    await Product.build({
      ...maleProductData,
      designerCollection: true,
    }).save();

    const res = await getProducts({ inOffer: true });
    expect(res.length).toBe(1);
  });
  it('should return empty if no existing inOffer products are found and  if inOffer is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({
      ...maleProductData,
      designerCollection: true,
    }).save();

    const res = await getProducts({ inOffer: true });
    expect(res.length).toBe(0);
  });
  it('should return list of all existing trending products if trending is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({ ...maleProductData, trending: true }).save();
    await Product.build({
      ...maleProductData,
      designerCollection: true,
    }).save();

    const res = await getProducts({ trending: true });
    expect(res.length).toBe(1);
  });
  it('should return empty if no existing trending products are found and  if trending is true', async () => {
    await global.createProduct();
    await global.createProduct();
    await Product.build({
      ...maleProductData,
      designerCollection: true,
    }).save();

    const res = await getProducts({ trending: true });
    expect(res.length).toBe(0);
  });
});
