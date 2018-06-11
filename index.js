const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = parseInt(process.env.PORT || 3000)

const gear = require("./routes/gear")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))
app.use(cors({origin: true, credentials: true}))




// function filterDataById(data, id) {
//   return data.filter(element => {
//     // console.log(Object.keys(element));
//     return element[id] != Object.keys(element)[id]
//   })
// }

app.get('/', (req, res, next) => {
  res.json(gear)
})

app.use('/gear', gear)

app.listen(port)
  .on('listening', console.log.bind(console, `Listening on ${port}`))
