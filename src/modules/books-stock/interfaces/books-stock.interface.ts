export interface BooksStockInterface {
    bookId: string
    bookName: string
    quantity: number
    totalQuantity: number
    quantityBought: number
    totalOrder: number
    lastOrderAt: Date
    quantityUpdateAt: Date
    isAvailable: boolean
}