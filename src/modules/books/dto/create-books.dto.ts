import { ApiProperty } from "@nestjs/swagger";
import CategoryEnum from "../enum/category.enum";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateBooksDTO {
    @ApiProperty({
        example: 'book',
        required: true
    })
    @IsNotEmpty()
    bookName: string

    @ApiProperty({
        example: '100',
        required: true
    })
    @IsNotEmpty()
    price: number

    @ApiProperty({
        type: String,
        example: 'publisher'
    })
    @IsNotEmpty()
    publisher: string

    @ApiProperty({
        example: 'imgUrl',
        required: true
    })
    @IsNotEmpty()
    imageUrl: string;
    
    @ApiProperty({
        enum: CategoryEnum,
        example: CategoryEnum.COMEDY,
    })
    @IsEnum(CategoryEnum)
    @IsNotEmpty()
    category: CategoryEnum
}