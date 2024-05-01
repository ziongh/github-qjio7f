import { createFileRoute, createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/dashboard/todo')({
  component: TodoComponent,
});

function TodoComponent() {
  return (
    <div className="p-2">
      <h3>TODO</h3>
    </div>
  );
}
