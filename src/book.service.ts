import { Injectable } from "@nestjs/common";
import { Book, Prisma } from "@prisma/client";
import { PrismaService } from "./prisma.service";

@Injectable()
export class BookService {

    constructor(private prismaService: PrismaService) {}

    async getBook(id: Prisma.BookWhereUniqueInput): Promise<Book | null> {
        return this.prismaService.book.findUnique({
            where: id
        })
    }

    async createBook(data: Prisma.BookCreateInput): Promise<Book> {
        return this.prismaService.book.create({
            data,
        })
    }

    async updateBook(params: {
        where: Prisma.BookWhereUniqueInput;
        data: Prisma.BookUpdateInput;
    }): Promise<Book> {
        const { where, data } = params;
        return this.prismaService.book.update({
            data,
            where,
        });
    }

    async deleteBook(where: Prisma.BookWhereUniqueInput): Promise<Book> {
        return this.prismaService.book.delete({
            where,
        });
    }
}