package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.service.KeranjangService;
import finalProject.toko.roti.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
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
        try {
            Keranjang keranjangList = keranjangService.findAll(idUser);
            if (keranjangList==null) {
                return new ResponseEntity<>(keranjangList, HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(keranjangList, HttpStatus.OK);
            }
        } catch (EmptyResultDataAccessException e){
            System.out.println(e);
            return new ResponseEntity<>("",HttpStatus.NOT_FOUND);
        }
    }

    //------------------Delete One Cart Detail------------------//

    @DeleteMapping("/detail-keranjang/{idDetail}")
    public ResponseEntity<?> deleteDetail(@PathVariable("idDetail") String idDetail) {
        keranjangService.deleteDetailById(idDetail);
        return new ResponseEntity<>(new CustomErrorType("Detail Berhasil Dihapus"),HttpStatus.NO_CONTENT);
    }

    //------------------Add to Cart------------------//

    @PostMapping("/keranjang")
    public ResponseEntity<?> addToCart(@RequestParam String idUser, @RequestBody Keranjang keranjang) {
        Keranjang keranjang1 = keranjangService.findAll(idUser);

        if (keranjang1 == null) {
            keranjangService.saveKeranjang(keranjang);
            return new ResponseEntity<>(new CustomErrorType("Roti Berhasil Dimasukkan Ke Keranjang"), HttpStatus.CREATED);
        } else {
            keranjangService.saveDetail(keranjang);
            return new ResponseEntity<>(new CustomErrorType("Roti Berhasil Dimasukkan Ke Keranjang"), HttpStatus.CREATED);
        }
    }

    //------------------Update Qty Cart Detail------------------//

    @PutMapping("/update-qty")
    public ResponseEntity<?> updateQtyDetail(@RequestParam String idDetail, int kuantitas) {
        keranjangService.updateKuantitas(idDetail, kuantitas);
        return new ResponseEntity<>(new CustomErrorType("Data berhasil diedit"), HttpStatus.CREATED);
    }
}
