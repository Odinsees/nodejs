const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Partners {
  constructor(name, number, logoUrl) {
    this.name = name;
    this.number = number;
    this.logoUrl = logoUrl;
    this.id = uuidv4();
  }

  toJSON() {
    return ({
      name: this.name,
      number: this.number,
      logoUrl: this.logoUrl,
      id: this.id,
    });
  }

  async save() {
    const partners = await Partners.getAll();
    partners.push(this.toJSON());
    return new Promise((res,rej)=>{
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'partners.json'),
        JSON.stringify(partners),
        (err)=>{
          if(err){
            rej(err)
          }else{
            res()
          }
        }
      )
      
    }) 
  }
  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "partners.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Partners;
