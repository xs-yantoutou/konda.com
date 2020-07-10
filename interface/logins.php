<?php
header('content-type:text/html;charset=utf-8');
include('./conn.php');
$username=$_REQUEST['user_name'];
$password=$_REQUEST['user_password'];
// echo $username;
// echo'<br>';
// echo $password;
// die;
$sql="select * from users where user_name='$username'and user_password='$password'";
// $sql ="insert into users (user_name,user_password) values ('$username','$password')";

$res=$mysqli->query($sql);
// var_dump($res);
// die;
$row = $res->fetch_assoc();
// $json = json_encode($row);
// echo $json;


// die;
if($row){
    // echo '<script>alert("登陆成功");</script>';
    // echo $row;
    echo '{"user":"1"}';
    // echo '<script>location.href="../src/html/konka.com_index.html";</script>';
}
    else{
    // echo '<script>alert("用户名或密码不正确，请重新输入");</script>';
    echo '{"user":"0"}';
    // echo '<script>location.href="../src/html/konka.com_login.html";</script>';
}
$mysqli->close();
?>