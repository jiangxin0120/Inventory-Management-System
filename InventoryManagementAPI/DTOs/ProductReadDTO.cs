namespace InventoryManagementAPI.DTOs
{
    public class ProductReadDTO
    {
        public string ProductId { get; set; }
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public int QuantityInStock { get; set; }
        public decimal Price { get; set; }
    }

}
