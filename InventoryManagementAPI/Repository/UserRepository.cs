using Amazon.DynamoDBv2.DataModel;
using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDynamoDBContext _context;

        public UserRepository(IDynamoDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.ScanAsync<User>(new List<ScanCondition>()).GetRemainingAsync();
        }

        public async Task<User> GetUserByIdAsync(string id)
        {
            return await _context.LoadAsync<User>(id);
        }

        public async Task AddUserAsync(User user)
        {
            await _context.SaveAsync(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _context.SaveAsync(user);
        }

        public async Task UpdateUserPartialAsync(string id, Action<User> updateAction)
        {
            var user = await _context.LoadAsync<User>(id);
            if (user != null)
            {
                updateAction(user);
                await _context.SaveAsync(user);
            }
        }

        public async Task DeleteUserAsync(string id)
        {
            await _context.DeleteAsync<User>(id);
        }
    }
}
