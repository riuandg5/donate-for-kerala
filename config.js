var config = module.exports;

config.express = {
    port = process.env.PORT || 8080,
    ip = process.env.IP || '127.0.0.1'
}

config.db = {
    uri = "mongodb://donor:donate1@ds143262.mlab.com:43262/donateforkerala" || "mongodb://localhost/donateforkerala"
}