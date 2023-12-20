# gRPC Service for Todo Management

This document provides an overview of the gRPC logic and internal workings of the Todo Management service, implemented using Protocol Buffers (proto) and JavaScript.

## Protocol Definition (`todo.proto`)

The protocol definition (`todo.proto`) describes the structure and behavior of the gRPC service. It includes the following elements:

### Messages

1. **noParams:**
   - An empty message used to signify operations with no parameters.

2. **TodoItem:**
   - Contains information about a Todo item, including an integer ID and a text description.

3. **TodoItems:**
   - Represents a collection of Todo items as a repeated field.

### Service

1. **Todo:**
   - Defines two remote procedure calls (RPCs):
     - `createTodo`: Accepts a `TodoItem` and returns a created Todo item.
     - `readTodos`: Accepts `noParams` and returns a list of Todo items.

## gRPC Client (`client.js`)

The client-side logic is implemented in JavaScript using gRPC libraries. The client performs the following tasks:

1. **Loading Protobuf Definitions:**
   - Loads the Protocol Buffers definition from `todo.proto` using `@grpc/proto-loader`.

2. **Creating gRPC Client:**
   - Creates a gRPC client using the loaded definition, specifying the server address (`localhost:3000`) and using insecure communication.

3. **createTodo RPC:**
   - Invokes the `createTodo` RPC by sending a `TodoItem` with user input as text.
   - Logs the received response from the server.

4. **readTodos RPC:**
   - Invokes the `readTodos` RPC with an empty request.
   - Logs the list of Todo items received from the server.

## gRPC Server (`server.js`)

The server-side logic is implemented in JavaScript using gRPC libraries. The server performs the following tasks:

1. **Loading Protobuf Definitions:**
   - Loads the Protocol Buffers definition from `todo.proto` using `@grpc/proto-loader`.

2. **Creating gRPC Server:**
   - Creates a gRPC server and binds it to the address `0.0.0.0:3000` using insecure communication.

3. **Service Implementation:**
   - Implements the `Todo` service defined in the protocol.
   - Provides logic for the `createTodo` and `readTodos` RPCs.

4. **createTodo RPC Implementation:**
   - Generates a new Todo item with an ID and text from the client request.
   - Adds the created Todo item to the server's Todo list.
   - Logs the server-side Todo list.
   - Sends the created Todo item back to the client.

5. **readTodos RPC Implementation:**
   - Sends the server's Todo list back to the client in response to the `readTodos` RPC.

## Conclusion

This gRPC service allows clients to create and retrieve Todo items. The communication is based on the Protocol Buffers definition, providing a structured and efficient way to exchange data between the client and the server. The server maintains an in-memory list of Todo items, demonstrating the basic functionality of a gRPC-based Todo Management service.
    