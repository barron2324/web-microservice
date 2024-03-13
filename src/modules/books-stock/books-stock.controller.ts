import { Controller, Get, InternalServerErrorException, Logger, Query } from "@nestjs/common";
import { BooksStockService } from "./books-stock.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import BooksStockQueryEntity from "./entities/books-stock-query.entity";
import { BooksStockQueryDto } from "./dto/books-stock-query.dto";
import { BooksCategoryUtil } from "../utils/books";
import { filter } from "rxjs";

@Controller('books-stock')
@ApiTags('books')
export class BooksStockController {
    private readonly logger = new Logger(BooksStockController.name)
    
    constructor(
        private readonly booksStockService: BooksStockService
    ) {}

    @Get('pagination')
    @ApiResponse({
        status: 200,
        description: 'Success',
        type: BooksStockQueryEntity,
    })
    async getPagination(
        @Query() query: BooksStockQueryDto,
    ): Promise<BooksStockQueryEntity> {
        const { filter, kSort, bookName } = query

        query.sort = BooksCategoryUtil.sort(kSort) as Record<string, any>

        if(bookName) {
            filter.bookName = { $regex: `${bookName}` }
        }

        try {
            query.perPage = 5
            return this.booksStockService.getPagination(query)
        } catch (e) {
            this.logger.error(
                `catch on getPagination: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }
}