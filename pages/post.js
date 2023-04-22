import Link from "next/link";
import fetch from "isomorphic-unfetch";
import Layout from "../components/Layout";

const Index = ({ notes }) => {
  return (
    <Layout>
      <div class="container mx-auto py-5">
        <div class="overflow-x-auto rounded-lg border border-gray-200">
          <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead class="ltr:text-left rtl:text-right">
              <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Title</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Link</th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  <Link
                    href="/new"
                    class="text-center inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                  >
                    Create Post
                  </Link>
                </th>
              </tr>
            </thead>
            {notes.map((note) => {
              return (
                <tbody class="divide-y divide-gray-200" key={note._id}>
                  <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">{note._id}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{note.title}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      <Link
                        href={`/${note._id}`}
                        class="text-center inline-block rounded bg-green-500 px-4 py-2 text-xs font-medium text-white hover:bg-green-600"
                      >
                        {note.title}
                      </Link>
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                      <Link
                        href={`/${note._id}/edit`}
                        class="text-center inline-block rounded bg-yellow-400 px-4 py-2 text-xs font-medium text-white hover:bg-yellow-500"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </Layout>
  );
};

Index.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/notes");
  const { data } = await res.json();

  return { notes: data };
};

export default Index;
