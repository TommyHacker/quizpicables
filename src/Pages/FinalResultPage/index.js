import React from 'react';
import ScoreBoard from '../../components/ScoreBoard';
import background from '../../assets/images/background8.jpg';

const FinalResultPage = () => {
	return (
		<>
			<div
				className='background-container'
				style={{
					backgroundImage: `url(${background})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
					height: '100vh',
					width: '100vw',
				}}
			>
				<ScoreBoard />
			</div>
		</>
	);
};

export default FinalResultPage;
