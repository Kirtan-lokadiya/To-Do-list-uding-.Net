namespace ToDoApi.Models
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty; // Make sure this property exists
        public bool IsComplete { get; set; }
    }
}
