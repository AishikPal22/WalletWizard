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

        [HttpGet("UserTransactions")]
        [Authorize]
        //https://localhost:7145/api/transactions/usertransactions
        public IActionResult GetTransactionsByUser()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            var transaction = _appdb.Transactions.Where(c => c.UserId == user.Id).Select(
                    t => new TransactionDTO
                    {
                        //TransactionId = t.Id,
                        CategoryName = t.Category.Title,
                        CategoryType = t.Category.Type.ToLower(),
                        Amount = t.Amount,
                        Date = t.Date.ToString("D"),
                        //ToString("dd-MMM-yyyy"),
                        Note = t.Note
                    });
            if (transaction == null)
                return BadRequest();
            else
                return Ok(transaction);
        }

        [HttpGet("SortedTransactions")]
        [Authorize]
        //https://localhost:7145/api/transactions/sortedtransactions
        public IActionResult SortTransactionsByDate()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            var transaction = _appdb.Transactions.Where(c => c.UserId == user.Id).OrderBy(x => x.Date);
            var sortedTransaction = transaction.Select(
                    t => new TransactionDTO
                    {
                        //TransactionId = t.Id,
                        CategoryName = t.Category.Title,
                        CategoryType = t.Category.Type.ToLower(),
                        Amount = t.Amount,
                        Date = t.Date.ToString("D"),
                        //ToString("dd-MMM-yyyy"),
                        Note = t.Note
                    });
            if (sortedTransaction == null)
                return BadRequest();
            else
                return Ok(sortedTransaction);
        }

        [HttpGet("UserTransactionsByCategory")]
        [Authorize]
        //https://localhost:7145/api/transactions/usertransactionsbycategory?categoryid=0
        public IActionResult GetTransactionsByCategory(int categoryId)
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            var transaction = _appdb.Transactions.Where(x => x.UserId == user.Id);
            if (transaction == null)
                return BadRequest();
            else
            {
                var userTransaction = transaction.Where(c => c.CategoryId == categoryId).Select(
                        t => new TransactionDTO
                        {
                            //TransactionId = t.Id,
                            CategoryName = t.Category.Title,
                            CategoryType = t.Category.Type.ToLower(),
                            Amount = t.Amount,
                            Date = t.Date.ToString("D"),
                            Note = t.Note
                        });
                if(userTransaction.IsNullOrEmpty()) 
                    return NotFound();
                else
                    return Ok(userTransaction);
            }
        }

        [HttpGet("UserTransactionsByDate")]
        [Authorize]
        //https://localhost:7145/api/transactions/usertransactionsbydate?date=yyyy-MM-dd
        public IActionResult GetTransactionsByDate(DateTime date)
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            var transaction = _appdb.Transactions.Where(x => x.UserId == user.Id);
            if (transaction == null)
                return BadRequest();
            else
            {
                var userTransaction = transaction.Where(t => t.Date == date).Select(
                        t => new TransactionDTO
                        {
                            //TransactionId = t.Id,
                            CategoryName = t.Category.Title,
                            CategoryType = t.Category.Type.ToLower(),
                            Amount = t.Amount,
                            Date = t.Date.ToString("D"),
                            Note = t.Note
                        });
                if (userTransaction.IsNullOrEmpty())
                    return NotFound();
                else
                    return Ok(userTransaction);
            }
        }

        [HttpGet("UserTransactionDetails")]
        [Authorize]
        //https://localhost:7145/api/transactions/usertransactiondetails?id=0
        public IActionResult GetTransactionDetail(int id)
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
            var transaction = _appdb.Transactions.FirstOrDefault(c => c.Id == id && c.UserId == user.Id);
            if(transaction == null) 
                return NotFound();
            else
            {
                var userTransaction = _appdb.Transactions.Where(x => x.Id == transaction.Id).Select(
                        t => new TransactionDTO
                        {
                            //TransactionId = t.Id,
                            CategoryName = t.Category.Title,
                            CategoryType = t.Category.Type.ToLower(),
                            Amount = t.Amount,
                            Date = t.Date.ToString("D"),
                            Note = t.Note
                        });
                return Ok(userTransaction);
            }
        }

        [HttpPost]
        [Authorize]
        //https://localhost:7145/api/transactions
        public IActionResult Post([FromBody] Transaction transaction)
        {
            if (transaction == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null) { return NotFound(); }
                //property.IsTrending = false;
                transaction.UserId = user.Id;
                _appdb.Transactions.Add(transaction);
                _appdb.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
        }

        [HttpPut("{id}")]
        [Authorize]
        //https://localhost:7145/api/transactions/0
        public IActionResult Put(int id, [FromBody] Transaction transaction)
        {
            var transactionToEdit = _appdb.Transactions.FirstOrDefault(p => p.Id == id);
            if (transactionToEdit == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null) { return NotFound(); }
                if (transactionToEdit.UserId == user.Id)
                {
                    transactionToEdit.CategoryId = transaction.CategoryId;
                    transactionToEdit.Amount = transaction.Amount;
                    transactionToEdit.Note = transaction.Note;
                    transactionToEdit.Date = transaction.Date;
                    //property.IsTrending = false;
                    transaction.UserId = user.Id;
                    _appdb.SaveChanges();
                    return Ok("Record updated successfully!");
                }
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        //https://localhost:7145/api/transactions/0
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
