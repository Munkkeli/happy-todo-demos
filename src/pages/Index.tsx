import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addTodo = () => {
    if (inputValue.trim() === "") {
      toast.error("Please enter a task");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
    toast.success("Task added successfully");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    toast.success("Task deleted");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/10 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            My Tasks
          </h1>
          <p className="text-muted-foreground text-lg">
            Stay organized and productive
          </p>
        </div>

        <div className="bg-card rounded-2xl shadow-lg p-6 space-y-6 animate-in fade-in slide-in-from-bottom duration-700 border border-border/50">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 h-12 text-base border-border/60 focus-visible:ring-primary"
            />
            <Button
              onClick={addTodo}
              size="lg"
              className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add
            </Button>
          </div>

          {todos.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
              <span>
                {activeTodos} {activeTodos === 1 ? "task" : "tasks"} remaining
              </span>
              <span>{todos.length} total</span>
            </div>
          )}

          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm mt-1">Add your first task to get started</p>
              </div>
            ) : (
              todos.map((todo, index) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all group animate-in fade-in slide-in-from-left duration-300 border border-transparent hover:border-border/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => toggleTodo(todo.id)}
                    className="h-5 w-5 rounded-md data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <span
                    className={`flex-1 text-base transition-all ${
                      todo.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
