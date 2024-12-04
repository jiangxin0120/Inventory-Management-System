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
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public ProductsController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductReadDTO>>> GetAllProducts()
        {
            var products = await _repository.GetAllProductsAsync();
            return Ok(_mapper.Map<IEnumerable<ProductReadDTO>>(products));
        }

        // GET: api/Products/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductReadDTO>> GetProductById(string id)
        {
            var product = await _repository.GetProductByIdAsync(id);
            if (product == null) return NotFound();
            return Ok(_mapper.Map<ProductReadDTO>(product));
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<ProductReadDTO>> CreateProduct(ProductCreateDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.ProductId = Guid.NewGuid().ToString(); 
            await _repository.AddProductAsync(product);
            var productReadDto = _mapper.Map<ProductReadDTO>(product);
            return CreatedAtAction(nameof(GetProductById), new { id = product.ProductId }, productReadDto);
        }

        // PUT: api/Products/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(string id, ProductUpdateDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            product.ProductId = id;

            await _repository.UpdateProductAsync(product);
            return NoContent();
        }

        // PATCH: api/Products/{id}
        [HttpPatch("{id}")]
        public async Task<IActionResult> UpdateProductPartial(string id, [FromBody] JsonPatchDocument<Product> patchDoc)
        {
            if (patchDoc == null) return BadRequest();

            await _repository.UpdateProductPartialAsync(id, product =>
            {
                patchDoc.ApplyTo(product);
            });

            return NoContent();
        }

        // DELETE: api/Products/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(string id)
        {
            await _repository.DeleteProductAsync(id);
            return NoContent();
        }
    }
}
