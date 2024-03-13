import CategoryEnum from "../enum/category.enum";

export interface BooksInterface {
    bookName: string;
    price: number;
    imageUrl: string;
    publisher: string;
    category: CategoryEnum;
    isAvailable: boolean
};