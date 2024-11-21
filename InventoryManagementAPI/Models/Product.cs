namespace InventoryManagementAPI.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public int StockLevel { get; set; }
        public int ReorderLevel { get; set; }
        public int CategoryID { get; set; }
        public Category Category { get; set; }
    }

}
