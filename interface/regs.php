<?php
    include('./conn.php');
    $name = $_REQUEST['user_name'];
    $password = $_REQUEST['user_password'];
    // echo $name;
    // echo $password;

    $sql = "select * from users where user_name='$name'";
    $res = $mysqli->query($sql);
   
    //  var_dump($res);
    // die;
    // echo $sql;
    // die;
    if($res->num_rows > 0){
        // echo "<script>alert('用户名已存在，请重新输入');</script>";
        echo '{"user":"1"}';
        
    }else{
        // echo "<script>alert('注册成功，请登录');</script>";
        echo '{"user":"0"}';
    $sql2 = "insert into users(user_name,user_password)values('$name','$password')";
    $mysqli->query($sql2);
    // $mysqli->close();
        // echo "<script>location.href = '../src/html/konka.com_login.html'</script>";
    }
    $mysqli->close();

?>