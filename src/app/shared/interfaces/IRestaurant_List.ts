export interface IRestaurant {
  restaurant: Restaurant;
  rating: number;
  cuisines: string[];
}

export interface Restaurant {
  restaurant_id: number;
  restaurant_name: string;
  restaurant_latitude?: number;
  restaurant_longitude?: number;
  restaurant_city: string;
  restaurant_address: string;
  open_time: number[];
  close_time: number[];
  avg_delivery_time: number;
  min_order_cost: number;
  avg_order_cost: number;
  phone_number?: string;
  payment?: string;
  menu_image: string;
  restaurant_image: string;
}
