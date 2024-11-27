using InventoryManagementAPI.Models;
using Microsoft.AspNetCore.JsonPatch;

namespace InventoryManagementAPI.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task UpdateProductPartialAsync(int id, JsonPatchDocument<Product> patchDoc);
        Task DeleteProductAsync(int id);
    }

}
