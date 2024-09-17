<?php
  header('Content-type: text/html; charset=utf-8');
  session_start();

  error_reporting(E_ERROR | E_PARSE);

  //$_POST = json_decode(file_get_contents('php://input'), true);
  // var_dump($_POST);
  /*if($_POST !== NULL){
    if(is_array($_POST)){
      $result = implode(", ", $_POST;
    }
    var_dump($result);
  } else{
    echo 'error';
    exit;
  }*/
// $_POST = json_decode(file_get_contents('php://input'), true);

  function getOS($user_agent){
    $os_platform  = "Unknown OS Platform";
    $os_array     = array(
        '/windows nt 10/i'      =>  'Windows 10/11',
        '/windows nt 6.3/i'     =>  'Windows 8.1',
        '/windows nt 6.2/i'     =>  'Windows 8',
        '/windows nt 6.1/i'     =>  'Windows 7',
        '/windows nt 6.0/i'     =>  'Windows Vista',
        '/windows nt 5.2/i'     =>  'Windows Server 2003/XP x64',
        '/windows nt 5.1/i'     =>  'Windows XP',
        '/windows xp/i'         =>  'Windows XP',
        '/windows nt 5.0/i'     =>  'Windows 2000',
        '/windows me/i'         =>  'Windows ME',
        '/win98/i'              =>  'Windows 98',
        '/win95/i'              =>  'Windows 95',
        '/win16/i'              =>  'Windows 3.11',
        '/macintosh|mac os x/i' =>  'Mac OS X',
        '/mac_powerpc/i'        =>  'Mac OS 9',
        '/linux/i'              =>  'Linux',
        '/ubuntu/i'             =>  'Ubuntu',
        '/iphone/i'             =>  'iPhone',
        '/ipod/i'               =>  'iPod',
        '/ipad/i'               =>  'iPad',
        '/android/i'            =>  'Android',
        '/blackberry/i'         =>  'BlackBerry',
        '/webos/i'              =>  'Mobile'
    );
    foreach($os_array as $regex => $value){
        if(preg_match($regex, $user_agent)){
            $os_platform = $value;
        }
    }
    return $os_platform;
  }
  function getBrowser($user_agent){
    $browser = "Unknown Browser";
    $browser_array = array(
        '/msie/i'      => 'Internet Explorer',
        '/firefox/i'   => 'Firefox',
        '/safari/i'    => 'Safari',
        '/chrome/i'    => 'Chrome',
        '/edge/i'      => 'Edge', 
        '/opera/i'     => 'Opera',
        '/netscape/i'  => 'Netscape',
        '/maxthon/i'   => 'Maxthon',
        '/konqueror/i' => 'Konqueror',
        '/mobile/i'    => 'Handheld Browser',
        '/yabrowser/i' => 'Яндекс.Браузер'
    );
    foreach($browser_array as $regex => $value){
        if(preg_match($regex, $user_agent)){
            $browser = $value;
        }
    }
    return $browser;
  }
  $user_agent = $_SERVER['HTTP_USER_AGENT'];
  $user_inf = getOS($user_agent).'. '.getBrowser($user_agent);
  $title = htmlspecialchars(preg_replace("/[^а-яa-z0-9 ё!-?—()–.−_]/ui", "", $_POST["title"]));
  $name = htmlspecialchars(preg_replace("/[^а-яa-z0-9 ё!-?—()–.−_]/ui", "", $_POST["name"]));
  $text = htmlspecialchars(preg_replace("/[^а-яa-z0-9 ё!-?—()–.−_]/ui", "", $_POST["text"]));
  $tel = htmlspecialchars(preg_replace("/[^0-9 +\-().]/ui", "", $_POST["tel"]));
  $carmodel = htmlspecialchars(preg_replace("/[^а-яa-z0-9 ё!-?—()–.−_]/ui", "", $_POST["carmodel"]));
  $equip = htmlspecialchars(preg_replace("/[^а-яa-z0-9 ё!-?—()–.−_]/ui", "", $_POST["carequip"]));
  $email = htmlspecialchars(preg_replace("/[^а-яa-z0-9 +\-_@.]/ui", "", $_POST["email"]));
  $timeNow = htmlspecialchars(preg_replace("/[^а-яa-z0-9 +\-_@.]/ui", "", $_POST["timeNow"]));
  $time = htmlspecialchars(preg_replace("/[^0-9 +\-():.]/ui", "", $_POST["time"]));
  $url = htmlspecialchars(preg_replace("/[^а-яa-z0-9\/:\-_.]/ui", "", $_POST["url"]));
  $msgtxt = '';
  if($title!=''){ $msgtxt .= '<p><strong>'.$title.'</strong><br>&nbsp;</p>'; }
  if($name!=''){ $msgtxt .= '<p><strong>Имя:</strong> '.$name.'</p>'; }
  if($text!=''){ $msgtxt .= '<p><strong>Дополнительная информация:</strong> '.$text.'</p>'; }
  if($tel!=''){ $msgtxt .= '<p><strong>Телефон:</strong> '.$tel.'</p>'; }
  if($carmodel!=''){ $msgtxt .= '<p><strong>Автомобиль:</strong> '.$carmodel.'</p>'; }
  if($equip!=''){ $msgtxt .= '<p><strong>Комплектация:</strong> '.$equip.'</p>'; }
  if($email!=''){ $msgtxt .= '<p><strong>E-Mail:</strong> '.$email.'</p>'; }
  if($timeNow!=''){ $msgtxt .= '<p><strong>Время:</strong> '.$timeNow.'</p>'; }
  if($time!=''){ $msgtxt .= '<p><strong>Время:</strong> '.$time.'</p>'; }
  if($message!=''){ $msgtxt .= '<p><strong>Сообщение:</strong> '.$message.'</p>'; }
  if($url!=''){ $msgtxt .= '<p><strong>Страница:</strong> '.$url.'</p>'; }
  if($user_inf != '. '){ $msgtxt .= '<p><strong>Утройство пользователя:</strong> '.$user_inf.'</p>'; }
  if($_SERVER['REMOTE_ADDR']!=''){ $msgtxt .= '<p><strong>IP:</strong> '.$_SERVER['REMOTE_ADDR'].'</p>'; }

  function getExtension($filename){
    $path_info = pathinfo($filename);
    return $path_info['extension'];
  };
  function send_mime_mail($name_from, // имя отправителя
                          $email_from, // email отправителя
                          $name_to, // имя получателя
                          $email_to, // email получателя
                          $data_charset, // кодировка переданных данных
                          $send_charset, // кодировка письма
                          $subject, // тема письма
                          $body, // текст письма
                          $html = FALSE, // письмо в виде html или обычного текста
                          $reply_to = FALSE
  ) {
    $to = mime_header_encode($name_to, $data_charset, $send_charset)
    . ' <' . $email_to . '>';
    $subject = mime_header_encode($subject, $data_charset, $send_charset);
    $from =  mime_header_encode($name_from, $data_charset, $send_charset)
    .' <' . $email_from . '>';
    if($data_charset != $send_charset) {
        $body = iconv($data_charset, $send_charset, $body);
    }
    $headers = "From: ".$from."\r\n"; 
    $headers .= "Mime-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=".$send_charset."\r\n";
    $headers .= "Content-Transfer-Encoding: 8bit\r\n";
    $headers .= "Reply-To: ivan05@mail.ru\r\n";
    if($email_to == 'mr.golbya@gmail.com'){
    // if($email_to == 'cs@flagman-avto.ru'){
      $headers .= "Bcc: maki-86@yandex.ru\r\n";
    }
    if($reply_to) {
        $headers .= "Reply-To: ".$reply_to."";
    }
    return mail($to, $subject, $body, $headers);
  }
  function mime_header_encode($str, $data_charset, $send_charset){
    if($data_charset != $send_charset) {
      $str = iconv($data_charset, $send_charset, $str);
    }
    return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
  }
  send_mime_mail('Сайт Oting Флагман-Авто', 'noreply@oting-flagman.ru', 'Получатель', 'mr.golbya@gmail.com', 'utf-8', 'KOI8-R', ''.$title.'', ''.$msgtxt.'');
  // send_mime_mail('Сайт Jetour Флагман-Авто', 'noreply@oting-flagman.ru', 'Получатель', 'sales@flagman-avto.ru', 'utf-8', 'KOI8-R', ''.$title.'', ''.$msgtxt.'');
  // send_mime_mail('Сайт Jetour Флагман-Авто', 'noreply@oting-flagman.ru', 'Получатель', 'cs@flagman-avto.ru', 'utf-8', 'KOI8-R', ''.$title.'', ''.$msgtxt.'');
  // send_mime_mail('Сайт Jetour Флагман-Авто', 'noreply@oting-flagman.ru', 'Получатель', 'shuman@flagman-avto.ru', 'utf-8', 'KOI8-R', ''.$title.'', ''.$msgtxt.'');

  echo $name;

//   if (mail($name_to, $message, $headers)) {
//     http_response_code(200);
//     echo "Данные отправлены.";
// } else {
//     http_response_code(400);
//     echo "Ошибка. Данные не отправлены.";
// };
?>