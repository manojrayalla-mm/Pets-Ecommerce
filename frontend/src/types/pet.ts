export interface Pet {
  id: number;
  name: string;
  category: 'cat' | 'dog' | 'fish' | 'rabbit';
  breed: string;
  age: number;
  price: number;
  description: string;
  image: string;
  available: boolean;
  gender: 'male' | 'female';
  vaccinated: boolean;
}

export interface CartItem {
  pet: Pet;
  quantity: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Order {
  id: number;
  customerId: number;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
}
