<?php
// Extremely simple secure authentication check
$ADMIN_SECRET_KEY = "Lupuzo_Secured_2026_High_Level"; // In production, move this to .env

function requireAuth() {
    global $ADMIN_SECRET_KEY;
    $headers = apache_request_headers();
    
    // Check various casing since apache headers can differ
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    
    if (trim($authHeader) !== 'Bearer ' . $ADMIN_SECRET_KEY) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized Access. Invalid Secret Key.']);
        exit;
    }
}
// Note: If you deploy on Nginx/FPM, apache_request_headers() might not work.
// fallback:
if (!function_exists('apache_request_headers')) {
    function apache_request_headers() {
        $arh = array();
        $rx_http = '/\AHTTP_/';
        foreach($_SERVER as $key => $val) {
            if( preg_match($rx_http, $key) ) {
                $arh_key = preg_replace($rx_http, '', $key);
                $rx_matches = array();
                $rx_matches = explode('_', $arh_key);
                if( count($rx_matches) > 0 and strlen($arh_key) > 2 ) {
                    foreach($rx_matches as $ak_key => $ak_val) $rx_matches[$ak_key] = ucfirst(strtolower($ak_val));
                    $arh_key = implode('-', $rx_matches);
                }
                $arh[$arh_key] = $val;
            }
        }
        return( $arh );
    }
}
?>
