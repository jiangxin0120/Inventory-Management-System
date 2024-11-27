using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(string id);
        Task AddCategoryAsync(Category category);
        Task UpdateCategoryAsync(Category category);
        Task UpdateCategoryPartialAsync(string id, Action<Category> updateAction);
        Task DeleteCategoryAsync(string id);
    }
}
