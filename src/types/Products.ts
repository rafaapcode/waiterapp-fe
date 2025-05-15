export interface Products {
  name: string;
	description: string;
	imageUrl: string;
	price: number;
	ingredients: string[];
	discount: boolean;
	priceInDiscount: number;
	category: {
    _id: string;
    name: string;
    icon: string;
  };
	_id: string;
}
