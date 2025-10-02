<template>
  <div class="album-edit-container">
    <h2>앨범 수정</h2>
    <div v-if="loading">로딩중...</div>
    <div v-else>
      <form @submit.prevent="submitEdit" enctype="multipart/form-data">
        <div>
          <label>앨범 이미지 미리보기:</label><br/>
          <img :src="previewImg || album.img" alt="앨범 이미지" style="max-width:200px; max-height:200px; object-fit:cover;"/>
        </div>
        <div>
          <label for="imgFile">이미지 변경:</label>
          <input type="file" id="imgFile" @change="onFileChange" accept="image/*" />
        </div>
        <div>
          <label for="title">제목:</label>
          <input type="text" id="title" v-model="form.title" required maxlength="30" />
        </div>
        <div>
          <label for="artist">아티스트:</label>
          <input type="text" id="artist" v-model="form.artist" required maxlength="20" />
        </div>
        <div>
          <label for="type">유형:</label>
          <select id="type" v-model="form.type" required>
            <option value="">-- 선택하세요 --</option>
            <option value="싱글">싱글</option>
            <option value="EP">EP</option>
            <option value="정규">정규</option>
            <option value="믹스테잎">믹스테잎</option>
          </select>
        </div>
        <div>
          <label for="genre">장르:</label>
          <input type="text" id="genre" v-model="form.genre" maxlength="15" />
        </div>
        <div>
          <label for="released">발매일:</label>
          <input type="date" id="released" v-model="form.released" />
        </div>
        <div>
          <label for="content">앨범 소개:</label><br/>
          <textarea id="content" v-model="form.content" rows="8"></textarea>
        </div>
        <div>
          <button type="submit">수정 완료</button>
        </div>
      </form>
      <div v-if="errorMsg" style="color:red; margin-top:10px;">{{ errorMsg }}</div>
      <div v-if="successMsg" style="color:green; margin-top:10px;">{{ successMsg }}</div>
    </div>
  </div>
</template>

<script>

import axios from '@/utils/axios'

export default {
  name: "AlbumEdit",
  props: {
    ano: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      album: null,
      form: {
        title: '',
        artist: '',
        type: '',
        genre: '',
        released: '',
        content: '',
        img: ''
      },
      selectedFile: null,
      previewImg: null,
      loading: true,
      errorMsg: '',
      successMsg: ''
    };
  },
  async mounted() {
    await this.fetchAlbum();
  },
  methods: {
    async fetchAlbum() {
      try {
        const response = await axios.get(`/album/${this.ano}/edit`);
        this.album = response.data;
        // form 초기화
        this.form.title = this.album.title;
        this.form.artist = this.album.artist;
        this.form.type = this.album.type;
        this.form.genre = this.album.genre;
        this.form.released = this.album.released;
        this.form.content = this.album.content;
        this.form.img = this.album.img;
        this.loading = false;
      } catch (err) {
        console.error("앨범 정보 가져오기 오류:", err);
        this.errorMsg = "앨범 정보를 가져오는데 실패했습니다.";
        this.loading = false;
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
        this.selectedFile = file;
        // 프리뷰
        const reader = new FileReader();
        reader.onload = e => {
          this.previewImg = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFile = null;
        alert("이미지 파일을 선택해주세요.");
      }
    },
    async submitEdit() {
      // 유효성 검사 (간단히)
      if (!this.form.title.trim() || !this.form.artist.trim() /* ... 필요 시 더 검사 */) {
        this.errorMsg = "필요한 항목을 모두 입력하세요.";
        return;
      }

      const formData = new FormData();
      // 서버가 기대하는 이름과 동일하게 append 해야 함
      formData.append("title", this.form.title);
      formData.append("artist", this.form.artist);
      formData.append("type", this.form.type);
      formData.append("genre", this.form.genre);
      formData.append("released", this.form.released);
      formData.append("content", this.form.content);
      // 이미지가 새로 선택된 경우에만
      if (this.selectedFile) {
        formData.append("imgFile", this.selectedFile);
      }

      try {
        await axios.put(`/album/${this.ano}/edit`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: true
        });
        alert('앨범 수정 성공!');
        this.$router.push('/album/manage');
      } catch (error) {
        console.error("수정 실패:", error);
        this.errorMsg = error.response?.data || "수정 중 오류가 발생했습니다.";
        this.successMsg = '';
      }
    }
  }
};
</script>

<style scoped>
.album-edit-container {
  max-width: 700px;
  margin: 50px auto;
  background: #fff;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.album-edit-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
.album-edit-container form > div {
  margin-bottom: 15px;
}
.album-edit-container form label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
.album-edit-container form input[type="text"],
.album-edit-container form input[type="date"],
.album-edit-container form select,
.album-edit-container form textarea {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
.album-edit-container button {
  padding: 10px 15px;
  background-color: darkgreen;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.error { color: red; }
.success { color: green; }
</style>
