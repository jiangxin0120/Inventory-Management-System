using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.DTOs
{
    public class UserReadDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }

}
