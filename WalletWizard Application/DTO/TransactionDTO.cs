namespace ExpenseTrackerApplication.DTO
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public int Amount { get; set; }

        public TransactionDTO(int id, DateTime date, string name, string category, string type, int amount)
        {
            Id = id;
            Date = date;
            Title = name;
            CategoryName = category;
            CategoryType = type;
            Amount = amount;
        }
    }
}
