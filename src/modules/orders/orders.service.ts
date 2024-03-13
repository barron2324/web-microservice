import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ORDERS_CMD, RMQService } from "src/constants";
import { createOrderDTO } from "./dto/create-order.dto";
import { Observable } from "rxjs";
import { ordersInterface } from "./interfaces/orders.interface";

@Injectable()
export class OrdersService {
    @Inject(RMQService.BOOKS) private readonly ordersServiceRMQ: ClientProxy

    createOrder(body: ordersInterface): Observable<any> {
        return this.ordersServiceRMQ.emit(
            {
                cmd: ORDERS_CMD,
                method: 'create-order',
            },
            body
        )
    }
}