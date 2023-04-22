import React from "react";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { BiPlus } from "react-icons/bi";
import Layout from "../../components/Layout";

const EditPost = ({ note }) => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
        alert("Update Success");
      } else {
        setIsSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/notes/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};

    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <Layout title="Update Post">
      <div className="container mx-auto">
        <h1>Update Post</h1>
        <div>
          {isSubmitting ? (
            <Loader active inline="centered" />
          ) : (
            <Form onSubmit={handleSubmit}>
              <input
                fluid
                error={errors.title ? { content: "Please enter a title", pointing: "below" } : null}
                label="Title"
                placeholder="Title"
                name="title"
                onChange={handleChange}
                value={form.title}
                class="border w-full px-5 py-3 focus:outline-none rounded-md"
              />
              <textarea
                fluid
                label="Descriprtion"
                placeholder="Description"
                name="description"
                error={errors.description ? { content: "Please enter a description", pointing: "below" } : null}
                onChange={handleChange}
                value={form.description}
                class="border w-full px-5 py-3 focus:outline-none rounded-md"
              />
              <button
                type="submit"
                class="flex justify-center text-md w-2/6 bg-yellow-500 text-white px-5 py-3 border rounded-md hover:bg-gray-50 hover:border-yellow-500 hover:text-yellow-500"
              >
                Update Post
                <span class="px-1">
                  <BiPlus size={24} />
                </span>
              </button>
            </Form>
          )}
        </div>
      </div>
    </Layout>
  );
};

EditPost.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/notes/${id}`);
  const { data } = await res.json();

  return { notes: data };
};

export default EditPost;
