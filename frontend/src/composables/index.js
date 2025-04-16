import api from "@/services/api";
import { ref, computed } from "vue";
import { watch } from "vue";

export function useCpfExtractor() {
  const selectedFile = ref(null);
  const isDragging = ref(false);
  const fileError = ref("");
  const isLoading = ref(false);
  const apiCalled = ref(false);
  const apiError = ref("");
  const cpfList = ref([]);
  const searchQuery = ref("");
  const currentPage = ref(1);
  const itemsPerPage = 50;

  const filteredCpfList = computed(() => {
    let filtered = cpfList.value;

    if (searchQuery.value.trim()) {
      filtered = filtered.filter((cpf) =>
        cpf.includes(searchQuery.value.trim())
      );
    }

    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filtered.slice(startIndex, endIndex);
  });

  const totalPages = computed(() => {
    let filtered = cpfList.value;

    if (searchQuery.value.trim()) {
      filtered = filtered.filter((cpf) =>
        cpf.includes(searchQuery.value.trim())
      );
    }

    return Math.ceil(filtered.length / itemsPerPage);
  });

  const resetPagination = () => {
    currentPage.value = 1;
  };

  const watchSearchQuery = () => {
    resetPagination();
  };

  const handleDragOver = () => {
    isDragging.value = true;
  };

  const handleDragLeave = () => {
    isDragging.value = false;
  };

  const handleFileDrop = (event) => {
    isDragging.value = false;
    const file = event.dataTransfer.files[0];
    validateAndSetFile(file);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    fileError.value = "";

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      fileError.value = "Please select a valid PDF file";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      fileError.value = "File size exceeds the 10MB limit";
      return;
    }

    selectedFile.value = file;
  };

  const removeFile = () => {
    selectedFile.value = null;
    fileError.value = "";
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const copyToClipboard = (cpf) => {
    navigator.clipboard
      .writeText(cpf)
      .then(() => {
        alert("CPF copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const submitFile = async () => {
    if (!selectedFile.value) return;

    isLoading.value = true;
    apiCalled.value = true;
    apiError.value = "";
    cpfList.value = [];
    currentPage.value = 1;
    searchQuery.value = "";

    try {
      const formData = new FormData();

      formData.append("pdf", selectedFile.value);

      await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const response = await api.get("/upload");

      cpfList.value = response.data.cpfs;
    } catch (error) {
      console.error("API call failed:", error);
      apiError.value = "An error occurred while processing the file";
    } finally {
      isLoading.value = false;
    }
  };

  watch(searchQuery, watchSearchQuery);

  return {
    selectedFile,
    isDragging,
    fileError,
    isLoading,
    apiCalled,
    apiError,
    cpfList,
    searchQuery,
    currentPage,
    itemsPerPage,
    filteredCpfList,
    totalPages,

    handleDragOver,
    handleDragLeave,
    handleFileDrop,
    handleFileSelect,
    validateAndSetFile,
    removeFile,
    formatFileSize,
    copyToClipboard,
    submitFile,
  };
}
