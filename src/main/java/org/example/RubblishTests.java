package org.example;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.model.ServerResponse;
import org.example.utility.ParamsPerser;

public class RubblishTests {
    public static void main(String[] args) throws JsonProcessingException {
        System.out.println(ParamsPerser.parseRequest("r=0&y=0&x=-2"));
    }
}
