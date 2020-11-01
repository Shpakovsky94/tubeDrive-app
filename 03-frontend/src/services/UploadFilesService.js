import Vue from "vue"

class UploadFilesService {
    

  upload(file, progress) {
    let formData = new FormData();

    formData.append("files[]", file);

    return Vue.http.post("import", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            'Access-Control-Allow-Origin': '*'
          },
       progress
    });
  }
}

export default new UploadFilesService();