import Employee from "../models/EmployeeModel.js";

export const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeByID = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.json(employee);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  try {
    const insertemployee = await employee.save();
    res.status(201).json(insertemployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const updatedemployee = await Employee.updateOne({ _id: req.params.id }, { $set: req.body });
    res.status(200).json(updatedemployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const deletedemployee = await Employee.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedemployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
