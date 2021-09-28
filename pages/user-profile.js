import { Component } from 'react';

class UserProfilePage extends Component {
	render() {
		return <h1>{this.props.username}</h1>;
	}
}

export default UserProfilePage;

export const getServerSideProps = async (context) => {
	const { params, req, res } = context;
	return {
		props: { username: 'Hasibullah' },
	};
};
