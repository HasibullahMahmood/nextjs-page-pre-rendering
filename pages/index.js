import { Component } from 'react';
import path from 'path';
import fs from 'fs/promises';

class HomePage extends Component {
	render() {
		const { products } = this.props;
		return (
			<div>
				<ul>
					{products.map((item) => (
						<li key={item.id}>{item.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

export const getStaticProps = async () => {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	return {
		props: {
			products: data.products,
		},
	};
};

export default HomePage;
