#if NEVER
#region snippet_Customer1
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Customer.Models;
using System.Linq;

namespace Customer.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly CustomerContext _context;

        public CustomerController(CustomerContext context)
        {
            _context = context;

            if (_context.CustomerItems.Count() == 0)
            {
                _context.CustomerItems.Add(new CustomerItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }       
    }
}
#endregion
#endif