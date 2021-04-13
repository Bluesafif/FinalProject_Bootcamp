package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Grafik;
import finalProject.toko.roti.service.GrafikService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/roti")
public class GrafikController {
    public static final Logger logger = LoggerFactory.getLogger(GrafikController.class);

    @Autowired
    GrafikService grafikService;

    //------------------Change Password------------------//

    @GetMapping("/grafikRotiTerbeli/")
    public ResponseEntity<List<Grafik>> listRotiTerbeli() {
        List<Grafik> grafik = grafikService.rotiTerbeli();

        if(grafik.isEmpty()) {
            return new ResponseEntity<>(grafik, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(grafik, HttpStatus.OK);
    }
}
