import { readFile } from "fs/promises"; //destructuring,to use readfile directly
import { createServer } from "http"; //destructuring
import path from "path";
import crypto from "crypto";
import { appendFile, writeFile } from "fs/promises";

const PORT = 3001;
const DATA_FILE = path.join("data", "links.json");
//2)to avoid using same piece of code twice in server function
const serveFile = async (res, filePath, contentType) => {
  try {
    const data = await readFile(filePath); //this data is fetched from index.html
    //we have to read index.html and style.css file,to convert it into node.js;

    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 page not found");
  }
};
//6)
const loadLinks = async () => {
  try {
    const data = await readFile(DATA_FILE, "utf-8"); //this data is of json.link file in data folder
    return JSON.parse(data);
  } catch (error) {
    //error is imp here
    if (error.code === "ENOENT") {
      //it means if file json.link doesnt exists
      await writeFile(DATA_FILE, JSON.stringify({})); //{} means empty object that is converted into json ie empty json;path:url,data:JSON.stringify({}))
      return {};
    }
    throw error;
  }
};
const saveLinks = async (links) => {
  await writeFile(DATA_FILE, JSON.stringify(links));
};
//1)creating server to get to required page ;eg home page,then when onclick another page
//1.1)These all are requests from frontend
const server = createServer(async (req, res) => {
  if (req.method === "GET") {
    if (req.url === "/") {
      //"/"means home page
      return serveFile(res, path.join("public", "index.html"), "text/html");
      //adding public folder;
      //reading index.html file
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join("public", "style.css"), "text/css");
    } else if (req.url === "/links") {//to display links on webpage
      const links = await loadLinks();

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(links));
    }else{//note if we write else if ,error comes because of links
      const links = await loadLinks();
      const shortCode = req.url.slice(1);//to slice "/" of /thapa_kodyfier to match the shortcode present in link.json file
      console.log(req.url);
      if(links[shortCode]){
        res.writeHead(302,{location:links[shortCode]});//302:page found;location:redirects the provided link;links[shortCode]:https
        return res.end();
      }
      res.writeHead(404,{ "Content-Type": "text/plain" });
      return res.end("Shortened URL is not found");

    }//to redirect on link
  }
  //3)this will be called when we click on shorten button i think;THIS PIECE OF CODE WILL ENTIRELY HELP IN SAVING URL AND SHORTCODE ENTERED BY USER IN JSON.LINK FILE IN DATA FOLDER THAT WILL BE CREATED USING LOADLINKS
  if (req.method === "POST" && req.url === "/shorten") {
    //if with the help of post method,this api(/shorten) is called
    //below,to get links from json.link to check duplicates
    const links = await loadLinks(); //now links has the whole data in the form of js object present in json.link file in data folder
    let body = "";
    req.on("data", (chunk) => {
      //this data is fetched from frontend
      body += chunk.toString();
    }); //NOTE:Very IMP:jab jab server data deta rhega,tab tab req.on ke andar event named data call hota rhega and we will store this data in the body;note:this data is from shorten button that stores url and shortcode entered by user;it was sent from frontend to backend using body: JSON.stringify({ url, shortCode }),
    //when data ends, end is called;we will convert that body data in JS object and then finally store it in our file
    req.on("end", async () => {
      console.log(body); //data is fetched from frontend and stored in body variable
      const { url, shortCode } = JSON.parse(body); //directly destructuring ,this url and shortcode is fetched from data of body in the form of an object
      //4)Also,in link.json file ,in data folder,this data will be stored in the form of {"url":"shortcode"};ex:{"https://kodyfier.com/":"thapa_kodyfier"}
      if (!url) {
        //if url is not entered by user
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("URL is required");
      }
      //5)IMP:find duplicates,to avoid assigning same Shortcode to different links,if the duplicates happen,the user would be asked to change the Shortcode through a prompt
      // const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");
      const finalShortCode =
        shortCode && shortCode.trim() !== ""
          ? shortCode
          : crypto.randomBytes(4).toString("hex");

      //If the user provided a custom shortcode (shortCode), it uses that.
      //If the user did not provide a shortcode, it generates a random one using crypto.randomBytes(4).toString("hex").
      //this shortCode is obtained from const { url, shortCode } = JSON.parse(body);

      if (links[finalShortCode]) {
        //key:link[finalShortCode]=value:https;means it will give the value as link in key:value pairs of json.link;if for this shortcode there is already a link present in link.json file, condition satifies there is a duplicate,we will
        //return res.end("Shortcode already exists.Please choose another");the duplicate shortcode entered by user will not get stored in link.json and process will restart
        //below code,if we have a duplicate
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end("Shortcode already exists.Please choose another");
      }
      //7)if shortcode is not duplicate,finally we will add the data entered by user in json.link file
      links[finalShortCode] = url; //links ke andar updated key and value is added here
      await saveLinks(links); //links is an object that holds key-value pairs, where:
      //Key = finalShortCode (the unique shortcode)
      //Value = url (the original long URL)

      res.writeHead(200, { "Content-Type": "application/json" }); //ending is cumpulsory
      res.end(JSON.stringify({ success: true, shortCode: finalShortCode })); //inside data is optional
    });
  }
  // console.log("Serving stored links:", links);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
