using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExpenseTrackerApplication.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Please select a category.")]
        public int CategoryId { get; set; }
        [JsonIgnore]
        public Category Category { get; set; }

        [Required(ErrorMessage = "Please enter an amount.")]
        [Range(1, int.MaxValue, ErrorMessage = "Amount should be greater than 0.")]
        public int Amount { get; set; }

        [Column(TypeName = "nvarchar(75)")]
        public string Note { get; set; }

        [Column(TypeName = "Date")]
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
