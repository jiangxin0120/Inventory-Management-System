using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.DTOs
{
    public class CategoryUpdateDTO
    {
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; }

        public string Description { get; set; }
    }

}
