using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
          private readonly Contexto _contexto;

        public CoursesController(Contexto contexto)
        {
            _contexto = contexto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Courses>>> GetAllAsync()
        {
            return await _contexto.Courses.ToListAsync();
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<Courses>> GetById(int Id)
        {
            Courses course = await _contexto.Courses.FindAsync(Id);
            if (course == null)
                NotFound();

            return course;
        }

        [HttpPost]
        public async Task<ActionResult<Courses>> SaveCourseAsync(Courses course)
        {
            
            await _contexto.Courses.AddAsync(course);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateCourseAsync(Courses course)
        {
            _contexto.Courses.Update(course);
            await _contexto.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteCourseAsync(int Id)
        {
            Courses course = await _contexto.Courses.FindAsync(Id);
            if (course == null)
                return NotFound();
            _contexto.Remove(course);
            await _contexto.SaveChangesAsync();
            return Ok();
        }
    }
}