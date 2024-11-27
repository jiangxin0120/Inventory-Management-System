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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDTO>>> GetAllUsers()
        {
            var users = await _repository.GetAllUsersAsync();
            return Ok(_mapper.Map<IEnumerable<UserReadDTO>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDTO>> GetUserById(string id)
        {
            var user = await _repository.GetUserByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(_mapper.Map<UserReadDTO>(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserReadDTO>> CreateUser(UserCreateDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.UserId = Guid.NewGuid().ToString(); // Generate a unique ID
            await _repository.AddUserAsync(user);
            var userReadDto = _mapper.Map<UserReadDTO>(user);
            return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, userReadDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, UserUpdateDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            user.UserId = id;
            await _repository.UpdateUserAsync(user);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateUserPartial(string id, [FromBody] JsonPatchDocument<User> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest("Invalid JSON Patch document.");
            }

            // Retrieve the user by ID
            var user = await _repository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            // Apply the patch document to the user object
            patchDoc.ApplyTo(user, (error) =>
            {
                // This lambda function handles validation errors
                ModelState.AddModelError(error.AffectedObject?.ToString() ?? "Unknown", error.ErrorMessage);
            });

            // Check if the ModelState is valid after applying the patch
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Save changes to the repository
            await _repository.UpdateUserAsync(user);
            return NoContent();
        }






        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            await _repository.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
