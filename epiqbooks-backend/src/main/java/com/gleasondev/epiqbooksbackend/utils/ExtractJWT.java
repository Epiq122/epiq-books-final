package com.gleasondev.epiqbooksbackend.utils;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class ExtractJWT
{
    public static String  payloadJWTExtraction(String token, String extraction){ // extraction is what we want to search
        // for in the payload
        // need to remove the word Bearer from the JWT token to read it properly
       token.replace("Bearer ", "");
       // this splits our token into 3 parts
       String[] split_string = token.split("\\.");
       // decodes the JWT into code we can understand
        Base64.Decoder decoder = Base64.getDecoder();


        // this is going to get the payload of the JWT
        String payload = new String(decoder.decode(split_string[1]));

        // what are all the entries we can get from the payload
        String[] entries = payload.split(",");

        Map<String,String> map = new HashMap<>();
        for(String entry : entries) {
            String[] keyValue = entry.split(":");
            // trying to pull the information out of sub
            if (keyValue[0].equals(extraction)) {

                Integer remove =1;
                if(keyValue[1].endsWith("}")){
                    remove = 2;
                }
                keyValue[1] = keyValue[1].substring(0,keyValue[1].length()-remove);
                keyValue[1] = keyValue[1].substring(1);
                map.put(keyValue[0],keyValue[1]);
            }
        }
          if(map.containsKey(extraction)){
            return map.get(extraction);
        }

    return null;
    }

}
