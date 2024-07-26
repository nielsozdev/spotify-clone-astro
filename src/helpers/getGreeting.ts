const MORNING_LIMIT = 12
const AFTERNOON_LIMIT = 18

export function gerGreeting (hour: number) {
  if (hour < MORNING_LIMIT) {
    return 'Buenos días'
  } else if (hour < AFTERNOON_LIMIT) {
    return 'Buenas tardes'
  } else {
    return 'Buenas noches'
  }
}
