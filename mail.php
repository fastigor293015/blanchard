<?php
  $to = "fastigor293015@gmail.com"; // емайл получателя данных из формы
  $tema = "Форма обратной связи на PHP"; // тема полученного емайла
  $message = "Ваше имя: ".$_POST['name']."<br>";//присвоить переменной значение, полученное из формы name=name
  $message .= "Номер телефона: ".$_POST['tel']."<br>"; //полученное из формы name=phone
  $headers  = 'MIME-Version: 1.0' . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
  $headers .= 'Content-type: text/html; charset=utf-8' . "\r\n"; // указывает на тип посылаемого контента
  mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных
?>


