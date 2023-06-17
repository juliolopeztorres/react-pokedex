
export enum Level {
  INFO = '🔵',
  DEBUG = '🟢',
  WARNING = '🟡',
  ERROR = '🔴'
}

function logWithLevel(
  level: Level,
  message: string,
  options: {indentation: number, context?: string | object} = {indentation: 0}
): void
{
  const preparedLevel = Array(options.indentation).fill('\t').join('') + level

  console.log(...options.context ? [preparedLevel, message, options.context] : [preparedLevel, message])
}

export default logWithLevel
