export interface Products {
  name: string;
	description: string;
	imageUrl: string;
	price: number;
	ingredients: {name: string; icon: string; _id: string}[];
	discount: boolean;
	priceInDiscount: number;
	category: string;
	_id: string;
}
