using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExpenseTrackerApplication.Models
{
    public enum TransactionType
    {
        Expense,
        expense,
        Income,
        income
    }

    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [Required(ErrorMessage = "Title is required.")]
        public string Title { get; set; }

        //[Column(TypeName = "nvarchar(5)")]
        //public string Icon { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        [Required(ErrorMessage = "Type is required.")]
        [EnumDataType(typeof(TransactionType), ErrorMessage = "The Type field must be either 'Expense' or 'Income'.")]
        public string Type { get; set; }

        [JsonIgnore]
        public ICollection<Transaction> Transactions { get; set; }
    }
}
