package com.youframe.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;

@Controller
public class FileToBase64StringConversionController {
    static HashSet<String> imageNameWithBase64Set = new HashSet<>();

    @GetMapping("/")
    public String index() {
        return "uploadImage";
    }

    @RequestMapping("/api/uploadImage")
    @ResponseBody
    public String uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) throws IOException {
        //@RequestParam("file") MultipartFile file,
        byte[] fileContent = file.getBytes();
        String encodedString = Base64.getEncoder().encodeToString(fileContent);
        String fileName = file.getOriginalFilename()+UUID.randomUUID();
        String imageNameWithBase64 = file.getOriginalFilename()+"$$"+"data:image/jpeg;base64,"+encodedString;
        imageNameWithBase64Set.add(imageNameWithBase64);
        return imageNameWithBase64;
    }

    @RequestMapping("/api/loadImage")
    @ResponseBody
    public HashSet<String> loadImages(HttpServletRequest request)  {
        return imageNameWithBase64Set;
    }

}
