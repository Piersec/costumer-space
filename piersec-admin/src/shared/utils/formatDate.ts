export function formatDateToShort(dateStr: string): { day: string; month: string } {
  const months = [
    "JAN.", "FEV.", "MAR.", "ABR.", "MAI.", "JUN.",
    "JUL.", "AGO.", "SET.", "OUT.", "NOV.", "DEZ."
  ]

  const date = new Date(dateStr)
  const day = date.getDate().toString()
  const month = months[date.getMonth()]

  return { day, month }
}