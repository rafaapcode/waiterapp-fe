export interface Order {
  _id: string;
  table: string;
  status: string;
  products: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      price: number;
      imagePath: string;
    };
  }[];
};
