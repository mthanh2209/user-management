import pkg from "json-server";
const { create, router: _router, defaults } = pkg; // importing json-server library
const server = create();
const router = _router("db.json");
const middlewares = defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);
