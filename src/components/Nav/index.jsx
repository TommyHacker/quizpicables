import './main.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Nav = () => {
	const { players } = useSelector((state) => state.players);
	const { playerMovesCount } = useSelector((state) => state.playerMovesCount);
	return (
		<nav>
			<Link to='/'>home</Link>
			<Link to='/finalresult'>finalresult</Link>
			<Link to='/loading'>loading</Link>
			<Link to='/question'>question</Link>
			<Link to='/waiting'>waiting</Link>
		</nav>
	);
};

export default Nav;
