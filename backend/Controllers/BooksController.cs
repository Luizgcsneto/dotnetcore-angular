using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
          private readonly Contexto _contexto;

        public BooksController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Books>>> GetAllAsync()
        {
            return await _contexto.Books.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Books>> GetById(int Id)
        {
            Books book = await _contexto.Books.FindAsync(Id);
            if (book == null)
                NotFound();

            return book;
        }

        [HttpPost]
        public async Task<ActionResult<Books>> SaveBookAsync(Books book)
        {
            await _contexto.Books.AddAsync(book);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateBookAsync(Books book)
        {
            _contexto.Books.Update(book);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteBookAsync(int Id)
        {
            Books book = await _contexto.Books.FindAsync(Id);
            if (book == null)
                return NotFound();
            _contexto.Remove(book);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}