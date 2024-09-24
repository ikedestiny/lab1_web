package org.example;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.utility.ParamsPerser;

public class RubblishTests {
    public static void main(String[] args) throws JsonProcessingException {
        System.out.println(ParamsPerser.parseRequest("r=0&y=   jd0&x=-2"));
    }
}
