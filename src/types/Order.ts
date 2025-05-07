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
}

export type HistoryOrder = {
  id: string;
  table: string;
  data: string;
  totalPrice: string;
  name: string;
  category: string;
  itens: {
    imageUrl: string;
    quantity: number;
    name: string;
    price: string;
  }[];
}

export interface Products {
  _id: string | number;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    discount: boolean;
    priceInDiscount: number;
  };
}

