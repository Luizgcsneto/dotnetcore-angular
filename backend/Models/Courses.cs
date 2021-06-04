using System;

namespace backend.Models
{
    public class Courses
    {
        public int Id { get; set; }
         
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public double Price { get; set; }

        public int Code { get; set; }

        public int Duration { get; set; }

        public int Rating { get; set; }

        public string Description { get; set; }
        public DateTime ReleaseDate { get; set; }
  
    }
}