import {Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';

describe('BookController', () => {
    let bookController: BookController;
    let bookService: BookService;

    const book ={
        id:123,
        title : "mock titile",
        author : "mock author",
        publishYear : 2001 
    }
    const mockBookService ={
        getBook : jest.fn(id =>
          book
        )
    };
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        controllers: [BookController],
        providers: [BookService],
      }).overrideProvider(BookService).useValue(mockBookService).compile();
      //}).compile();
  
      bookController = app.get<BookController>(BookController);
      bookService = app.get<BookService>(BookService);
    });
      it('should just run', () => {
        const result =['test'];
          bookController.getBookById = jest.fn().mockReturnValueOnce(result);
        expect(bookController.getBookById("hello")).toBe(result);
      });

      it('should return book', async () => {
        //jest.spyOn(bookService, "getBook").mockResolvedValue(book);
        expect(await bookController.getBookById("123")).toEqual(book);
        expect(mockBookService.getBook).toHaveBeenCalledWith({id:123});
      });
  });