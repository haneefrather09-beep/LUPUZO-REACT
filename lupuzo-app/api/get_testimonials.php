<?php
require_once 'db.php';
setCORS();

header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM testimonials ORDER BY created_at DESC");
    $results = $stmt->fetchAll();
    
    // Convert database structure to match React frontend structure exactly
    // The frontend uses "text", "name", "role", "media" (url), "mediaType", "id"
    $formatted = array_map(function($row) {
        $media = null;
        if ($row['media_url']) {
            if (strpos($row['media_url'], 'http') === 0) {
                $media = $row['media_url'];
            } else {
                $media = '/api/' . $row['media_url'];
            }
        }
        
        return [
            'id' => (int)$row['id'],
            'name' => htmlspecialchars($row['name']), // prevent XSS
            'role' => htmlspecialchars($row['role']),
            'text' => htmlspecialchars($row['text']),
            'media' => $media,
            'mediaType' => $row['media_type']
        ];
    }, $results);

    echo json_encode($formatted);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to fetch testimonials']);
}
?>
