using ExpenseTrackerApplication.Data;
using ExpenseTrackerApplication.DTO;
using ExpenseTrackerApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.Security.Claims;

namespace ExpenseTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController : ControllerBase
    {
        ApplicationDbContext _appdb = new ApplicationDbContext();

        [HttpGet("MyTransactions")]
        [Authorize]
        public IActionResult GetTransactionsByUser()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

            var transactions = _appdb.Transactions
                .Where(c => c.UserId == user.Id)
                .Select(t => new TransactionDTO(t.Id, t.Date, t.Note, t.Category.Title, t.Category.Type, t.Amount));

            if (transactions == null)
                return BadRequest();
            else
                return Ok(transactions);
        }

        [HttpGet("SortByDate")]
        [Authorize]
        public IActionResult SortTransactionsByDate()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

            var transactions = _appdb.Transactions
                .Where(c => c.UserId == user.Id).OrderByDescending(x => x.Date)
                .Select(t => new TransactionDTO(t.Id, t.Date, t.Note, t.Category.Title, t.Category.Type, t.Amount));

            if (transactions == null)
                return BadRequest();
            else
                return Ok(transactions);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Post([FromBody] GenericDTO transactiondto)
        {
            if (transactiondto == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null) { return NotFound(); }

                var category = _appdb.Categories.FirstOrDefault(c => c.Title == transactiondto.CategoryName);
                if (category == null)
                    return NotFound();

                Transaction transaction = new()
                {
                    UserId = user.Id,
                    CategoryId = category.Id,
                    Amount = transactiondto.Amount,
                    Note = transactiondto.Title,
                    Date = transactiondto.Date
                };
                _appdb.Transactions.Add(transaction);
                _appdb.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Put(int id, [FromBody] GenericDTO transactiondto)
        {
            var transactionToEdit = _appdb.Transactions.FirstOrDefault(p => p.Id == id);
            if (transactionToEdit == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null) { return NotFound(); }

                var category = _appdb.Categories.FirstOrDefault(c => c.Title == transactiondto.CategoryName);
                if (category == null)
                    return NotFound();

                transactionToEdit.CategoryId = category.Id;
                transactionToEdit.Amount = transactiondto.Amount;
                transactionToEdit.Note = transactiondto.Title;
                transactionToEdit.Date = transactiondto.Date;
                //property.IsTrending = false;
                //transaction.UserId = user.Id;
                _appdb.SaveChanges();
                return Ok("Record updated successfully!");
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var transactionToDelete = _appdb.Transactions.FirstOrDefault(p => p.Id == id);
            if (transactionToDelete == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null) { return NotFound(); }
                if (transactionToDelete.UserId == user.Id)
                {
                    _appdb.Transactions.Remove(transactionToDelete);
                    _appdb.SaveChanges();
                    return Ok("Record deleted successfully!");
                }
                return BadRequest();
            }
        }

    }
}