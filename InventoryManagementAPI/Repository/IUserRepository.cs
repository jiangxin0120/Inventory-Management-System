using InventoryManagementAPI.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task AddUserAsync(User user);
        Task UpdateUserAsync(User user);
        Task UpdateUserPartialAsync(int id, JsonPatchDocument<User> patchDoc);
        Task DeleteUserAsync(int id);
    }

}
