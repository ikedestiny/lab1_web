package org.example.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class ServerResponse implements Serializable {
    private float x;
    private float y;
    private float r;
    private Boolean inArea;
    private String reponseTime;

    public ServerResponse(float x, float y, Boolean inArea, String reponseTime, float r) {
        this.r = r;
        this.x = x;
        this.y = y;
        this.inArea = inArea;
        this.reponseTime = reponseTime;
    }
}
