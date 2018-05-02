using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Customer.Models;
using System.Linq;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Net.Http.Headers;

#region CustomerController
namespace Customer.Controllers
{
    [Route("api/[controller]")]
    public class CustomerController : Controller
    {
        private readonly CustomerContext _context;
        #endregion

        public CustomerController(CustomerContext context)
        {
            _context = context;

            if (_context.CustomerItems.Count() == 0)
            {
                _context.CustomerItems.Add(new CustomerItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        #region snippet_GetAll
        [HttpGet]
        public IEnumerable<CustomerItem> GetAll()
        {
            return _context.CustomerItems.ToList();
        }

        #region snippet_GetByID
        [HttpGet("{id}", Name = "GetCustomer")]
        public IActionResult GetById(long id)
        {
            var item = _context.CustomerItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
        #endregion
        #endregion
        #region snippet_Create
        [HttpPost]
        public IActionResult Create([FromBody] CustomerItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.CustomerItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("GetCustomer", new { id = item.Id }, item);
        }
        #endregion

        #region snippet_Update
        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] CustomerItem item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var Customer = _context.CustomerItems.FirstOrDefault(t => t.Id == id);
            if (Customer == null)
            {
                return NotFound();
            }

            Customer.IsComplete = item.IsComplete;
            Customer.Name = item.Name;

            _context.CustomerItems.Update(Customer);
            _context.SaveChanges();
            return new NoContentResult();
        }
        #endregion

        #region snippet_Delete
        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var Customer = _context.CustomerItems.FirstOrDefault(t => t.Id == id);
            if (Customer == null)
            {
                return NotFound();
            }

            _context.CustomerItems.Remove(Customer);
            _context.SaveChanges();
            return new NoContentResult();
        }
        #endregion
    }
}

