-- Insert example data into the users table
INSERT INTO users (user_name, password, first_name, family_name, address) VALUES
('john_doe', 'hashedpassword1', 'John', 'Doe', '123 Elm St, Springfield'),
('jane_smith', 'hashedpassword2', 'Jane', 'Smith', '456 Oak St, Shelbyville');

-- Fetch UUIDs of the users we just inserted
DO $$ 
DECLARE
    john_doe_id UUID;
    jane_smith_id UUID;
BEGIN
    SELECT id INTO john_doe_id FROM users WHERE user_name = 'john_doe';
    SELECT id INTO jane_smith_id FROM users WHERE user_name = 'jane_smith';

    -- Insert example data into the messages table using the UUIDs
    INSERT INTO messages (user_id, content) VALUES
    (john_doe_id, 'Hello from John!'),
    (jane_smith_id, 'Hello from Jane!');
END $$;