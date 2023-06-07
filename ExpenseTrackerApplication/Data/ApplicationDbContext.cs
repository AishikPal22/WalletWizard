using ExpenseTrackerApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerApplication.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=ExpenseTrackerDb;Trusted_Connection=True;Encrypt=False;");
        }
    }
}
