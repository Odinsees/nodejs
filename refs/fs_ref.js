const fs = require("fs");
const path = require("path");

//File system

//create dir
// fs.mkdir(path.join(__dirname, "notes"), (error) => {
//   if (error) throw err;
//   console.log('dir has been created');
// });

//create file
// fs.writeFile(
//   path.join(__dirname, "notes", "myNotes.txt"),
//   "hello world",
//   (err) => {
//     if (err) throw err;
//     console.log("file has been created");
//     //change file
//     fs.appendFile(
//       path.join(__dirname, "notes", "myNotes.txt"),
//       " From append file",
//       (err) => {
//         if (err) throw err;
//         console.log("file has been changed");
//       }
//     );
//   }
// );

// //read file
// fs.readFile(
//   path.join(__dirname, "notes", "myNotes.txt"),
//   'utf-8',
//   (err,data)=>{
//     if(err) throw err
//     console.log(data);
//   }
// )


//rename file
fs.rename(
  path.join(__dirname, 'notes', 'myNotes.txt'),
  path.join(__dirname, 'notes', 'notes.txt'),
  (err)=>{
    if(err) throw err
    console.log('file has been renamed');
  }
)
