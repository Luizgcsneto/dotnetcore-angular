using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
         [ApiController]
    [Route("api/[controller]")]
    public class TimesController : ControllerBase
    {
          private readonly Contexto _contexto;

        public TimesController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Times>>> GetAllAsync()
        {
            return await _contexto.Times.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Times>> GetById(int Id)
        {
            Times times = await _contexto.Times.FindAsync(Id);
            if (times == null)
                NotFound();

            return times;
        }

        [HttpPost]
        public async Task<ActionResult<Times>> SaveTimeAsync(Times time)
        {
            await _contexto.Times.AddAsync(time);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTimeAsync(Times time)
        {
            _contexto.Times.Update(time);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteTimeAsync(int Id)
        {
            Times time = await _contexto.Times.FindAsync(Id);
            if (time == null)
                return NotFound();
            _contexto.Remove(time);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}