import { formBuilderSections } from './mock';
import { extractElementIdsFromSections } from './utils';

describe('Extract extractElementIdsFromSections', () => {
  it('flattens subsections, fields and extract their ids form builder', () => {
    const { flattenSubsections, flattenFields, idsMap } =
      extractElementIdsFromSections(formBuilderSections);

    expect(flattenSubsections.length).toBe(3);
    expect(flattenFields.length).toBe(10);
    expect(idsMap.size).toBe(13);
    expect(idsMap.has('feed_type')).toBe(true);
    expect(idsMap.has('country')).toBe(true);
    expect(idsMap.has('blablabli')).toBe(false);
  });
});
