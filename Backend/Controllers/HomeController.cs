using ExpenseTrackerApplication.Data;
using ExpenseTrackerApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ExpenseTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        ApplicationDbContext _appdb = new ApplicationDbContext();

        [HttpGet("CurrentBalance")]
        [Authorize]
        public IActionResult GetBalance()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            if (user == null)
                return NotFound();
            else
            {
                List<Transaction> SelectedTransactions = _appdb.Transactions
                .Include(x => x.Category)
                .Where(y => y.UserId == user.Id)
                .ToList();

                //Total Income
                int TotalIncome = SelectedTransactions
                    .Where(i => i.Category.Type == "Income" || i.Category.Type == "income")
                    .Sum(j => j.Amount);

                //Total Expense
                int TotalExpense = SelectedTransactions
                    .Where(i => i.Category.Type == "Expense" || i.Category.Type == "expense")
                    .Sum(j => j.Amount);

                //Current Balance
                //int Balance = TotalIncome - TotalExpense;

                return Ok(new { totalIncome = TotalIncome, totalExpense = TotalExpense});
            }
        }
    }
}
