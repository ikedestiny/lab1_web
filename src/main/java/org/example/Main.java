package org.example;

import com.fastcgi.FCGIInterface;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.ClientRequest;
import org.example.model.ServerResponse;
import org.example.utility.ParamsPerser;
import org.example.utility.RequestChecker;

import java.nio.charset.StandardCharsets;

public class Main {

    private static final String RESPONSE_TEMPLATE = "Content-Type: application/json\n" +
            "Content-Length: %d\n\n%s";


    public static void main(String[] args) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
//
        while (new FCGIInterface().FCGIaccept() >= 0) {
            String params = FCGIInterface.request.params.getProperty("QUERY_STRING");
            try {
                ClientRequest request = ParamsPerser.parseRequest(params);
                if (isGoodParams(request)) {
                    ServerResponse response = RequestChecker.checkRequest(request);
                    sendJson(mapper.writeValueAsString(response));
                } else {
                    sendErrJSON();
                }

            } catch (Exception e) {
                sendErrJSON();
            }

        }
    }

    private static void sendJson(String jsonDump) {
        System.out.printf((RESPONSE_TEMPLATE) + "%n", jsonDump.getBytes(StandardCharsets.UTF_8).length, jsonDump);
    }

    public static void sendErrJSON() {
        String err = """
                {
                  "error": "Bad request",
                  "message": "Request body could not be read properly.",
                }
                """;

        System.out.printf("Status: 400\n" + RESPONSE_TEMPLATE + "%n", err.getBytes(StandardCharsets.UTF_8).length, err);


    }


    public static boolean isGoodParams(ClientRequest request) {
        return !(request.getX() > 2) && !(request.getX() < -2) && !(request.getY() < -3) && !(request.getY() > 3) && !(request.getR() < 1) && !(request.getR() > 3);

    }
}