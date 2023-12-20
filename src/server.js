import grpc from "@grpc/grpc-js"
import protoLoader from "@grpc/proto-loader"

// load the proto file
const packageDefinition = protoLoader.loadSync("todo.proto", {});

// obtaining the todoPackage as an object
const grpcObject = grpc.loadPackageDefinition(packageDefinition);

// getting the Todo package or the protocol object, now it's services can be accessed
const todoPackage = grpcObject.todoPackage;


// creating a new server
const server = new grpc.Server();

// createInsecure ==> plain text communication
server.bindAsync("0.0.0.0:3000", grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error(`Error binding to port: ${err}`);
            return;
        }
        console.log(`Server is listening on port ${port}`);
        server.start()
    })

server.addService(todoPackage.Todo.service,
    {
        "createTodo": createTodo,
        "readTodos": readTodos
    }
)

const todos = []
function createTodo(call, callback) {
    const todoItem = {
        "id": todos.length + 1,
        "text": call.request.text
    }
    todos.push(todoItem)
    console.log(todos);
    callback(null, todoItem);
}

function readTodos(call, callback) {
    callback(null,
        {
            "items": todos
        }
    )
}