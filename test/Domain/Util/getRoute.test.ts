import getRoute from "../../../src/Domain/Util/getRoute";

it('should get home route', () => {
  expect(getRoute('home')).toBe('/')
})
