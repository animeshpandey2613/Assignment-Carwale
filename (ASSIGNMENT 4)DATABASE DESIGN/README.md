
# E-commerce Database Design and Implementation

## Database Design

### Database Entities

#### **user**
```markdown
- **Primary Key**: `user_id`
- No foreign keys.
```

#### **client**
```markdown
- **Primary Key**: `client_id`
- **Foreign Key**: `user_id` (References `user(user_id)`)
```

#### **seller**
```markdown
- **Primary Key**: `seller_id`
- **Foreign Key**: `user_id` (References `user(user_id)`)
```

#### **product_type**
```markdown
- **Primary Key**: `ptype_id`
- No foreign keys.
```

#### **product**
```markdown
- **Primary Key**: `pid`
- **Foreign Keys**:
  - `seller_id` (References `seller(seller_id)`)
  - `ptype_id` (References `product_type(ptype_id)`)
```

#### **orders**
```markdown
- **Primary Key**: `order_id`
- **Foreign Key**: `client_id` (References `client(client_id)`)
```

#### **order_items**
```markdown
- **Composite Primary Key**: (`pid`, `order_id`)
- **Foreign Keys**:
  - `pid` (References `product(pid)`)
  - `order_id` (References `orders(order_id)`)
```

#### **payment**
```markdown
- **Primary Key**: `payment_id`
- **Foreign Keys**:
  - `order_id` (References `orders(order_id)`)
  - `client_id` (References `client(client_id)`)
```

---

### SQL Statements

#### Database and Table Creation:

```sql
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

CREATE TABLE user (
 user_type_id INT,
 user_name VARCHAR(100),
 user_password VARCHAR(16),
 user_id INT PRIMARY KEY,
 account_status VARCHAR(10),
 address VARCHAR(100)
);

CREATE TABLE client (
 client_id INT PRIMARY KEY,
 user_id INT,
 gender VARCHAR(6),
 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE seller (
 seller_id INT PRIMARY KEY,
 user_id INT,
 production_name VARCHAR(100),
 license_no INT,
 rating INT,
 FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE product_type (
 ptype_id INT PRIMARY KEY,
 ptype_name VARCHAR(100),
 ptype_desc VARCHAR(100)
);

CREATE TABLE product (
 pid INT PRIMARY KEY,
 seller_id INT,
 ptype_id INT,
 pname VARCHAR(100),
 pdesc VARCHAR(100),
 price INT,
 rating INT,
 FOREIGN KEY (seller_id) REFERENCES seller(seller_id) ON DELETE CASCADE,
 FOREIGN KEY (ptype_id) REFERENCES product_type(ptype_id) ON DELETE CASCADE
);

CREATE TABLE orders (
 order_id INT PRIMARY KEY,
 client_id INT,
 delivery_status VARCHAR(100),
 expected_delivery_date DATE,
 order_date_and_time DATE,
 FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);

CREATE TABLE order_items (
 pid INT,
 order_id INT,
 number_of_items INT,
 PRIMARY KEY (pid, order_id),
 FOREIGN KEY (pid) REFERENCES product(pid),
 FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE payment (
 payment_id INT PRIMARY KEY,
 order_id INT,
 client_id INT,
 payment_date DATE,
 amount DECIMAL(10, 2),
 payment_method VARCHAR(50),
 payment_status VARCHAR(50),
 FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
 FOREIGN KEY (client_id) REFERENCES client(client_id) ON DELETE CASCADE
);
```

#### Data Population:

```sql
-- Insert dummy values into the `user` table
INSERT INTO user (user_type_id, user_name, user_password, user_id, account_status, address)
VALUES
(1, 'JohnDoe', 'password123', 101, 'Active', '123 Elm Street'),
(2, 'JaneSmith', 'securepass', 102, 'Inactive', '456 Oak Avenue'),
(1, 'AliceBrown', 'qwerty', 103, 'Active', '789 Pine Road');

-- Insert dummy values into the `client` table
INSERT INTO client (client_id, user_id, gender)
VALUES
(201, 101, 'Male'),
(202, 102, 'Female');

-- Insert dummy values into the `seller` table
INSERT INTO seller (seller_id, user_id, production_name, license_no, rating)
VALUES
(301, 103, 'Alice Organics', 56789, 4),
(302, 102, 'Smith Supplies', 12345, 5);

-- Insert dummy values into the `product_type` table
INSERT INTO product_type (ptype_id, ptype_name, ptype_desc)
VALUES
(401, 'Electronics', 'Devices and gadgets'),
(402, 'Clothing', 'Apparel and accessories'),
(403, 'Food', 'Edible items');

-- Insert dummy values into the `product` table
INSERT INTO product (pid, seller_id, ptype_id, pname, pdesc, price, rating)
VALUES
(501, 301, 401, 'Smartphone', 'Latest model', 699, 5),
(502, 301, 403, 'Organic Juice', 'Freshly made', 10, 4),
(503, 302, 402, 'T-Shirt', 'Cotton, size M', 20, 4);

-- Insert dummy values into the `orders` table
INSERT INTO orders (order_id, client_id, delivery_status, expected_delivery_date, order_date_and_time)
VALUES
(601, 201, 'Pending', '2025-01-25', '2025-01-20'),
(602, 202, 'Delivered', '2025-01-19', '2025-01-15');

-- Insert dummy values into the `order_items` table
INSERT INTO order_items (pid, order_id, number_of_items)
VALUES
(501, 601, 1),
(502, 601, 2),
(503, 602, 1);

-- Insert dummy values into the `payment` table
INSERT INTO payment (payment_id, order_id, client_id, payment_date, amount, payment_method, payment_status)
VALUES
(701, 601, 201, '2025-01-20', 719.00, 'Credit Card', 'Success'),
(702, 602, 202, '2025-01-15', 20.00, 'PayPal', 'Success');
```

### Querying and CRUD Operations

#### Examples of CRUD Queries:

1. **Inserting a New Product:**
   ```sql
   INSERT INTO product (pid, seller_id, ptype_id, pname, pdesc, price, rating)
   VALUES (504, 301, 401, 'Laptop', 'Gaming laptop', 1200, 5);
   ```

2. **Retrieving Products by Price Range:**
   ```sql
   SELECT * FROM product
   WHERE price BETWEEN 100 AND 700;
   ```

3. **Updating Customer Details:**
   ```sql
   UPDATE user
   SET address = '789 Maple Street'
   WHERE user_id = 101;
   ```

4. **Deleting a Product:**
   ```sql
   DELETE FROM product
   WHERE pid = 502;
   ```

### Advanced Queries and Joins

1. **Retrieving Orders with Customer and Product Information:**
   ```sql
   SELECT o.order_id, c.client_id, u.user_name, p.pname, p.price
   FROM orders o
   JOIN client c ON o.client_id = c.client_id
   JOIN user u ON c.user_id = u.user_id
   JOIN order_items oi ON o.order_id = oi.order_id
   JOIN product p ON oi.pid = p.pid;
   ```

2. **Calculating Total Revenue for a Specific Period:**
   ```sql
   SELECT SUM(amount) AS total_revenue
   FROM payment
   WHERE payment_date BETWEEN '2025-01-01' AND '2025-01-31';
   ```

3. **Finding Customers with Multiple Purchases:**
   ```sql
   SELECT c.client_id, u.user_name, COUNT(o.order_id) AS total_orders
   FROM client c
   JOIN user u ON c.user_id = u.user_id
   JOIN orders o ON c.client_id = o.client_id
   GROUP BY c.client_id, u.user_name
   HAVING COUNT(o.order_id) > 1;
   ```

