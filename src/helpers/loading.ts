const loadingTextChoices: string[] = [
  "Loading...",
  "Loading OpenAi result",
  "Working.",
  "Fetching your result",
]

export const randomLoadingText =
  loadingTextChoices[Math.floor(Math.random() * 4)]
