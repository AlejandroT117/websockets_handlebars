const fs = require('fs').promises

class Contenedor{
  constructor(filename){
    this.filename = filename
    this.next_id = 1
  }

  async save(new_object){
    try{
      let last_id = 0
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      if(data){
        for (let i = 0; i < data.length; i++) {
          const producto = data[i];
          last_id = producto.id          
        }
      }

      this.next_id = last_id + 1

      new_object.id = this.next_id

      data.push(new_object)

      await fs.writeFile(this.filename, JSON.stringify(data, null, 2), 'utf-8')
    }catch(e){
      console.log(e)
    }

  }

  async getById(id){
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      const obj = data.find((obj)=>obj.id===id)

      if(!obj){
        return null
      }

      return obj
    }catch(e){
      console.log(e)
    }
  }

  async getAll() {
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      return data
    }catch(e){
      console.log(e)
    }
  }

  async deleteById(id){
    try{
      const raw = await fs.readFile(this.filename, 'utf-8')
      const data = JSON.parse(raw)

      const filtered_data = data.find((obj)=>obj.id!==id)

      await fs.writeFile(this.filename, JSON.stringify(filtered_data, null, 2), 'utf-8')
    }catch(e){  
      console.log(e)
    }
  }

  async deleteAll(){
    try{
      await fs.writeFile(this.filename, JSON.stringify([], null, 2), 'utf-8')
    }catch(e){
      console.log(e)
    }
  }


}


module.exports = Contenedor