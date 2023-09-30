<template>
  <div>
    <header>
      <span>ele.me</span>
      <span>登录|注册</span>
    </header>
    <form action="">
      <section>
        <input type="text" placeholder="账号" />
      </section>
      <section>
        <input type="text" placeholder="旧密码" />
      </section>
      <section>
        <input type="text" placeholder="请输入新密码" />
      </section>
      <section>
        <input type="text" placeholder="请确认密码" />
      </section>
      <section>
        <input type="text" placeholder="验证码" />
        <div class="code">
          <img src="" alt="" />
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
    </form>
    <div class="loginup">确认修改</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import '@/style/header.less';
@baseSize:4.14vw;
form{
    // height: (165 / @baseSize);
    margin-top: (10 / @baseSize);
    section{
        position: relative;
        input{
            width: 100%;
            height: (54.25 / @baseSize);
            padding-left: (10 / @baseSize);
            outline: none;
            border: 0;
            border-bottom: 1px solid #e4e4e4;
        }
        .circle_button{
            position: absolute;
            // border:1px solid black;
            right: (15 / @baseSize);
            top:(15 / @baseSize);
            div{
                position: absolute;
                width: (28 / @baseSize);
                height: (28 / @baseSize);
                right: (30 / @baseSize);
                top:(-1.93 / @baseSize);
                border-radius: 50%;
                background-color: rgb(220, 216, 216);
            }
            span{
                display: block;
                width: (40 / @baseSize);
                height:(20 / @baseSize) ;
                top:(15 / @baseSize);
                border-radius: (15 / @baseSize);
                background-color: gray;
                color:white;
            }
        }

        .code{
            position: absolute;
            width: (150 / @baseSize);
            right: (15 / @baseSize);
            top:(10 / @baseSize);
            // border:1px solid black;
            img{
                position: absolute;
                left: 0;
                width: (90 / @baseSize);
                height: (38 / @baseSize);
                background-color: pink;
            }
            p{
                position: absolute;
                right: 0;
                top:(-6 / @baseSize);
                font-size: (13 / @baseSize);
                // border:1px solid black;
                &:last-child{
                    // border:1px solid black;
                    top:(10 / @baseSize);
                    padding-top: (3 / @baseSize);
                    color:#3b95e9;
                }
            }
        }
    }
}

p{
    color: red;
    font-size: (12 / @baseSize);
    margin: (8 / @baseSize) (15 / @baseSize);
}
.loginup{
    width:(350 / @baseSize);
    height:(50 / @baseSize);
    background-color: #4cd964;
    border-radius: (10 / @baseSize);
    line-height: (50 / @baseSize);
    text-align: center;
    color:white;
    font-size: (18 / @baseSize);
    margin: (13 / @baseSize) auto;
}

a{
    position: absolute;
    margin-top: (20 / @baseSize);
    right: (15 / @baseSize);
    color:#3b95e9;
}
</style>