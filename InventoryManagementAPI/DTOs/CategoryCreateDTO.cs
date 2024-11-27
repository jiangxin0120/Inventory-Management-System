using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.DTOs
{
    public class CategoryCreateDTO
    {
        public string CategoryName { get; set; }
        public string Description { get; set; }
    }


}
