import axios from "axios";

// export const uploadToS3 = (presignedUrl: string, uploadFile: File) => {
//   return fetch(presignedUrl, {
//     'body': uploadFile,
//     'headers': {
//       'Content-Type': 'image/png',
//     },
//     'method': 'PUT'
//   }).then((res) => {
//     console.log(res);
//   })
// }

export const uploadToS3 = (url: string, file: File) => { return fetch(
  url,
  {
      'body': file,
      'headers': {
          'Accept': 'application/json'
      },
      'method': 'PUT'
  }).then(response => {
      console.log(response);
  }); 
};