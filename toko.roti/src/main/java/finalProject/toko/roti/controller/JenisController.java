package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Jenis;
import finalProject.toko.roti.service.JenisService;
import finalProject.toko.roti.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/roti/master")
public class JenisController {

    public static final Logger logger = LoggerFactory.getLogger(JenisController.class);

    @Autowired
    JenisService jenisService;

    //------------------Get All Roti------------------//

    @GetMapping("/jenis")
    public ResponseEntity<List<Jenis>> listAllJenisRoti(){
        List<Jenis> jenisList = jenisService.findAllJenis();
        if (jenisList.isEmpty()) {
            return new ResponseEntity<>(jenisList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(jenisList, HttpStatus.OK);
    }
}
