exports.handler = function (event, context, callback) {
  const secretContent = `<h3>Hi Guest!</h3>
                        <P>Lorem ipsum dolor sit amet consectetur <strong>adipisicing elite<strong/>.
                          Sunt cupiditate eos quod nesciunt minima velit,
                          illum provident architecto, eaque autem placeat? Repudiandae ab incidunt odio. Modi ad nam nostrum aut!</P>

`
  let body

  if (event.body) {
    body = JSON.parse(event.body)
  } else {
    body = {}
  }

  if (body.password == "javascript") {
    callback(null, {
      statusCode: 200,
      body: secretContent,
    })
  } else {
    callback(null, {
      statusCode: 401,
    })
  }
}
