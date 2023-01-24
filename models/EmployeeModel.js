import mongoose from "mongoose";

const Employee = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  accountnumber: {
    type: String,
    required: true,
  },
  emailaddress: {
    type: String,
    required: true,
  },
  identitynumber: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Employees", Employee);
