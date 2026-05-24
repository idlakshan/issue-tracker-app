import { useState } from "react";
import { X } from "lucide-react";
import { z } from "zod";
import Input from "./ui/text-input";
import { Dropdown } from "../components/ui/dropdown";
import Button from "./ui/button";
import { useGetUsersQuery } from "../store/api/authApi";
import {
  useCreateIssueMutation,
  useUpdateIssueMutation,
} from "../store/api/issueApi";
import { toast } from "react-toastify";

const statusOptions = [
  { value: "Open", label: "Open" },
  { value: "In Progress", label: "In Progress" },
  { value: "Resolved", label: "Resolved" },
  { value: "Closed", label: "Closed" },
];

const priorityOptions = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
];

interface User {
  _id: string;
  firstName: string;
  lastName: string;
}

interface Issue {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignees: User[];
}

interface IssueModelProps {
  open: boolean;
  onClose: () => void;
  issue?: Issue;
}

const IssueModel = ({ open, onClose, issue }: IssueModelProps) => {
  const { data: users } = useGetUsersQuery();
  const [createIssue] = useCreateIssueMutation();
  const [updateIssue] = useUpdateIssueMutation();

  const [title, setTitle] = useState(issue?.title || "");
  const [description, setDescription] = useState(issue?.description || "");
  const [status, setStatus] = useState(issue?.status || "Open");
  const [priority, setPriority] = useState(issue?.priority || "Medium");
  const [assignees, setAssignees] = useState<string[]>(
    issue?.assignees.map((user) => user._id) || [],
  );
  const [error, setError] = useState("");

  

  const issueSchema = z.object({
    title: z.string().min(1, "* Title is required"),
  });

  const handleSubmit = async () => {
    const result = issueSchema.safeParse({ title });

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    try {
      const payload = { title, description, status, priority, assignees };

      if (issue) {
        // Edit
        await updateIssue({
          id: issue._id,
          title,
          description,
          priority,
          status,
          assignees,
        }).unwrap();
        toast.success("Issue updated!");
      } else {
        // Create
        await createIssue(payload).unwrap();
        toast.success("Issue created successfully!");
      }
      onClose();
    } catch (err: unknown) {
      console.error(err);
      toast.error(
        (err as { data?: { message?: string } })?.data?.message ||
          "Something went wrong",
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="relative bg-(--color-surface) w-full max-w-xl rounded-2xl shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center border-b border-secondary-text/50 pb-4">
          <h2 className="font-semibold text-lg">
            {issue ? "Edit Issue" : "New Issue"}
          </h2>
          <X onClick={onClose} className="text-secondary-text cursor-pointer" />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-1">
            Issue Title *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-secondary-text/50 rounded-md px-3 py-2 text-sm outline-none"
            placeholder="Describe the issue"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Status
            </label>
            <Dropdown
              options={statusOptions}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="block text-sm font-medium text-secondary-text mb-1">
              Priority
            </label>
            <Dropdown
              options={priorityOptions}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-text mb-1">
            Assignees
          </label>

          <div className="max-h-32 overflow-y-auto border border-secondary-text/50 rounded-md p-2 space-y-1">
            {users?.map((user: User) => (
              <label
                key={user._id}
                className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded cursor-pointer text-sm"
              >
                <input
                  type="checkbox"
                  checked={assignees.includes(user._id)}
                  onChange={(e) => {
                    setAssignees((prev) =>
                      e.target.checked
                        ? [...prev, user._id]
                        : prev.filter((id) => id !== user._id),
                    );
                  }}
                  className="rounded border-gray-300 text-blue-600"
                />
                {user.firstName} {user.lastName}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-secondary-text/50 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save issue</Button>
        </div>
      </div>
    </div>
  );
};

export default IssueModel;
