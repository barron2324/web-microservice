import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { BOOKS_CMD, RMQService } from "src/constants";
import { CreateBooksDTO } from "./dto/create-books.dto";
import { Observable, lastValueFrom } from "rxjs";
import { BooksInterface } from "./interfaces/books.interface";
import { BooksQueryDto } from "./dto/books-query.dto";
import { PaginationResponseInterface } from "src/interfaces/pagination.interface";
import { BooksEntity } from "./entities/books.entity";

@Injectable()
export class BooksService {
    constructor(
        @Inject(RMQService.BOOKS) private readonly booksServiceRMQ: ClientProxy
    ) { }

    createBook(body: CreateBooksDTO): Observable<any> {
        return this.booksServiceRMQ.emit(
            {
                cmd: BOOKS_CMD,
                method: 'create-book'
            },
            body
        )
    }

    getBookName(bookName: string): Promise<BooksInterface> {
        return lastValueFrom(
            this.booksServiceRMQ.send(
                {
                    cmd: BOOKS_CMD,
                    method: 'get-by-bookName'
                },
                bookName
            )
        )
    }

    getBookById(bookId: string): Promise<BooksInterface> {
        return lastValueFrom(
            this.booksServiceRMQ.send(
                {
                    cmd: BOOKS_CMD,
                    method: 'get-book-by-id'
                },
                bookId
            )
        )
    }

    deleteBook(bookId: string): Observable<any> {
        return this.booksServiceRMQ.send(
            {
                cmd: BOOKS_CMD,
                method: 'delete-book'
            },
            bookId
        )
    }

    async getPagination(
        query: BooksQueryDto,
    ): Promise<PaginationResponseInterface<BooksEntity>> {
        return lastValueFrom(
            this.booksServiceRMQ.send(
                {
                    cmd: BOOKS_CMD,
                    method: 'getPagination',
                },
                query,
            ),
        )
    }
}