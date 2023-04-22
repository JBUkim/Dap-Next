import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      name: "Admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "John",
      email: "john0@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },

    {
      name: "Kim",
      email: "kim@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  notes: [
    {
      title: "Test 1",
      description: "Test description 1",
    },
    {
      title: "Test 2",
      description: "Test description 2",
    },
  ],
};
export default data;
