import path from 'path';
import fs from 'fs/promises';

import { Component } from 'react';
import Link from 'next/link';

class HomePage extends Component {
	render() {
		const { products } = this.props;
		return (
			<div>
				<ul>
					{products.map((item) => (
						<li key={item.id}>
							<Link href={`/${item.id}`}>{item.title}</Link>
						</li>
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
		revalidate: 10,
	};
};

export default HomePage;
