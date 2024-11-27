namespace InventoryManagementAPI.DTOs
{
    public class ProductUpdateDTO
    {
        public string Name { get; set; }
        public string CategoryId { get; set; }
        public int QuantityInStock { get; set; }
        public decimal Price { get; set; }
    }

}
