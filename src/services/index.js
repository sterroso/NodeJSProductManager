import UserDAO from "./mongodb/dao/mongodb.user.dao.js";
import RoleDAO from "./mongodb/dao/mongodb.role.dao.js";
import ProductDAO from "./mongodb/dao/mongodb.product.dao.js";
import CartDAO from "./mongodb/dao/mongodb.cart.dao.js";
import CategoryDAO from "./mongodb/dao/mongodb.category.dao.js";
import OrderDAO from "./mongodb/dao/mongodb.order.dao.js";

import UserRepository from "./repository/user.repository.js";
import RoleRepository from "./repository/role.repository.js";
import ProductRepository from "./repository/product.repository.js";
import CartRepository from "./repository/cart.repository.js";
import CategoryRepository from "./repository/category.repository.js";
import OrderRepository from "./repository/order.repository.js";

export const UserService = new UserRepository(UserDAO);
export const RoleService = new RoleRepository(RoleDAO);
export const ProductService = new ProductRepository(ProductDAO);
export const CartService = new CartRepository(CartDAO);
export const CategoryService = new CategoryRepository(CategoryDAO);
export const OrderService = new OrderRepository(OrderDAO);
