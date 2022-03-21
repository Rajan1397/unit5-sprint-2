import React from "react";

const Emp = () => {
  const [name, setName] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [role, setRole] = React.useState("");
  const [salary, setSalary] = React.useState("");

  const [employees, setEmployees] = React.useState([]);

  // ascending
  function asc() {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((res) => {
        let updated = res.sort((a, b) => +a.salary - +b.salary);

        setEmployees(updated);
      })
      .catch((err) => console.log(err));
  }

  // descending
  const des = () => {
    fetch(`http://localhost:3001/employee`)
      .then((res) => res.json())
      .then((res) => {
        let updated = res.sort((a, b) => +b.salary - +a.salary);
        // console.log(list.salary)
        setEmployees(updated);
      })
      .catch((err) => console.log(err));
  };

  const showMarketing = () => {
    let updated = employees.filter((item) => item.department === "Marketing");
    setEmployees(updated);
  };
  const showHR = () => {
    let updated = employees.filter((item) => item.department === "HR");
    setEmployees(updated);
  };
  const ShowIT = () => {
    let updated = employees.filter((item) => item.department === "IT");
    setEmployees(updated);
  };
  const ShowFinance = () => {
    let updated = employees.filter((item) => item.department === "Finance");
    setEmployees(updated);
  };

  React.useEffect(() => {
    getemployees(); // invoke this functon only for first time of mounting
  }, []);

  const getemployees = () => {
    fetch(`  http://localhost:3001/employees`)
      .then((res) => res.json())
      .then((res) => setEmployees(res));
  };

  const handleAdd = () => {
    console.log(name);
    const payload = {
      name: name,
      gender: gender,
      department: department,
      role: role,
      salary: salary,
      status: false,
    };

    const payloadjson = JSON.stringify(payload);

    fetch(`  http://localhost:3001/employees`, {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      getemployees();
    });
  };

  return (
    <div>
      <h1>Employee Dashboard</h1>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Department"
        onChange={(e) => setDepartment(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Role"
        onChange={(e) => setRole(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Salary"
        onChange={(e) => setSalary(e.target.value)}
      />
      <br />
      <button onClick={handleAdd}>ADD EMPLOYEE</button>
      <hr />

      <button>Show All Department</button>
      <button onClick={showMarketing}>Show Marketing</button>
      <button onClick={showHR}>Show HR</button>
      <button onClick={ShowIT}>Show IT</button>
      <button onClick={ShowFinance}>Show Finance</button>

      <br />
      <br />
      <button onClick={() => asc()}>Sort By Salary Ascending</button>
      <button onClick={() => des()}>Sort by Salary Descending</button>

      {employees.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.name}</div>
            <div>{item.gender}</div>
            <div>{item.department}</div>
            <div>{item.role}</div>
            <div>{item.salary}</div>
            <br />
            <br />
          </div>
        );
      })}
    </div>
  );
};

export { Emp };
