using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly Contexto _contexto;

        public CarsController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetAllAsync()
        {
            return await _contexto.Cars.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Car>> GetById(int Id)
        {
            Car car = await _contexto.Cars.FindAsync(Id);
            if (car == null)
                NotFound();

            return car;
        }

        [HttpPost]
        public async Task<ActionResult<Car>> SaveCarAsync(Car car)
        {
            await _contexto.Cars.AddAsync(car);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCarAsync(Car car)
        {
            _contexto.Cars.Update(car);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteCarAsync(int Id)
        {
            Car car = await _contexto.Cars.FindAsync(Id);
            if (car == null)
                return NotFound();
            _contexto.Remove(car);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}
