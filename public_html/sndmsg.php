<?php

$project_name = 'oting';
$admin_email  = 'mr.golbya@gmail.com';
$form_subject = 'Форма с подвала сайта SiteName';

$c = true;
$message = '';
foreach ($_POST as $key => $value) {
    if (is_array($value)) $value = implode(", ", $value);

    if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
        $message .= (($c = !$c) ? "<tr>" : "<tr style=\"background-color: #f8f8f8;\">") . "
            <td style=\"padding: 10px; border: #e2dddd 1px solid;\"><b>$key</b></td>
            <td style=\"padding: 10px; border: #e2dddd 1px solid;\">$value</td>
        </tr>";
    }
}

$message = "<table style=\"width: 100%;\">$message</table>";

function adopt($text)
{
    return "=?UTF-8?B?" . Base64_encode($text) . "?=";
}

$headers = "MIME-Version: 1.0" . PHP_EOL .
    "Content-Type: text/html; charset=utf-8" . PHP_EOL .
    "From: " . adopt($project_name) . " <" . $admin_email . ">" . PHP_EOL .
    "Reply-To: " . $admin_email . "" . PHP_EOL;

if (mail($admin_email, adopt($form_subject), $message, $headers)) {
    http_response_code(200);
    echo "Данные отправлены.";
    echo $message;
} else {
    http_response_code(400);
    echo "Ошибка. Данные не отправлены.";
};