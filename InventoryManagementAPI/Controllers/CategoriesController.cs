﻿using AutoMapper;
using InventoryManagementAPI.DTOs;
using InventoryManagementAPI.Models;
using InventoryManagementAPI.Repository;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryReadDTO>>> GetAllCategories()
        {
            var categories = await _repository.GetAllCategoriesAsync();
            return Ok(_mapper.Map<IEnumerable<CategoryReadDTO>>(categories));
        }

        // GET: api/Categories/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryReadDTO>> GetCategoryById(string id)
        {
            var category = await _repository.GetCategoryByIdAsync(id);
            if (category == null) return NotFound();
            return Ok(_mapper.Map<CategoryReadDTO>(category));
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<CategoryReadDTO>> CreateCategory(CategoryCreateDTO categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            category.CategoryID = Guid.NewGuid().ToString(); // Generate a new ID for DynamoDB
            await _repository.AddCategoryAsync(category);
            var categoryReadDto = _mapper.Map<CategoryReadDTO>(category);
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryID }, categoryReadDto);
        }

        // PUT: api/Categories/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, CategoryUpdateDTO categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            category.CategoryID = id;

            await _repository.UpdateCategoryAsync(category);
            return NoContent();
        }

        // PATCH: api/Categories/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateCategoryPartial(string id, [FromBody] JsonPatchDocument<Category> patchDoc)
        {
            if (patchDoc == null) return BadRequest();

            await _repository.UpdateCategoryPartialAsync(id, category =>
            {
                patchDoc.ApplyTo(category);
            });

            return NoContent();
        }

        // DELETE: api/Categories/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            await _repository.DeleteCategoryAsync(id);
            return NoContent();
        }
    }
}
