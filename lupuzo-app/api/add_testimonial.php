<?php
require_once 'db.php';
require_once 'auth.php';
setCORS();

requireAuth();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$name = $_POST['name'] ?? '';
$role = $_POST['role'] ?? '';
$text = $_POST['text'] ?? '';

// Basic validation
if (empty($name) || empty($text)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name and text are required']);
    exit;
}

$mediaPath = null;
$mediaType = null;

// Secure File Upload handling
if (isset($_FILES['media']) && $_FILES['media']['error'] === UPLOAD_ERR_OK) {
    $fileTmpPath = $_FILES['media']['tmp_name'];
    $fileName = $_FILES['media']['name'];
    $fileSize = $_FILES['media']['size'];
    $fileType = $_FILES['media']['type'];
    
    // Check max file size (e.g. 50MB for videos)
    if ($fileSize > 50 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['error' => 'File exceeds maximum size (50MB)']);
        exit;
    }
    
    // Validate extensions and mime types strictly
    $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm'];
    
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $fileTmpPath);
    finfo_close($finfo);
    
    $extension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    if (!in_array($mime, $allowedMimeTypes) || !in_array($extension, $allowedExtensions)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid file type. Only images and videos are allowed.']);
        exit;
    }
    
    // Generate secure randomized filename
    $newFileName = bin2hex(random_bytes(16)) . '.' . $extension;
    $uploadDir = __DIR__ . '/uploads/';
    $destination = $uploadDir . $newFileName;
    
    if (move_uploaded_file($fileTmpPath, $destination)) {
        $mediaPath = 'uploads/' . $newFileName;
        $mediaType = strpos($mime, 'video') === 0 ? 'video' : 'image';
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to save uploaded file']);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("INSERT INTO testimonials (name, role, text, media_url, media_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $role, $text, $mediaPath, $mediaType]);
    
    echo json_encode(['success' => true, 'id' => $pdo->lastInsertId()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save database entry']);
}
?>
