export const FileInMBValidate = (file) => {
    const fileSizeMB = file / 1024 / 1024;
    const fileSizeRoundof = Math.round(fileSizeMB * 10) / 10;
    return fileSizeRoundof;
}

// function FileInMB(x){
//     const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
//      let l = 0, n = parseInt(x, 10) || 0;
//      while(n >= 1024 && ++l){
//          n = n/1024;
//      }
//      return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
//    }

export const FileInMB = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const hanleCopy = async (text) => {
    // console.log('copied text..??',text);
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
    console.log('error',err)
    }
}