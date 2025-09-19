<template>
  <div id="wrapper">
    <div id="albumListContainer">
      <div class="domestic">
        <span class="cate">
          <router-link to="/admin">관리자 메인 페이지</router-link>
        </span>
      </div>
      <ul class="list">
        <div v-if="albums.length === 0" id="noAlbum">앨범이 없습니다.</div>
        <li v-for="album in albums" :key="album.ano" class="album-item">
          <div class="album-link">
            <img :src="album.img" alt="" />
            <div class="info">
              <p class="title">{{ album.title }}</p>
              <p class="artist">{{ album.artist }}</p>
              <p class="date">Released: {{ album.released }}</p>
            </div>
          </div>
          <button @click="goToEdit(album.ano)">수정</button>
          <button @click="deleteAlbum(album.ano)">삭제</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AlbumManage',
  data() {
    return {
      albums: [],
    };
  },
  created() {
    this.fetchAlbums();
  },
  methods: {
    fetchAlbums() {
      axios.get('/api/albums')
          .then(res => {
            this.albums = res.data;
          })
          .catch(err => {
            console.error("앨범 불러오기 실패", err);
          });
    },
    goToEdit(ano) {
      this.$router.push(`/admin/album_edit?ano=${ano}`);
    },
    deleteAlbum(ano) {
      if (confirm("정말 삭제하시겠습니까?")) {
        axios.post('/api/album_remove', { ano }) // 삭제 API도 필요
            .then(() => {
              alert("삭제 완료");
              this.fetchAlbums();
            })
            .catch(() => {
              alert("삭제 실패");
            });
      }
    }
  }
}
</script>

<style scoped>

#wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
#albumListContainer {
  padding: 20px;
  flex: 1;
  width: 80%;
  margin: 100px auto 100px auto;
}
.album-item {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
}
.album-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.info {
  margin-left: 20px;
}
.album-item .title {
  font-weight: bold;
}
button {
  margin-left: auto;
  padding: 0 10px;
}
</style>
