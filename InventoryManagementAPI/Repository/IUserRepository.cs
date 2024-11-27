using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(string id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task UpdateUserPartialAsync(string id, Action<User> updateAction);
        Task DeleteUserAsync(string id);
    }
}
