const express = require("express");
var cors = require("cors");
const app = express();
const request = require("request");
const axios = require("axios");
const bodyParser = require("body-parser");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname + ".jpg");
  },
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));
let port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the api server of globalbuybd.com");
});
app.get("/singleProduct/:productIdAndType", async (req, res) => {
  let productIdAndType = req.params.productIdAndType.split(",");
  let productId = productIdAndType[0];
  let type = productIdAndType[1];
  _EXTERNAL_URL = `http://api24.ch/${type}/index.php?route=api_tester/call&api_name=item_get&lang=en&num_iid=${productId}&is_promotion=1&key=globalbuybd.com-kazi.tipu.nxt@gmail.com-taobao-1688`;
  await axios
    .get(_EXTERNAL_URL)
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error

      res.send(error);
    })
    .then(function () {
      // always executed
    });
});

app.get("/collection/:searchKeywordAndPage", async (req, res) => {
  let searchKeywordAndPage = req.params.searchKeywordAndPage.split(",");
  let searchKeyword = searchKeywordAndPage[0];
  console.log(searchKeyword);
  let page = searchKeywordAndPage[1];
  console.log(page);

  console.log(req.params);
  _EXTERNAL_URL = `http://api24.ch/taobao/index.php?route=api_tester/call&api_name=item_search&lang=en&q=${searchKeyword}&start_price=0&end_price=0&page=${page}&cat=0&discount_only=&sort=&page_size=&seller_info=&nick=&ppath=&imgid=&filter=&key=globalbuybd.com-kazi.tipu.nxt@gmail.com-taobao-1688`;

  await axios
    .get(_EXTERNAL_URL)
    .then(function (response) {
      // handle success
      res.send(response.data);
    })
    .catch(function (error) {
      // handle error

      res.send(error);
    })
    .then(function () {
      // always executed
    });
});

app.post("/uploadImage/", upload.single("productImage"), (req, res, err) => {
  res.send(req.file.path);
});

app.get("/getProductListByImage/:imgUrl", async (req, res, err) => {
  try {
    const imgUrl = req.params.imgUrl;
    // making first api request for uploading the image to api server
    _EXTERNAL_URL = `http://api24.ch/taobao/index.php?route=api_tester/call&api_name=upload_img&lang=en&imgcode=https://taobao-1688-api-nodejs.herokuapp.com/uploads/${imgUrl}&key=globalbuybd.com-kazi.tipu.nxt@gmail.com-taobao-1688`;
    const { data } = await axios.get(_EXTERNAL_URL);
    const searchUrl = data.items.item.name;
    console.log(searchUrl);

    //  making second api request for searching by the image
    _URL_FOR_SEARCHING = `http://api24.ch/taobao/index.php?route=api_tester/call&api_name=item_search_img&lang=en&imgid=${searchUrl.toString()}&key=globalbuybd.com-kazi.tipu.nxt@gmail.com-taobao-1688`;
    const response = await axios.get(_URL_FOR_SEARCHING);
    res.send(response.data);
  } catch (error) {
    res.status(422).send(error);
  }
});

app.listen(port, () => {
  console.log(`app is listening on the port ${port}`);
});
