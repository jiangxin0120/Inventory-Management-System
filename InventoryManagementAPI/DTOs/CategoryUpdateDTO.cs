using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.DTOs
{
    public class CategoryUpdateDTO
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
    }


}
