export interface Order {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  products: {
    _id: string;
    quantity: number;
    product: {
      _id: string;
      name: string;
      price: number;
      imageUrl: string;
      discount: boolean;
      priceInDiscount: number;
    };
  }[];
};
