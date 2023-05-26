import inquirer from "inquirer";

import { RoleService, UserService } from "../services/index.js";
import { USER_BUILTIN_ROLES } from "../constants/user.roles.js";
import RoleDTO from "../services/mongodb/dto/role.dto.js";
import INIT_QUESTIONS from "../constants/init.constants.js";

const askAdminData = async (questions, answers) => {
  let adminData = {};

  adminData = await inquirer.prompt(questions, answers);

  while (adminData.password !== adminData.confirmPassword) {
    console.error(
      "Password provided doesn't match with its confirmation. Please, try again."
    );

    delete adminData.password;
    delete adminData.confirmPassword;

    adminData = await inquirer.prompt(questions, adminData);
  }

  return adminData;
};

const init = async () => {
  let result = true;

  try {
    Object.values(USER_BUILTIN_ROLES).forEach(async (value) => {
      const currentRoleName = value.name;

      try {
        const existsRole = await RoleService.getByName(currentRoleName);

        if (!existsRole) {
          const newRoleDoc = RoleDTO.getCreateBuiltinRole(value);

          const newRole = await RoleService.create(newRoleDoc);

          if (!newRole) {
            return false;
          }
        }

        result &= true;
      } catch (error) {
        console.error(`Role "${currentRoleName}" could not be created.`);
        console.debug(error.message);

        result &= false;
      }
    });

    try {
      const adminRole = await RoleService.getByName(
        USER_BUILTIN_ROLES.ADMIN.name
      );

      const existsAdminUser = await UserService.getBy({ role: adminRole.id });

      if (!existsAdminUser) {
        const adminDoc = await askAdminData(INIT_QUESTIONS);

        adminDoc.role = adminRole.id;

        const adminUser = await UserService.create(adminDoc);

        if (!adminUser) {
          return false;
        }
      }

      result &= true;
    } catch (error) {
      console.debug("Error while initializing admin user.");
      console.error(error.message);

      result &= false;
    }

    return result;
  } catch (error) {
    console.error("An error occurred while initializing the database:");
    console.error(error.message);

    return false;
  }
};

export default init;
