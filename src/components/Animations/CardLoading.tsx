import { Player } from "@lottiefiles/react-lottie-player"

function CardLoading() {
  return (
    <Player
      src="https://assets3.lottiefiles.com/packages/lf20_E5C0kC.json"
      loop
      style={{ height: 100, width: 100 }}
      speed={1}
      direction={1}
      autoplay
    />
  )
}

export default CardLoading
