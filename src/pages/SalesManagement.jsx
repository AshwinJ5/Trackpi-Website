import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
// import { getAllSalesEmployee, deleteSalesEmployee } from "../Api Services/salesManagemntApi";

function SalesManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getAllSalesEmployee();  // Add headers if needed
        setEmployees(response.data);
        toast.success("Employees loaded successfully!");
      } catch (error) {
        setError("Failed to load employees");
        toast.error("Failed to load employees!");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Delete handler for an employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      // Optimistic update
      const updatedEmployees = employees.filter((employee) => employee._id !== id);
      setEmployees(updatedEmployees);

      try {
        await deleteSalesEmployee(id); // Pass the appropriate header if required
        toast.success("Employee deleted successfully!");
      } catch (error) {
        // Handle failure without reverting employees state
        toast.error("Failed to delete employee!");
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading employees...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h3 className="mb-4">Sales Management</h3>
      <Table bordered hover responsive>
        <thead style={{ fontWeight: "bold" }}>
          <tr>
            <th>Sl No</th>
            <th>Name</th>
            <th>Employee ID</th>
            <th>Email ID</th>
            <th>Phone</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.name}</td>
              <td>{employee.employeeID}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => alert(`Viewing details for ${employee.name}`)}
                >
                  View Details
                </button>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleDelete(employee._id)}
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#df0727" }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SalesManagement;