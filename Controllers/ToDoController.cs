using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using ToDoApi.Models;

namespace ToDoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private static List<ToDoItem> todoItems = new List<ToDoItem>();

        // GET: api/ToDo
        [HttpGet]
        public ActionResult<IEnumerable<ToDoItem>> GetAll()
        {
            return Ok(todoItems);
        }

        // GET: api/ToDo/5
        [HttpGet("{id}")]
        public ActionResult<ToDoItem> GetById(int id)
        {
            var todoItem = todoItems.FirstOrDefault(t => t.Id == id);
            if (todoItem == null)
            {
                return NotFound();
            }
            return Ok(todoItem);
        }

        // POST: api/ToDo
        [HttpPost]
        public ActionResult<ToDoItem> Create(ToDoItem todoItem)
        {
            if (todoItem == null || string.IsNullOrEmpty(todoItem.Name))
            {
                return BadRequest("Invalid to-do item.");
            }

            todoItem.Id = todoItems.Count + 1; // Simplified ID assignment
            todoItems.Add(todoItem);
            return CreatedAtAction(nameof(GetById), new { id = todoItem.Id }, todoItem);
        }

        // PUT: api/ToDo/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, ToDoItem todoItem)
        {
            var existingItem = todoItems.FirstOrDefault(t => t.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }
            existingItem.Name = todoItem.Name;
            existingItem.IsComplete = todoItem.IsComplete;
            return NoContent();
        }

        // DELETE: api/ToDo/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todoItem = todoItems.FirstOrDefault(t => t.Id == id);
            if (todoItem == null)
            {
                return NotFound();
            }
            todoItems.Remove(todoItem);
            return NoContent();
        }
    }
}
