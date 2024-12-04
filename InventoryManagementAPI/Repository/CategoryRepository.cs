using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.DocumentModel;
using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly IDynamoDBContext _context;

        public CategoryRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        // Retrieve all categories
        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            var conditions = new List<ScanCondition>();
            return await _context.ScanAsync<Category>(conditions).GetRemainingAsync();
        }

        // Retrieve a single category by ID
        public async Task<Category> GetCategoryByIdAsync(string id)
        {
            return await _context.LoadAsync<Category>(id);
        }

        // Add a new category
        public async Task AddCategoryAsync(Category category)
        {
            await _context.SaveAsync(category);
        }

        // Update an existing category
        public async Task UpdateCategoryAsync(Category category)
        {
            await _context.SaveAsync(category);
        }

        // Partial update (simulate JsonPatchDocument functionality)
        public async Task UpdateCategoryPartialAsync(string id, Action<Category> updateAction)
        {
            var category = await _context.LoadAsync<Category>(id);
            if (category != null)
            {
                updateAction(category); 
                await _context.SaveAsync(category);
            }
        }

        // Delete a category
        public async Task DeleteCategoryAsync(string id)
        {
            await _context.DeleteAsync<Category>(id);
        }
    }
}
