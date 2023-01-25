const loadingTextChoices: string[] = [
  "Loading...",
  "Loading OpenAi result",
  "Working",
  "Fetching result",
]

export const randomLoadingText =
  loadingTextChoices[Math.floor(Math.random() * 4)]
