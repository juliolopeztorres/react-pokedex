import ucWords from "../../../src/Domain/Util/ucWords";

it('should uppercase the first character', () => {
  expect(ucWords('word')).toBe('Word')
})
