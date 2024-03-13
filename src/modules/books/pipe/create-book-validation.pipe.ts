import { BadRequestException, Injectable, Logger, PipeTransform } from '@nestjs/common'
import { BooksService } from '../books.service'
import { BooksInterface } from '../interfaces/books.interface'
import { CreateBooksDTO } from '../dto/create-books.dto'

@Injectable()
export class CreateBooksValidationPipe implements PipeTransform {
    private readonly logger = new Logger(CreateBooksValidationPipe.name)

    constructor(private readonly booksService: BooksService) { }

    async transform(body: CreateBooksDTO): Promise<CreateBooksDTO> {
        let book: BooksInterface
        try {
            book = await this.booksService.getBookName(body.bookName)
        } catch (e) {
            this.logger.error(
                `catch on book-name: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new BadRequestException({
                message: `${e?.message ?? e}`,
            })
        }
        if (book) {
            this.logger.error(`catch on book-name: name ${body.bookName} is already`)
            throw new BadRequestException({
                message: `title ${body.bookName} is already`,
            })
        }

        return body
    }
}
