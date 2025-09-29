<template>
  <div id="loginform">
    <h1 id="adminTitle">관리자 로그인</h1>

    <div class="container">
      <div id="adminLoginDiv">
        <input
            v-model="adminId"
            id="adminId"
            class="special-class"
            type="text"
            maxlength="30"
            placeholder="admin"
            required
        />
        <img id="adminLoginImg" src="https://cdn-icons-png.flaticon.com/128/4663/4663997.png" />
      </div>

      <div id="adminPwdDiv">
        <input
            v-model="adminPwd"
            id="adminPwd"
            class="special-class"
            type="password"
            maxlength="15"
            placeholder="비밀번호"
            required
        />
        <img id="adminPwdImg" src="https://cdn-icons-png.flaticon.com/128/747/747305.png" />
      </div><br />

      <button @click="submitLogin" id="adminLogin">로그인</button><br />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminLogin',
  data() {
    return {
      adminId: '',
      adminPwd: ''
    };
  },
  methods: {
    async submitLogin() {
      if (!this.adminId || !this.adminPwd) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return;
      }

      try {
        const response = await axios.post('/api/admin/login', {
          aLoginId: this.adminId,
          aPwd: this.adminPwd
        });

        alert('관리자 로그인 성공');
        localStorage.setItem('adminToken', response.data.token); // 여기서 JWT 처음으로 생성해서 저장
        this.$router.push('/dashboard'); // 페이지 이동

      } catch (error) {
        // 에러 메시지 간단 처리
        const message = error.response?.data?.message || '로그인 실패';
        alert(message);
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>

#loginform {
  max-width: 500px;
  max-height: 500px;
  text-align: center;
  border: 3px solid #f1f1f1;
  border-radius: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding-top: 2%;
  padding-bottom: 2%;
  margin: 200px auto 150px;
}

.container {
  width: 400px;
  margin: 0 auto;
  text-align: left;
}

.special-class {
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

#adminLoginDiv, #adminPwdDiv {
  position: relative;
}

#adminLoginImg, #adminPwdImg {
  position: absolute;
  left: 8px;
  top: 40%;
  transform: translateY(-50%);
  height: 22px;
  width: 22px;
  pointer-events: none;
}

#adminPwdImg {
  top: 35%;
}

#adminId, #adminPwd {
  padding-left: 45px;
}

#adminLogin {
  position: relative;
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: darkgreen;
  color: whitesmoke;
  font-size: 15px;
  text-align: center;
  transition-duration: 0.2s;
}

#adminLogin:hover {
  background-color: seagreen;
}

#adminTitle {
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 18px;
}
</style>
