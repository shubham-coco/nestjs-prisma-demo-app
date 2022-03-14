import { Test, TestingModule } from "@nestjs/testing";
import { BookService } from "./book.service";
import { PrismaService } from "./prisma.service";

describe('BookService', () => {
    let bookService: BookService;
    let prismaService: PrismaService;

    const bookDto ={
        id:123,
        title : "mock titile",
        author : "mock author",
        publishYear : 2001 
    }
    const mockPrismaService ={
        //prisma.book.findUnique = jest.fn().mockImplementation((id)=>Promise.resolve(bookDto));
    };
  
    beforeEach(async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [BookService, PrismaService],
      //}).overrideProvider(PrismaService).useValue(mockPrismaService).compile();
      }).compile();
  
      bookService = app.get<BookService>(BookService);
      prismaService = app.get<PrismaService>(PrismaService);
    });

      it('should return book', async () => {
        prismaService.book.findUnique = jest.fn().mockReturnValueOnce(bookDto);
        expect(await bookService.getBook({id:123})).toBe(bookDto);
      });
  });