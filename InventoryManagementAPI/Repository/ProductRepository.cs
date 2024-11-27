using Amazon.DynamoDBv2.DataModel;
using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly IDynamoDBContext _context;

        public ProductRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.ScanAsync<Product>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public async Task<Product> GetProductByIdAsync(string id)
        {
            return await _context.LoadAsync<Product>(id);
        }

        public async Task AddProductAsync(Product product)
        {
            await _context.SaveAsync(product);
        }

        public async Task UpdateProductAsync(Product product)
        {
            await _context.SaveAsync(product);
        }

        public async Task UpdateProductPartialAsync(string id, Action<Product> updateAction)
        {
            var product = await _context.LoadAsync<Product>(id);
            if (product != null)
            {
                updateAction(product);
                await _context.SaveAsync(product);
            }
        }

        public async Task DeleteProductAsync(string id)
        {
            await _context.DeleteAsync<Product>(id);
        }
    }
}
