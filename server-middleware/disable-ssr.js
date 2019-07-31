export default function(req, res, next) {
  const paths = [/^\/admin(.*)/]

  // console.log(req.originalUrl)
  // for (path of paths){
  paths.forEach(cb => {
    if(cb.test(req.originalUrl)) {
      res.spa = true
    }
  })

  // }

  // Don't forget to call next in all cases!
  // Otherwise, your app will be stuck forever :|
  next()
}
