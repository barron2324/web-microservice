import { ESortBooksQuery } from "src/modules/books/dto/books-query.dto"
import CategoryEnum from "./enum/category.enum"

export class BooksCategoryUtil {
    static getQueryByCategory(key: string, query?: Record<string, any>) {
        if (key === CategoryEnum.ALL) {
            return { ...query }
        }

        if (key === CategoryEnum.ACTION) {
            return {...query, category: CategoryEnum.ACTION}
        }

        if (key === CategoryEnum.ADVENTURE) {
            return {...query, category: CategoryEnum.ADVENTURE}
        }

        if (key === CategoryEnum.BUSINESS) {
            return {...query, category: CategoryEnum.BUSINESS}
        }

        if (key === CategoryEnum.COMEDY) {
            return {...query, category: CategoryEnum.COMEDY}
        }

        if (key === CategoryEnum.CRAFTS) {
            return {...query, category: CategoryEnum.CRAFTS}
        }

        if (key === CategoryEnum.CRIME) {
            return {...query, category: CategoryEnum.CRIME}
        }

        if (key === CategoryEnum.DRAMA) {
            return {...query, category: CategoryEnum.DRAMA}
        }

        if (key === CategoryEnum.GUIDE) {
            return {...query, category: CategoryEnum.GUIDE}
        }

        if (key === CategoryEnum.HEALING) {
            return {...query, category: CategoryEnum.HEALING}
        }

        if (key === CategoryEnum.HUMOR) {
            return {...query, category: CategoryEnum.HUMOR}
        }

        if (key === CategoryEnum.JOURNAL) {
            return {...query, category: CategoryEnum.JOURNAL}
        }

        if (key === CategoryEnum.JOURNAL) {
            return {...query, category: CategoryEnum.JOURNAL}
        }

        if (key === CategoryEnum.MUSIC) {
            return {...query, category: CategoryEnum.MUSIC}
        }

        if (key === CategoryEnum.ROMANTIC) {
            return {...query, category: CategoryEnum.ROMANTIC}
        }
        
        if (key === CategoryEnum.SPORTS) {
            return {...query, category: CategoryEnum.SPORTS}
        }

        if (key === CategoryEnum.TRAVEL) {
            return {...query, category: CategoryEnum.TRAVEL}
        }
    }

    static sort(key: string) {
        if (key === ESortBooksQuery.PRICE_DESC) {
            return { price: 'desc' }
        }
        if (key === ESortBooksQuery.PRICE_ASC) {
            return { price: 'asc' }
        }
        if (key === ESortBooksQuery.QUANTITY_ASC) {
            return { quantity: 'asc' }
        }
        if (key === ESortBooksQuery.QUANTITY_DESC) {
            return { quantity: 'desc' }
        }
    }
}