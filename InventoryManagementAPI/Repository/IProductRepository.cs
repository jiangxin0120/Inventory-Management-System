using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(string id);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task UpdateProductPartialAsync(string id, Action<Product> updateAction);
        Task DeleteProductAsync(string id);
    }
}
