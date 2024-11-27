using InventoryManagementAPI.Models;

namespace InventoryManagementAPI.DTOs
{
    public MappingProfile()
    {
        CreateMap<Product, ProductReadDTO>();
        CreateMap<ProductCreateDTO, Product>();
        CreateMap<ProductUpdateDTO, Product>();
    }
}
