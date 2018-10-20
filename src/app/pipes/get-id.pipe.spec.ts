import { getPipe } from './get.pipe';

describe('getPipe', () => {
  it('create an instance', () => {
    const pipe = new getPipe();
    expect(pipe).toBeTruthy();
  });
});