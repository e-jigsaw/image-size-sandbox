const sizeOf = require('image-size')
const request = require('request')
const {DOMParser, XMLSerializer} = require('xmldom')

request(
  process.env.URL,
  (err, res, body) => {
    const {width, height} = sizeOf(new Buffer(body))
    const parser = new DOMParser()
    const svg = parser.parseFromString(body, 'image/svg+xml')
    svg.firstChild.setAttribute('width', width)
    svg.firstChild.setAttribute('height', height)
    const serializer = new XMLSerializer()
    console.log(serializer.serializeToString(svg))
  }
)
