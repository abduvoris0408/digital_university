import Lottie from 'lottie-react'
import animationData from '../../assets/register.json'

const SignUpAnimation = () => {
	return (
		<div style={{ width: 300, margin: '0 auto' }}>
			<Lottie animationData={animationData} loop={true} />
		</div>
	)
}

export default SignUpAnimation
