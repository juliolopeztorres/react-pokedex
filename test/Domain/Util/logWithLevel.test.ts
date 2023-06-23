import logWithLevel, { Level } from "../../../src/Domain/Util/logWithLevel";

it('should show formatted log', () => {
  // @ts-ignore
  const logFunction = jest.spyOn(console, 'log')

  logFunction.mockImplementation(() => () => {})

  logWithLevel(Level.DEBUG, 'my debug message')

  expect(logFunction).toHaveBeenCalledTimes(1)
  expect(logFunction).toHaveBeenLastCalledWith('🟢', 'my debug message')

  logWithLevel(Level.INFO, 'my info message with indentation', {indentation: 1})

  expect(logFunction).toHaveBeenCalledTimes(2)
  expect(logFunction).toHaveBeenLastCalledWith('\t🔵', 'my info message with indentation')

  logWithLevel(Level.WARNING, 'my warning message with indentation and context', {indentation: 2, context: {parameter: 'myValue'}})

  expect(logFunction).toHaveBeenCalledTimes(3)
  expect(logFunction).toHaveBeenLastCalledWith('\t\t🟡', 'my warning message with indentation and context', {parameter: 'myValue'})

  logFunction.mockRestore()
})
