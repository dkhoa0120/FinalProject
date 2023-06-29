import { Form } from "react-bootstrap";

export default function RoleSelector({ selectedRoles, onChangeRoles }) {
  const roles = ["User", "Uploader", "Manager", "Admin"];
  const handleSelectRole = (e, role) => {
    let updatedRoles;
    if (e.target.checked) {
      updatedRoles = [...selectedRoles, role];
    } else {
      updatedRoles = selectedRoles.filter((r) => r !== role);
    }
    onChangeRoles(updatedRoles);
  };

  return (
    <div>
      {roles.map((role) => (
        <Form.Check
          key={role}
          id={`chk-${role}`}
          inline
          type="checkbox"
          label={role}
          checked={selectedRoles.includes(role)}
          onChange={(e) => handleSelectRole(e, role)}
        />
      ))}
    </div>
  );
}
