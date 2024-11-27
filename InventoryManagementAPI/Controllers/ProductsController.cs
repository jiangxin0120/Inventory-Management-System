using AutoMapper;
using InventoryManagementAPI.Data;
using InventoryManagementAPI.DTOs;
using InventoryManagementAPI.Models;
using InventoryManagementAPI.Repository;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDTO>>> GetAllProducts()
        {
            var products = await _repository.GetAllProductsAsync();
            return Ok(_mapper.Map<IEnumerable<ProductReadDTO>>(products));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDTO>> GetProductById(int id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(_mapper.Map<ProductReadDTO>(product));
        }

        [HttpPost]
        public async Task<ActionResult<ProductReadDTO>> CreateProduct(ProductCreateDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _repository.AddProductAsync(product);
            var productReadDto = _mapper.Map<ProductReadDTO>(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductID }, productReadDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductUpdateDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.ProductID = id;

            await _repository.UpdateProductAsync(product);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProductPartial(int id, [FromBody] JsonPatchDocument<Product> patchDoc)
        {
            await _repository.UpdateProductPartialAsync(id, patchDoc);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            await _repository.DeleteProductAsync(id);
            return NoContent();
        }
    }

}
