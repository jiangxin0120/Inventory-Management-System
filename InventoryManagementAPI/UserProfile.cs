using AutoMapper;
using InventoryManagementAPI.DTOs;
using InventoryManagementAPI.Models;

namespace InventoryManagementAPI
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            // Map User -> UserReadDTO
            CreateMap<User, UserReadDTO>();

            // Map UserCreateDTO -> User
            CreateMap<UserCreateDTO, User>();

            // Map UserUpdateDTO -> User
            CreateMap<UserUpdateDTO, User>();
        }
    }

}
