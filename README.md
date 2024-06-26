# book-shop-backend-
I have designed a comprehensive backend system for an online bookstore using Node.js, Express, MySQL, Passport.js, Express Sessions, Winston, Bcrypt, Salt, Passport-Local, and Sequelize. The system implements robust Role-Based Access Control (RBAC), ensuring each user has specific roles and permissions.

Key features include:

* User Registration and Login APIs: Secure and efficient user authentication with Passport.js and Bcrypt for password hashing.
* Upload API: Allows users to upload book titles, descriptions, and author information, with thorough validation checks.
* User Management: Users can be deleted, and specific upload fields can be modified or removed as needed.
* Audit and Monitoring: Utilizing Winston for comprehensive logging and monitoring of the entire RBAC system.
This RBAC system ensures secure access and efficient management of bookstore operations, providing a scalable and maintainable solution.

# Starting 
* npm i 
* nodemon server.js