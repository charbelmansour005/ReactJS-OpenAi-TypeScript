const loadingTextChoices: string[] = [
  "Loading...",
  "Loading result",
  "Working...",
  "Fetching result",
]

export const randomLoadingText =
  loadingTextChoices[Math.floor(Math.random() * 4)]
