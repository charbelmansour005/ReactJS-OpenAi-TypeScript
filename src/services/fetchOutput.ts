export const fetchOutput = async (input: string) => {
  try {
    const token = import.meta.env.VITE_XX
    alert(input)
    const payload = {
      prompt: input,
      max_tokens: 100,
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci/completions",
      options
    )
    const json = await response.json()
    return json
    // return json.choices[0].text
  } catch (error: any) {
    return error.message
  }
}
