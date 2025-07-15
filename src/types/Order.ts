export enum OrderStatus {
  WAITING = "WAITING",
  IN_PRODUCTION = "IN_PRODUCTION",
  DONE = "DONE",
}

export interface Order {
  _id: string;
  table: string;
  status: OrderStatus;
  products: {
    _id: string;
    quantity: number;
    price: number;
    discount: boolean;
    product: {
      _id: string;
      name: string;
      imageUrl: string;
      description: string;
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
    price: number;
    discount: boolean;
    id: string;
  }[];
};

export interface Products {
  _id: string | number;
  quantity: number;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    discount: boolean;
  };
}
