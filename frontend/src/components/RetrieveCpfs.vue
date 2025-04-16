<template>
  <div class="pdf-cpf-extractor">
    <div class="upload-section">
      <h2>Upload PDF File</h2>
      <p class="description">Upload a PDF file to extract CPF numbers</p>

      <div
        class="dropzone"
        :class="{
          active: isDragging,
          'has-file': selectedFile,
          error: fileError,
        }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleFileDrop"
      >
        <div class="dropzone-content">
          <div class="icon" v-if="!selectedFile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
              <path d="M12 18v-6" />
              <path d="m9 15 3 3 3-3" />
            </svg>
          </div>

          <div class="file-info" v-if="selectedFile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
              />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" x2="8" y1="13" y2="13" />
              <line x1="16" x2="8" y1="17" y2="17" />
              <line x1="10" x2="8" y1="9" y2="9" />
            </svg>
            <div class="file-details">
              <span class="file-name">{{ selectedFile.name }}</span>
              <span class="file-size">{{
                formatFileSize(selectedFile.size)
              }}</span>
            </div>
            <button class="remove-file" @click.prevent="removeFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
            </button>
          </div>

          <p v-else>
            Drag & drop your PDF file here or
            <label class="file-input-label">
              browse
              <input
                type="file"
                accept=".pdf"
                @change="handleFileSelect"
                class="file-input"
              />
            </label>
          </p>

          <p v-if="fileError" class="error-text">{{ fileError }}</p>
        </div>
      </div>

      <div class="actions">
        <button
          class="submit-button"
          :disabled="!selectedFile || isLoading"
          @click="submitFile"
        >
          <span v-if="isLoading">
            <svg
              class="spinner"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Processing...
          </span>
          <span v-else>Extract CPFs</span>
        </button>
      </div>
    </div>

    <div class="cpf-list-section" v-if="apiCalled">
      <h2>CPF Numbers Found</h2>

      <div v-if="isLoading" class="loading-state">
        <svg
          class="spinner"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <p>Extracting CPF numbers...</p>
      </div>

      <div v-else-if="apiError" class="error-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
        <p>{{ apiError }}</p>
      </div>

      <div v-else-if="cpfList.length === 0" class="empty-state">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="8" x2="16" y1="12" y2="12" />
        </svg>
        <p>No CPF numbers found in the document</p>
      </div>

      <div v-else class="cpf-results">
        <div class="cpf-stats">
          <span class="cpf-count">{{ cpfList.length }} CPFs found</span>
          <div class="search-container">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search CPFs..."
              class="search-input"
            />
          </div>
        </div>

        <div class="cpf-container">
          <ul class="cpf-list">
            <li
              v-for="(cpf, index) in filteredCpfList"
              :key="index"
              class="cpf-item"
            >
              <div class="cpf-number">{{ cpf }}</div>
              <button class="copy-button" @click="copyToClipboard(cpf)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path
                    d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                  />
                </svg>
                Copy
              </button>
            </li>
          </ul>
        </div>

        <div class="pagination" v-if="totalPages > 1">
          <button
            class="page-button"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
          <button
            class="page-button"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCpfExtractor } from "../composables/index";

const {
  selectedFile,
  isDragging,
  fileError,
  isLoading,
  apiCalled,
  apiError,
  cpfList,
  searchQuery,
  currentPage,
  filteredCpfList,
  totalPages,

  handleDragOver,
  handleDragLeave,
  handleFileDrop,
  handleFileSelect,
  removeFile,
  formatFileSize,
  copyToClipboard,
  submitFile,
} = useCpfExtractor();
</script>

<style scoped src="@/scss/styles.scss" lang="scss"></style>
