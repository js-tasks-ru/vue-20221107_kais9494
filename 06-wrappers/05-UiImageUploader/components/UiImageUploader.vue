<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="previewStyleImg">
      <span class="image-uploader__text">{{ statusMessage }}</span>
      <input ref="inputImg" v-bind="$attrs" type="file" accept="image/*" @click="onClickInput($event)"
        @change="onChangeInput($event)" class="image-uploader__input" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,

  data() {
    return {
      isLoading: false,
      previewUrl: this.preview
    }
  },

  emits: ['remove', 'select', 'upload', 'error'],

  computed: {
    statusMessage() {
      if (this.isLoading) {
        return "Загрузка..."
      } else if (this.previewUrl) {
        return "Удалить изображение"
      } else {
        return "Загрузить изображение"
      }
    },
    previewStyleImg() {
      return this.previewUrl ? "--bg-url: url('" + this.previewUrl + "')" : '--bg-url';
    }
  },
  methods: {
    onClickInput(e) {
      if (this.isLoading) {
        e.preventDefault();
      } else if (this.previewUrl) {
        this.$refs.inputImg.value = ''
        this.$emit('remove');
        this.previewUrl = '';
        e.preventDefault()
      }
    },
    onChangeInput(e) {
      let file = e.target.files[0]
      this.$emit('select', file);
      this.previewUrl = URL.createObjectURL(file)
      if (this.uploader) {
        this.isLoading = true
        this.uploader(file).then((data) => {
          console.log(data)
          this.$emit('upload', data);
        }).catch((err) => {
          this.$emit('error', err);
        }).finally(() => {
          this.previewUrl = this.preview

          this.$refs.inputImg.value = ''
          this.isLoading = false
        })
      } else {
        this.$refs.inputImg.value = ''
      }
    }
  },

  props: {
    preview: String,
    uploader: Function,
  }
};
</script>

<style scoped>
.image-uploader {}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
