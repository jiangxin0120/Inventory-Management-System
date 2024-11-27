using AutoMapper;
using InventoryManagementAPI.DTOs;
using InventoryManagementAPI.Models;
using InventoryManagementAPI.Repository;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDTO>>> GetAllUsers()
        {
            var users = await _repository.GetAllUsersAsync();
            return Ok(_mapper.Map<IEnumerable<UserReadDTO>>(users));
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDTO>> GetUserById(int id)
        {
            var user = await _repository.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(_mapper.Map<UserReadDTO>(user));
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<UserReadDTO>> CreateUser(UserCreateDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            await _repository.AddUserAsync(user);
            var userReadDto = _mapper.Map<UserReadDTO>(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, userReadDto);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserUpdateDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.UserId = id;

            await _repository.UpdateUserAsync(user);
            return NoContent();
        }

        // PATCH: api/Users/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUserPartial(int id, [FromBody] JsonPatchDocument<User> patchDoc)
        {
            await _repository.UpdateUserPartialAsync(id, patchDoc);
            return NoContent();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            await _repository.DeleteUserAsync(id);
            return NoContent();
        }
    }

}
