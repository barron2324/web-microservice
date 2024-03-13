import { Body, Controller, Get, InternalServerErrorException, Logger, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { createOrderBooksValidationPipe } from "./pipe/buy-books-validation.pipe";
import { createOrderDTO } from "./dto/create-order.dto";
import ReqUser from "src/decorators/req-user.decorator";
import { usersInterface } from "../users/interfaces/users.interface";
import { BooksStockService } from "../books-stock/books-stock.service";
import { BooksStockInterface } from "../books-stock/interfaces/books-stock.interface";

@Controller('orders')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class OrdersController {
    private readonly logger = new Logger(OrdersController.name)
    constructor(
        private readonly ordersService: OrdersService,
        private readonly booksStockService: BooksStockService
    ) { }

    @Post('buy-book')
    @ApiResponse({
        status: 200,
        description: 'Success'
    })
    async buyBook(@Body(createOrderBooksValidationPipe) body: createOrderDTO, @ReqUser() user: usersInterface): Promise<void> {
        const { book, bookStock, quantity } = body
        this.logger.log([body])
        try {
            await this.ordersService.createOrder({
                userId: user.userId,
                bookStockId: bookStock.bookId,
                quantity: body.quantity,
                totalPrice: book.price * body.quantity,
            })
        } catch (e) {
            this.logger.error(
                `catch on buyBook-userOrder: ${e?.message ?? JSON.stringify(e)}`,
            )
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }

        try {
            await this.booksStockService.updateStock(body.bookStock.bookId, {
                quantity: bookStock.quantity - quantity,
                quantityBought: bookStock.quantityBought + quantity,
                totalOrder: bookStock.totalOrder + 1
            })
        } catch (e) {
            this.logger.error(`catch on buy-book: ${e?.message ?? JSON.stringify(e)}`)
            throw new InternalServerErrorException({
                message: e?.message ?? e,
            })
        }
    }
}