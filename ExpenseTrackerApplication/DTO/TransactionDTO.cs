﻿namespace ExpenseTrackerApplication.DTO
{
    public class TransactionDTO
    {
        //public int TransactionId { get; set; }
        public string CategoryName { get; set; }
        public string CategoryType { get; set; }
        public int Amount { get; set; }
        public string Note { get; set; }
        public string Date { get; set; }
    }
}