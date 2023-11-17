import { insertRoutes } from './routes';
// import { insertCouseRoutes } from './routes/courses/course.routes';
import insertSchemas from './schemas';
import app from './server'

async function main(){
  try{
    await insertSchemas(app)
    await insertRoutes(app)
    // await insertCouseRoutes(app)
    app.listen({
      host:"0.0.0.0",
      port:5000
    }).then(()=>{
      console.log("server listening on port ", 5000);
    })
  }catch(e){
    console.log(e)
  }
}

main()