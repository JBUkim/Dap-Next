import fetch from "isomorphic-unfetch";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";
import Layout from "../../components/Layout";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
      alert("Deleted");
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);

  const close = () => setConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/notes/${noteId}`, {
        method: "Delete",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  return (
    <Layout>
      <div className="container mx-auto py-5">
        {/* {isDeleting ? (
          <Loader active />
        ) : (
          <>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button onClick={open} class="text-center inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-500">
              Delete
            </button>
          </>
        )} */}

        <details class="group border-l-4 border-green-500 bg-gray-50 p-6 [&_summary::-webkit-details-marker]:hidden" open>
          <summary class="flex items-center justify-between cursor-pointer">
            <h2 class="text-lg font-medium text-gray-900">Title: {note.title}</h2>

            <span class="ml-1.5 flex-shrink-0 rounded-full bg-white p-1.5 text-gray-900 sm:p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="flex-shrink-0 w-5 h-5 transition duration-300 group-open:-rotate-45"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <p class="mt-4 leading-relaxed text-gray-700">Description: {note.description}</p>
          <button onClick={open} class="text-center inline-block rounded bg-red-400 px-4 py-2 text-xs font-medium text-white hover:bg-red-500">
            Delete
          </button>
        </details>

        <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} header="Delete" />
      </div>
    </Layout>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { note: data };
};

export default Note;
