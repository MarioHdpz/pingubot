<?php

$time = file_get_contents('bathroom.txt');

if (!empty($time) && time() < $time) {
  echo 'ocupado';
} else {
  echo 'disponible';
}
