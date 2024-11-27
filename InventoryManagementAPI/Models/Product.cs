using Amazon.DynamoDBv2.DataModel;

namespace InventoryManagementAPI.Models
{
    [DynamoDBTable("Products")]
    public class Product
    {
        [DynamoDBHashKey]
        public string ProductId { get; set; } // Partition Key

        [DynamoDBProperty]
        public string Name { get; set; }

        [DynamoDBProperty]
        public string CategoryId { get; set; }

        [DynamoDBProperty]
        public int QuantityInStock { get; set; }

        [DynamoDBProperty]
        public decimal Price { get; set; }
    }

}
