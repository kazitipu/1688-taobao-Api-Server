const express = require('express')
var cors = require('cors')
const app = express()
const request = require('request');
const axios = require('axios');

app.use(cors())
let port = process.env.PORT || 5000

app.get('/', (req,res)=>{
    res.send('add any ali products id to the route')
})

 

app.get('/:searchKeywordAndPage',async (req, res)=> {
  let searchKeywordAndPage = req.params.searchKeywordAndPage.split(',')
  let searchKeyword = searchKeywordAndPage[0]
  console.log(searchKeyword)
  let page = searchKeywordAndPage[1]
  console.log(page)

  console.log(req.params)
  _EXTERNAL_URL = `http://api24.be/taobao/index.php?route=api_tester/call&api_name=item_search&lang=en&q=${searchKeyword}&start_price=0&end_price=0&page=${page}&cat=0&discount_only=&sort=&page_size=&seller_info=&nick=&ppath=&imgid=&filter=&key=globalbuybd.com-kazi.tipu.nxt@gmail.com-taobao-1688`;

    await axios.get(_EXTERNAL_URL)
    .then(function (response) {
      // handle success
      res.send(response.data)
    })
    .catch(function (error) {
      // handle error
     
      res.send(error)
    })
    .then(function () {
      // always executed
  });
})



app.listen(port,()=>{
    console.log(`app is listening on the port ${port}`)
})



