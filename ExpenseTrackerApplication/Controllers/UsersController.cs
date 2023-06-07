using ExpenseTrackerApplication.Data;
using ExpenseTrackerApplication.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExpenseTrackerApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        ApplicationDbContext _appdb = new ApplicationDbContext();

        private IConfiguration _config;
        public UsersController(IConfiguration config)
        {
            _config = config;
        }

        [HttpPost("[action]")]
        //https://localhost:7145/api/users/register
        public IActionResult Register([FromBody] User user)
        {
            var userExists = _appdb.Users.FirstOrDefault(u => u.Email == user.Email);
            if (userExists != null)
            {
                return BadRequest("User with same email id already exists");
            }
            _appdb.Users.Add(user);
            _appdb.SaveChanges();
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("[action]")]
        //https://localhost:7145/api/users/login
        public IActionResult Login([FromBody] User user)
        {
            var currentUser = _appdb.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);

            if (currentUser == null) { return NotFound(); }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] { new Claim(ClaimTypes.Email, user.Email) };

            var token = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(jwt);
        }

        [HttpPost("[action]")]
        //https://localhost:7145/api/users/logout
        public IActionResult Logout()
        {
            // Invalidate the token by setting its expiration time to a past date/time
            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
            var jwtHandler = new JwtSecurityTokenHandler();
            var jwtToken = jwtHandler.ReadToken(token) as JwtSecurityToken;

            var expiredToken = new JwtSecurityToken(
                _config["JWT:Issuer"],
                _config["JWT:Audience"],
                jwtToken.Claims,
                DateTime.Now,
                DateTime.Now.AddMinutes(-60),  // Expired token with negative expiration time
                jwtToken.SigningCredentials
            );

            var newToken = jwtHandler.WriteToken(expiredToken);

            return Ok("Logout successful");
        }
    }
}
