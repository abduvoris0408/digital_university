import Lottie from 'lottie-react'
import animationData from '../../assets/lottie1.json' // @ belgisi alias bo‘lsa, to‘g‘ri yo‘l ekanini tekshiring

const WelcomeAnimation = () => {
	return (
		<div style={{ width: 300, margin: '0 auto' }}>
			<Lottie animationData={animationData} loop={true} />
		</div>
	)
}

export default WelcomeAnimation
