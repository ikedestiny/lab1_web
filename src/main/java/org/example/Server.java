package org.example;

import com.fastcgi.FCGIInterface;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.ClientRequest;
import org.example.model.ServerResponse;
import org.example.utility.RequestChecker;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;

public class Server extends FCGIInterface {

    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" + "Content-Length: %d\n\n%s";
    private ObjectMapper objectMapper;


    public Server() {
        this.objectMapper = new ObjectMapper();
        objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    }


    public ClientRequest readRequestBody() throws IOException {
        request.inStream.fill();
        var contentLength = request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        var readBytes = request.inStream.read(buffer.array(), 0, contentLength);

        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();

        String requestJson = new String(requestBodyRaw, StandardCharsets.UTF_8);
        return objectMapper.readValue(requestJson, ClientRequest.class);
    }

    public String getJsonResponse() throws IOException {
        ClientRequest request = readRequestBody();
        ServerResponse response = RequestChecker.checkRequest(request);
        return objectMapper.writeValueAsString(response);
    }

    public void sendJson(String jsonDump) {
//        System.out.printf((RESPONSE_TEMPLATE) + "%n", jsonDump.getBytes(StandardCharsets.UTF_8).length, jsonDump);

        var httpResponse = """
                HTTP/1.1 200 OK
                Content-Type: text/html
                Content-Length: %d
                %s
                """.formatted(jsonDump.getBytes(StandardCharsets.UTF_8).length, jsonDump);
        System.out.println(httpResponse);
    }


}
