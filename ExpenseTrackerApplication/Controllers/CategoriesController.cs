using ExpenseTrackerApplication.Data;
using ExpenseTrackerApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Security.Claims;

namespace ExpenseTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        ApplicationDbContext _appdb = new ApplicationDbContext();

        [HttpGet]
        [Authorize]
        //https://localhost:7145/api/categories
        public IActionResult Get()
        {
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
                return NotFound();

            var items = _appdb.Categories.Select(c => new { c.Id, c.Title, type = c.Type });
            return Ok(items);
        }

        [HttpPost]
        [Authorize]
        //https://localhost:7145/api/categories
        public IActionResult Post([FromBody] Category category)
        {
            if (category == null) { return NoContent(); }
            else
            {
                var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var user = _appdb.Users.FirstOrDefault(u => u.Email == userEmail);
                if (user == null)
                    return NotFound();

                var itemExists = _appdb.Categories.FirstOrDefault(m => m.Title == category.Title);
                if (itemExists != null)
                    return BadRequest();

                _appdb.Categories.Add(category);
                _appdb.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
        }
    }
}
