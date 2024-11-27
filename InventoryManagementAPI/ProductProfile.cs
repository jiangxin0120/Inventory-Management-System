using AutoMapper;
using InventoryManagementAPI.DTOs;
using InventoryManagementAPI.Models;

namespace InventoryManagementAPI
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            // Map Product -> ProductReadDTO
            CreateMap<Product, ProductReadDTO>();

            // Map ProductCreateDTO -> Product
            CreateMap<ProductCreateDTO, Product>();

            // Map ProductUpdateDTO -> Product
            CreateMap<ProductUpdateDTO, Product>();
        }
    }
}
