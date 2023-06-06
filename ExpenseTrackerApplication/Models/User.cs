using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerApplication.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        
        //[Required(ErrorMessage = "Please enter your username.")]
        public string Name { get; set; }
        
        //[Required(ErrorMessage = "Please enter a valid email id.")]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public string Email { get; set; }
        
        //[Required(ErrorMessage = "Please enter a valid phone number.")]
        [RegularExpression("^[0-9]*$")]
        public string Phone { get; set; }
        
        //[Required(ErrorMessage = "Please enter your password.")]
        public string Password { get; set; }
        
        public ICollection<Transaction> Transactions { get; set; }
    }
}
