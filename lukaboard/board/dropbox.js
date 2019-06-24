class DropboxManager {
    constructor(ACCESS_TOKEN) {
        this.access = ACCESS_TOKEN;
        this.dropbox = new Dropbox.Dropbox({ accessToken: this.access, fetch: null });
    }

    static accessFromUrl(url) {
        let ac = "";
        if (url.includes('?d=')) {
            for (let i = url.indexOf('?d=') + 3; i < url.length && url[i] != '?'; i++)
                ac += url[i];
        }
        return ac;
    }

    static fromUrl(url) {
        return new DropboxManager(DropboxManager.accessFromUrl(url));
    }

    filesDeleteUpload(obj){
        this.dropbox.filesDelete(obj).then(function (response){
            console.log(response);
            filesUpload(obj);
        }).catch(function (error){
            console.log(error);
            filesUpload(obj);
        });
    }

    filesUpload(obj,callback) {
        this.dropbox.filesUpload(obj)
            .then(function (response) {
                console.log(response);
                if(callback) callback(response);
            })
            .catch(function (error) {
                console.error(error);
                if(callback) callback(error);
            });
    }

    filesDownload(obj,callback){
        this.dropbox.filesDownload(obj)
        .then(function (response) {
          let blob = response.fileBlob;
          let reader = new FileReader();
    
          reader.addEventListener("loadend", function () {
            callback(reader.result);
          });
    
          reader.readAsText(blob);
        })
        .catch(function (error) {
            callback(null);
        });
    }

      
    filesListFolder(path = '') {
        this.dropbox.filesListFolder({ path: path })
          .then(function (response) {
            console.log('response', response);
            listFiles(response.entries);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
}