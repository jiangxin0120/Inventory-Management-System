using InventoryManagementAPI.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace InventoryManagementAPI.Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task UpdateCategoryPartialAsync(int id, JsonPatchDocument<Category> patchDoc);
        Task DeleteCategoryAsync(int id);
    }

}
