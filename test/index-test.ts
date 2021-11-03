import sampleJson from './support/sample.json';
import {Fieldset, main} from '../src'

describe('main', () => {
  it('works', () => {
    const result = main(sampleJson as Fieldset);

    expect(result).toHaveLength(7);
    expect(result[2].chars).toBe('INVOICE#');
    expect(result[3].chars).toBe('2599');
    expect(result[5].chars).toBe('Invoice #:');
    expect(result[6].chars).toBe('ABC123');
  });
});
