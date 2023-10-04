<template>
  <div>
    <header>
      <span>《</span>
      <h4 class="title">搜索</h4>
    </header>
    <form action="">
      <input type="text" placeholder="请输入商家或美食名称" />
      <input type="submit" value="提交" />
    </form>
    <section class="history">
      <h4>搜索历史</h4>
      <ul>
        <li>
          <p>烤肉拌饭</p>
          <span>×</span>
        </li>
      </ul>
      <p class="kong">清空历史</p>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import '@/style/bass.less';
@baseSize: 4.14vw;

header {
    width: 100%;
    height: (50 / @baseSize);
    background: #3190e8;
    display: flex;
    line-height: (50 / @baseSize);
    text-align: center;
    color: white;
    font-size: (20 / @baseSize);

    span {
        width: 10%;
    }

    h4 {
        width: 90%;
    }
}

form {
    height: (70 / @baseSize);
    padding: (15 / @baseSize) (10 / @baseSize);
    background: white;
    display: flex;

    input {
        margin-right: (5 / @baseSize);
        height: (40 / @baseSize);
        font-size: (16 / @baseSize);
        font-weight: bold;
        border: 0;
        border-radius: (5 / @baseSize);
        outline: none;

        &:first-child {
            width: 80%;
            padding-left: (8 / @baseSize);
            background: #f2f2f2;
        }

        &:last-child {
            width: 20%;
            border: 0;
            background-color: #3190e8;
            color: white;
        }
    }
}

.history {
    line-height: (52 / @baseSize);
    h4 {
        height: (51 / @baseSize);
        color: gray;
        line-height: (51 / @baseSize);
        padding-left: (10 / @baseSize);
    }

    ul {
        background: white;
        font-size: (18 / @baseSize);
        li {
            width: 100%;
            height: (52 / @baseSize);
            padding-left: (10 / @baseSize);
            padding-right: (10 / @baseSize);
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgb(199, 197, 197);
        }
    }

    .kong {
        background-color: white;
        height: (52 / @baseSize);
        text-align: center;
        font-size: (20 / @baseSize);
        font-weight: bold;
        color:#3190e8;
    }
}
</style>