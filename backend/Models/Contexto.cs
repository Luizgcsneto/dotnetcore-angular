using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class Contexto : DbContext
    {
        public Contexto(DbContextOptions<Contexto> opcoes) : base(opcoes)
        {

        }

        public DbSet<Times> Times { get; set; }

        public DbSet<Courses> Courses { get; set; }

        public DbSet<Books> Books { get; set; }

        public DbSet<Car> Cars { get; set; }
    }
}