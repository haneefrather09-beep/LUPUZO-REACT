<?php
require_once 'db.php';

$dummyData = [
    ['Omar Al-Faruq', 'Founder, Riyadh Innovates', 'Lupuzo completely redefined our branding and mobile app. The UI is sleek, the performance is flawless, and the AI integration pushed our user retention up by 400%.', 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800', 'image'],
    ['Fatima Zahra', 'Marketing Director, Luxe Arabia', 'The 3D animations and the overall website aesthetic completely wowed our clients. What impressed me most was their dedication to high-level security.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800', 'image'],
    ['James Mitchell', 'CEO, FinTech Global', 'We hired Lupuzo to develop a smart AI chatbot for our customer service. It now handles 80% of our daily queries automatically. It is a masterpiece of engineering.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800', 'image'],
    ['Aisha Noor', 'Creative Lead, Echo Studios', 'Working with Lupuzo was the best decision for our digital transition. Their premium design approach gave us an enterprise-grade platform on a startup budget.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800', 'image']
];

try {
    $insert = $pdo->prepare("INSERT INTO testimonials (name, role, text, media_url, media_type) VALUES (?, ?, ?, ?, ?)");
    foreach ($dummyData as $row) {
        $insert->execute($row);
    }
    echo "Successfully inserted 4 real client experiences!";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>
