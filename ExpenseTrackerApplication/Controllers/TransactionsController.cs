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
        //https://localhost:7145/api/transactions/usertransactions
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
        //https://localhost:7145/api/transactions/sortedtransactions
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
        //https://localhost:7145/api/transactions
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
        //https://localhost:7145/api/transactions/0
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


//[HttpGet("CategoryId/{id}")]
//[Authorize]
////https://localhost:7145/api/transactions/usertransactionsbycategory?categoryid=0
//public IActionResult GetTransactionsByCategory(string id)
//{
//    var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
//    var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

//    int categoryId = int.Parse(id);
//    var transactions = _appdb.Transactions.Where(x => x.UserId == user.Id && x.CategoryId == categoryId).Select(
//                t => new TransactionDTO(t.Category.Title, t.Category.Type.ToLower(), t.Amount, t.Note, t.Date.ToString("D")));

//    if (transactions.IsNullOrEmpty())
//        return NotFound();
//    else
//        return Ok(transactions);
//}

//[HttpGet("Date/{day}")]
//[Authorize]
////https://localhost:7145/api/transactions/usertransactionsbydate?date=yyyy-MM-dd
//public IActionResult GetTransactionsByDate(string day)
//{
//    var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
//    var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

//    DateTime date = DateTime.Parse(day);
//    var transactions = _appdb.Transactions.Where(x => x.UserId == user.Id && x.Date == date).Select(
//                t => new TransactionDTO(t.Category.Title, t.Category.Type.ToLower(), t.Amount, t.Note, t.Date.ToString("D")));

//    if (transactions.IsNullOrEmpty())
//        return NotFound();
//    else
//        return Ok(transactions);
//}

//[HttpGet("{id}")]
//[Authorize]
////https://localhost:7145/api/transactions/usertransactiondetails?id=0
//public IActionResult GetTransactionDetail(int id)
//{
//    var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
//    var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

//    var transaction = _appdb.Transactions.FirstOrDefault(c => c.Id == id && c.UserId == user.Id);

//    if(transaction == null) 
//        return BadRequest();

//    var transactiondto = _appdb.Transactions.Where(x => x.Id == transaction.Id).Select(
//                t => new TransactionDTO(t.Category.Title, t.Category.Type.ToLower(), t.Amount, t.Note, t.Date.ToString("D")));

//    if (transactiondto.IsNullOrEmpty())
//        return NotFound();
//    else
//        return Ok(transactiondto);
//}