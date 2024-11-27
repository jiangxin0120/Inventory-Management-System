using System.ComponentModel.DataAnnotations;

namespace InventoryManagementAPI.DTOs
{
    public class CategoryCreateDTO
    {
        [Required]
        [StringLength(100)]
        public string CategoryName { get; set; }

        public string Description { get; set; }
    }

}
