import { Player } from "@lottiefiles/react-lottie-player"

function ButtonLoading() {
  return (
    <Player
      src="https://assets9.lottiefiles.com/packages/lf20_gqafhvty.json"
      loop
      style={{ height: 30, width: 30 }}
      speed={1}
      direction={1}
      autoplay
    />
  )
}

export default ButtonLoading
