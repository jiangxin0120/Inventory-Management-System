using Amazon.DynamoDBv2.DataModel;

namespace InventoryManagementAPI.Models
{
    [DynamoDBTable("Categories")]
    public class Category
    {
        [DynamoDBHashKey] // Partition Key
        public string CategoryID { get; set; } 

        [DynamoDBProperty]
        public string CategoryName { get; set; }

        [DynamoDBProperty]
        public string Description { get; set; }


    }
}
