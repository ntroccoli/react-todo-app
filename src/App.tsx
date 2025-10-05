import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import { useTodos } from "./hooks/useTodos";

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearAll, stats } =
    useTodos();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex flex-col mb-8">
        <span className="text-2xl font-semibold">Simple To-Do List App</span>
      </div>

      <div className="flex gap-2 justify-end mb-4">
        <Badge variant="outline">{stats.active} active</Badge>

        <Badge variant="default">{stats.completed} completed</Badge>
      </div>

      <Card>
        <CardContent>
          <AddTodoForm onAdd={addTodo} />
          <Separator className="my-6" />
          {todos.length === 0 ? (
            <div className="p-6 text-center text-sm text-muted-foreground">
              No to-dos yet. Add your first to-do above.
            </div>
          ) : (
            <>
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
              <div className="mt-4 flex justify-end">
                <Button
                  className="hover:cursor-pointer"
                  variant="outline"
                  onClick={clearAll}
                  aria-label="Clear all"
                >
                  Clear all
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
