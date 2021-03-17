package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.model.Roti;
import finalProject.toko.roti.service.KeranjangService;
import finalProject.toko.roti.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/roti")
public class KeranjangController {

    public static final Logger logger = LoggerFactory.getLogger(KeranjangController.class);

    @Autowired
    KeranjangService keranjangService;

    //------------------Get All Data------------------//

    @GetMapping("/keranjang")
    public ResponseEntity<?> listAllKeranjang(@RequestParam String idUser){
        Keranjang keranjangList = keranjangService.findAll(idUser);
        if (keranjangList==null) {
            return new ResponseEntity<>(keranjangList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(keranjangList, HttpStatus.OK);
        }
    }

    //------------------Delete One Cart Detail------------------//

    @DeleteMapping("/detail-keranjang/{idDetail}")
    public ResponseEntity<?> deleteDetail(@PathVariable("idDetail") String idDetail) {
        keranjangService.deleteDetailById(idDetail);
        return new ResponseEntity<>(new CustomErrorType("Detail Berhasil Dihapus"),HttpStatus.NO_CONTENT);
    }
}
