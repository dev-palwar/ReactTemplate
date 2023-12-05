import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Checkbox,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface SubDepartment {
  name: string;
  isSelected?: boolean;
}

interface Department {
  department: string;
  sub_departments: SubDepartment[];
  isSelected?: boolean;
  isOpen?: boolean;
}

const Second: React.FC = () => {
  const initialData: Department[] = [
    {
      department: "customer_service",
      sub_departments: [{ name: "support" }, { name: "customer_success" }],
    },
    {
      department: "design",
      sub_departments: [
        { name: "graphic_design" },
        { name: "product_design" },
        { name: "web_design" },
      ],
    },
  ];

  const [departments, setDepartments] = useState<Department[]>(initialData);

  const handleToggle = (index: number) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];
      updatedDepartments[index] = {
        ...updatedDepartments[index],
        isOpen: !updatedDepartments[index].isOpen,
      };
      return updatedDepartments;
    });
  };

  const handleSelect = (
    departmentIndex: number,
    subDepartmentIndex?: number
  ) => {
    setDepartments((prevDepartments) => {
      const updatedDepartments = [...prevDepartments];

      if (subDepartmentIndex !== undefined) {
        updatedDepartments[departmentIndex].sub_departments[
          subDepartmentIndex
        ] = {
          ...updatedDepartments[departmentIndex].sub_departments[
            subDepartmentIndex
          ],
          isSelected:
            !updatedDepartments[departmentIndex].sub_departments[
              subDepartmentIndex
            ]?.isSelected,
        };
      } else {
        updatedDepartments[departmentIndex] = {
          ...updatedDepartments[departmentIndex],
          isSelected: !updatedDepartments[departmentIndex]?.isSelected,
        };

        // Selects all sub-departments if the department is selected
        updatedDepartments[departmentIndex].sub_departments =
          updatedDepartments[departmentIndex].sub_departments.map((subDep) => ({
            ...subDep,
            isSelected: updatedDepartments[departmentIndex]?.isSelected,
          }));
      }

      // Updates parent department selection based on sub-departments
      const allSubDepartmentsSelected = updatedDepartments[
        departmentIndex
      ].sub_departments.every((subDep) => subDep.isSelected);
      updatedDepartments[departmentIndex] = {
        ...updatedDepartments[departmentIndex],
        isSelected: allSubDepartmentsSelected,
      };

      return updatedDepartments;
    });
  };

  return (
    <List>
      <h2>Second component</h2>
      {departments.map((department, index) => (
        <React.Fragment key={index}>
          <ListItem onClick={() => handleToggle(index)}>
            {department.isOpen ? <ExpandLess /> : <ExpandMore />}
            <Checkbox
              checked={department.isSelected || false}
              onChange={() => handleSelect(index)}
            />
            <Typography variant="h5">{department.department}</Typography>
          </ListItem>
          <Collapse in={department.isOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.sub_departments.map((subDepartment, subIndex) => (
                <ListItem
                  key={subIndex}
                  button
                  onClick={() => handleSelect(index, subIndex)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={subDepartment.isSelected || false}
                      onChange={() => handleSelect(index, subIndex)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Second;
