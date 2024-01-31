import { unitOptionGroupsMock } from '../shared/mock';
import { getUnitTranslation } from './utils';

const unitGroups = unitOptionGroupsMock;

describe('Test getUnitTranslation', () => {
  it('should return correct value for unit', () => {
    const unitKey = unitGroups[0].options[1].value;
    const expectedTranslation = unitGroups[0].options[1].label['en'];
    expect(getUnitTranslation(unitGroups, unitKey, 'en')).toBe(expectedTranslation);
  });

  it('should return unit value if there is no translation for locale', () => {
    const unitKey = unitGroups[0].options[1].value;
    const expectedTranslation = unitKey;
    expect(getUnitTranslation(unitGroups, unitKey, '_en_')).toBe(expectedTranslation);
  });

  it('should return unit value if there is unit in unitGroup', () => {
    const unitKey = 'test_unit_key';
    const expectedTranslation = unitKey;
    expect(getUnitTranslation(unitGroups, unitKey, 'en')).toBe(expectedTranslation);
  });
});
