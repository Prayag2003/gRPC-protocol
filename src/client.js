import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"
const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todoPackage = grpcObject.todoPackage;

const userInput = process.argv[2]
const client = new todoPackage.Todo("localhost:3000", grpc.credentials.createInsecure())

client.createTodo({
    "id": -1,
    "text": userInput
}, (err, res) => {
    if (err) {
        throw new Error(err?.message || "Todo creation failed.")
    }
    console.log("Received from server" + JSON.stringify(res));
})

client.readTodos({}, (err, res) => {

    if (err) {
        throw new Error(err?.message || "Cannot get todos.")
    }
    // console.log("Received from the server:" + JSON.stringify(res));
    res.items.forEach(i => console.log(i.id + ": " + i.text))

})