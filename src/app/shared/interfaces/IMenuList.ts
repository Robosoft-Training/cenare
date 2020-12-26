export interface IMenuList {
  menu: Menu;
  price: number;
}

export interface Menu {
  menu_id: number;
  item_name: string;
  cook_time: number;
  category: string;
  course: string;
  desrcription: string;
  item_image_path: string;
}
