export type Order = {
  id: number;
  table: string;
  date: string;
  name: string;
  category: string;
  total: number;
}

export const orders = [
  {
    id: 1,
    table: "123",
    date: "07/04/2025",
    name: "Frango com Catupiry, Quatro Queijos",
    category: "🍕 Pizza",
    total: 40.00,
  },
  {
    id: 2,
    table: "456",
    date: "07/04/2025",
    name: "Frango com Catupiry, Quatro Queijos",
    category: "🍕 Pizza",
    total: 40.00,
  },
  {
    id: 3,
    table: "789",
    date: "17/04/2025",
    name: "Frango com Catupiry, Quatro Queijos",
    category: "🍕 Pizza",
    total: 40.00,
  },
  {
    id: 3,
    table: "789",
    date: "27/04/2025",
    name: "Frango com Catupiry, Quatro Queijos",
    category: "🍕 Pizza",
    total: 40.00,
  },
]
