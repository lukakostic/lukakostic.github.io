class DropboxManager {
    constructor(ACCESS_TOKEN) {
        this.access = ACCESS_TOKEN;
        this.dropbox = new Dropbox.Dropbox({ accessToken: accessFromUrl(this.access) });
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
        return new DropboxManager(accessFromUrl(url));
    }

    filesUpload(obj) {
        this.dropbox.filesUpload(obj)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    filesDownload(obj){
        this.dropbox.filesDownload(obj)
        .then(function (response) {
          let blob = response.fileBlob;
          let reader = new FileReader();
    
          reader.addEventListener("loadend", function () {
            Loaded(reader.result);
          });
    
          reader.readAsText(blob);
        })
        .catch(function (error) {
            Loaded(null);
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