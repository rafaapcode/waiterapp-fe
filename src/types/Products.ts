export interface Products {
  name: string;
	description: string;
	imageUrl: string;
	price: number;
	ingredients: {
    _id: string;
    name: string;
    icon: string;
  }[];
	discount: boolean;
	priceInDiscount: number;
	category: {
    _id: string;
    name: string;
    icon: string;
  };
	_id: string;
}
