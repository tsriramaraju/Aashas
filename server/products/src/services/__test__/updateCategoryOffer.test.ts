import { categories } from '@aashas/common';
import { updateCategoryOffer } from '../updateCategoryOffer';

describe('Update Category Offer service test group', () => {
  it('should update existing products for the valid category', async () => {
    await global.createProduct({
      type: categories.kids,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.kids,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.men,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.women,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.men,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });

    const res = await updateCategoryOffer({
      discount: 12,
      inOffer: true,
      outfit: {
        type: categories.women,
        occasion: {
          birthday: 'Kurtas',
          bridesmaid: 'Kurtas',
        },
      },
    });
    expect(res?.length).toBe(1);
    expect(res![0].version).toBe(1);
  });

  it('should return null if no matching products found', async () => {
    await global.createProduct({
      type: categories.kids,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.kids,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });
    await global.createProduct({
      type: categories.men,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });

    await global.createProduct({
      type: categories.men,
      occasion: {
        birthday: 'Kurtas',
        bridesmaid: 'Kurtas',
      },
    });

    const res = await updateCategoryOffer({
      discount: 12,
      inOffer: true,
      outfit: {
        type: categories.women,
        occasion: {
          birthday: 'Kurtas',
          bridesmaid: 'Kurtas',
        },
      },
    });
    expect(res).toBe(null);
  });
});
