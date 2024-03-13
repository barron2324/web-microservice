import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable, lastValueFrom } from "rxjs";
import { BOOKSSTOCK_CMD, RMQService } from "src/constants";
import { BooksStockInterface } from "./interfaces/books-stock.interface";
import { BooksStockQueryDto } from "./dto/books-stock-query.dto";
import { PaginationResponseInterface } from "src/interfaces/pagination.interface";
import { BooksStockEntity } from "./entities/books-stock.entity";
import { updateBooksStockInterface } from "./interfaces/update-books-stock.interface";

@Injectable()
export class BooksStockService {
    @Inject(RMQService.BOOKS) private readonly booksStockService: ClientProxy

    getBookStockById(bookId: string): Promise<BooksStockInterface> {
        return lastValueFrom(
            this.booksStockService.send(
                {
                    cmd: BOOKSSTOCK_CMD,
                    method: 'get-book-stock-by-id'
                },
                bookId
            )
        )
    }

    updateStock(bookId: string, body: updateBooksStockInterface): Observable<any> {
        return this.booksStockService.send(
            {
                cmd: BOOKSSTOCK_CMD,
                method: 'update-stock',
            },
            {
                bookId,
                body
            }
        )
    }

    async getPagination(
        query: BooksStockQueryDto,
    ): Promise<PaginationResponseInterface<BooksStockEntity>> {
        return lastValueFrom(
            this.booksStockService.send(
                {
                    cmd: BOOKSSTOCK_CMD,
                    method: 'getPagination',
                },
                query,
            ),
        )
    }
}