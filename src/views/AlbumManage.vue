<template>
  <div id="wrapper">
    <div id="albumListContainer">
      <div class="domestic">
        <span class="cate">
          <router-link to="/">관리자 메인 페이지</router-link>
        </span>
      </div>
      <ul class="list">
        <div v-if="albums.length === 0" id="noAlbum">앨범이 없습니다.</div>
        <li v-for="album in albums" :key="album.ano" class="album-item">
          <div class="album-link">
            <img :src="album.img" class="img" alt="" />
            <div class="info">
              <p class="title">{{ album.title }}</p>
              <p class="artist">{{ album.artist }}</p>
              <p class="date">Released: {{ album.released }}</p>
            </div>
          </div>

          <div class="button-group">
            <button @click="goToEdit(album.ano)">수정</button>
            <button @click="deleteAlbum(album.ano)">삭제</button>
          </div>
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
      this.$router.push(`/album/${ano}/edit`);
    },
    deleteAlbum(ano) {
      if (confirm("정말 삭제하시겠습니까?")) {
        axios.post('/api/album_remove', { ano })
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
* {
  margin: 0;
  padding: 0;
  color: black;
  box-sizing: border-box;
  text-decoration: none;
}

body {
  background-color: whitesmoke;
  margin: 0 auto;
  max-width: 1130px;
  height: 160px;
  position: relative;
  overflow-x: hidden;
}

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

#albumListContainer .domestic {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

#albumListContainer .domestic .cate a {
  color: #333;
  text-decoration: none;
  font-weight: bold;
  margin: 0 5px;
}

.list {
  list-style: none;
}

.album-item {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.album-link {
  display: flex;
  align-items: center;
}

.album-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  flex-shrink: 0;
}

.info {
  margin-left: 20px;
}

.title {
  font-size: 16px;
  font-weight: bold;
}

.artist {
  font-size: 14px;
}

.date {
  font-size: 12px;
}

.button-group {
  margin-left: auto;
  display: flex;
  gap: 8px; /* 버튼 사이 간격 */
}

.button-group button {
  padding: 6px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.button-group button:hover {
  background-color: #e0e0e0;
}

#noAlbum {
  margin-top: 100px;
  margin-bottom: 120px;
}
</style>
