import { Test, TestingModule } from "@nestjs/testing";
import { resolveSoa } from "dns";
import { BookService } from "./book.service";
import { PrismaService } from "./prisma.service";

describe('BookService', () => {
    let bookService: BookService;
    const bookArray = [
        { id: 1, title: "book 1", author: "author 1", publishYear: 2001 },
        { id: 2, title: "book 2", author: "author 2", publishYear: 2002 },
        { id: 3, title: "book 3", author: "author 3", publishYear: 2003 },
      ];
      
      const oneBook = bookArray[0];
      
      const db = {
        book: {
          findMany: jest.fn().mockResolvedValue(bookArray),
          findUnique: jest.fn().mockResolvedValue(oneBook),
          findFirst: jest.fn().mockResolvedValue(oneBook),
          create: jest.fn().mockReturnValue(oneBook),
          save: jest.fn(),
          update: jest.fn().mockResolvedValue(oneBook),
          delete: jest.fn().mockResolvedValue(oneBook),
        },
      };
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [BookService, {
            provide:PrismaService,
            useValue: db,
        }],
      }).compile();
  
      bookService = app.get<BookService>(BookService);
    });

      it('should return one book', async () => {
        expect(await bookService.getBook({id:123})).toBe(oneBook);
      });
      it('should return all books', async () => {
        expect(await bookService.getAllBooks()).toEqual(bookArray);
      });
      it('should create a new book', async () => {
        expect(await bookService.createBook(oneBook)).toEqual(oneBook);
      });
      it('should update a book', async () => {
        expect(await bookService.updateBook({where:{id:oneBook.id}, data:oneBook})).toEqual(oneBook);
      });
      it('should delete a book', async () => {
        expect(await bookService.deleteBook({id:123})).toEqual(oneBook);
      });
  });