<?php
require_once 'db.php';
require_once 'auth.php';
setCORS();

requireAuth();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid ID']);
    exit;
}

try {
    // Get file info before deleting row to remove from disk
    $stmt = $pdo->prepare("SELECT media_url FROM testimonials WHERE id = ?");
    $stmt->execute([$id]);
    $row = $stmt->fetch();
    
    // Delete database entry
    $delStmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
    $delStmt->execute([$id]);
    
    // Remove actual file if exists
    if ($row && !empty($row['media_url'])) {
        $filePath = __DIR__ . '/' . $row['media_url'];
        if (file_exists($filePath)) {
            unlink($filePath);
        }
    }
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to delete record']);
}
?>
