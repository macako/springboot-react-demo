package com.macakosoft.rest.webservices.restfulwebservices.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.macakosoft.rest.webservices.restfulwebservices.bean.AuthenticationBean;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class BasicAuthenticationController {

  @GetMapping("/basicauth")
  public AuthenticationBean getBasicAuth() {
    return new AuthenticationBean("You are authenticated");
  }
}
