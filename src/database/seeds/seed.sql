-- Seed users table
INSERT INTO "users" ("user_name", "password", "first_name", "family_name", "address") 
VALUES 
('john_doe', 'password123', 'John', 'Doe', '123 Main St'),
('jane_smith', 'password456', 'Jane', 'Smith', '456 Elm St'),
('bob_jones', 'password789', 'Bob', 'Jones', '789 Maple St'),
('alice_johnson', 'password101', 'Alice', 'Johnson', '101 Oak St'),
('charlie_brown', 'password202', 'Charlie', 'Brown', '202 Pine St');

-- Seed messages table
INSERT INTO "messages" ("user_id", "content") 
VALUES 
((SELECT id FROM users WHERE user_name = 'john_doe'), 'Hello from John!'),
((SELECT id FROM users WHERE user_name = 'jane_smith'), 'Jane here, how are you?'),
((SELECT id FROM users WHERE user_name = 'bob_jones'), 'Bob checking in!'),
((SELECT id FROM users WHERE user_name = 'alice_johnson'), 'Greetings from Alice!'),
((SELECT id FROM users WHERE user_name = 'charlie_brown'), 'Charlie says hi!');
