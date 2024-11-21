using Microsoft.AspNetCore.Mvc;

namespace InventoryManagementAPI.Controllers
{
    public class ProductsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
