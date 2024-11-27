using Amazon.DynamoDBv2.DataModel;

namespace InventoryManagementAPI.Models
{
    [DynamoDBTable("Users")]
    public class User
    {
        [DynamoDBHashKey]
        public string UserId { get; set; } // Partition Key

        [DynamoDBProperty]
        public string Username { get; set; }

        [DynamoDBProperty]
        public string Email { get; set; }

        [DynamoDBProperty]
        public string Password { get; set; }
    }
}
