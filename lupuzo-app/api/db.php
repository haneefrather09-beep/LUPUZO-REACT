<?php
// api/db.php
// Extremely secure SQLite database connection
$db_file = __DIR__ . '/.data.sqlite';

try {
    $pdo = new PDO("sqlite:" . $db_file);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // Create table if not exists with secure schema
    $pdo->exec("CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT,
        text TEXT NOT NULL,
        media_url TEXT,
        media_type TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    
    // Seed raw data if empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM testimonials");
    if ($stmt->fetchColumn() == 0) {
        $dummyData = [
            ['Omar Al-Faruq', 'Founder, Riyadh Innovates', 'Lupuzo completely redefined our branding and mobile app. The UI is sleek, the performance is flawless, and the AI integration pushed our user retention up by 400%.', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800', 'image'],
            ['Fatima Zahra', 'Marketing Director, Luxe Arabia', 'The 3D animations and the overall website aesthetic completely wowed our clients. What impressed me most was their dedication to high-level security.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', 'image'],
            ['James Mitchell', 'CEO, FinTech Global', 'We hired Lupuzo to develop a smart AI chatbot for our customer service. It now handles 80% of our daily queries automatically. It is a masterpiece of engineering.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', 'image'],
            ['Aisha Noor', 'Creative Lead, Echo Studios', 'Working with Lupuzo was the best decision for our digital transition. Their premium design approach gave us an enterprise-grade platform on a startup budget.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800', 'image']
        ];
        
        $insert = $pdo->prepare("INSERT INTO testimonials (name, role, text, media_url, media_type) VALUES (?, ?, ?, ?, ?)");
        foreach ($dummyData as $row) {
            $insert->execute($row);
        }
    }
} catch (PDOException $e) {
    header('HTTP/1.1 500 Internal Server Error');
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Utility function for CORS (in case frontend is on different port during dev)
function setCORS() {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        exit(0);
    }
}
?>
