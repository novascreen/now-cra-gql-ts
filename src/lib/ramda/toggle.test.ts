import toggle from './toggle';

it('adds item if not contained in list', () => {
  expect(toggle('a', [])).toEqual(['a']);
});

it('removes item if contained in list', () => {
  expect(toggle('a', ['a', 'b'])).toEqual(['b']);
});
