import algoliaSearch from 'algoliasearch';
import { keys } from './keys';

if (!keys.algoliaID || !keys.algoliaKey)
  throw new Error('Algolia keys must be defined');

const algoliaClient = algoliaSearch(keys.algoliaID, keys.algoliaKey);

export const index = algoliaClient.initIndex('test_Aashas');
