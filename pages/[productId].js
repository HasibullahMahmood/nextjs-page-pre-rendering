import path from 'path';
import fs from 'fs/promises';

import { Component } from 'react';

class ProductDetail extends Component {
	render() {
		if (!this.props.productDetail) {
			return <p>Loading...</p>;
		}
		const { title, description } = this.props.productDetail;
		return (
			<div>
				<div>{title}</div>
				<div>{description}</div>
			</div>
		);
	}
}

export const getStaticProps = async (context) => {
	const { productId } = context.params;
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	const productDetail = data.products.find((item) => item.id === productId);

	if (!productDetail) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			productDetail,
		},
	};
};

export const getStaticPaths = async () => {
	const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
	const jsonData = await fs.readFile(filePath);
	const data = JSON.parse(jsonData);
	const paths = data.products.map((product) => ({ params: { productId: product.id } }));
	return {
		paths: [{ params: { productId: 'p1' } }],
		fallback: true,
	};
};

export default ProductDetail;
