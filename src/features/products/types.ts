export interface Product {
  _id: string;
  productName: string;
  description: string;
  unitPrice: number;
  unitsInStock: number;
  categoryId: string;
}

export interface ProductState {
  list: Product[] | any[]; // -> null | any
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selected: Product | null;
}

export interface ProductType {
  key: string;
  _id: string;
  productName: string;
  description?: string;
  unitPrice: number;
  unitsInStock: number;
  settings?: React.ReactNode;
  // tags: string[];
}
