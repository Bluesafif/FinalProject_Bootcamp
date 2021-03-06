package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Roti;
import finalProject.toko.roti.model.User;
import finalProject.toko.roti.service.RotiService;
import finalProject.toko.roti.service.UserService;
import finalProject.toko.roti.util.CustomErrorType;
import finalProject.toko.roti.util.CustomSuccessType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/roti/master")
public class RotiController {

    public static final Logger logger = LoggerFactory.getLogger(RotiController.class);

    @Autowired
    RotiService rotiService;

    @Autowired
    UserService userService;

    //------------------Get All Roti------------------//

    @GetMapping("/roti")
    public ResponseEntity<List<Roti>> listAllRoti(@RequestParam int page, int limit){
        List<Roti> rotiList = rotiService.findAll(page, limit);
        if (rotiList.isEmpty()) {
            return new ResponseEntity<>(rotiList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rotiList, HttpStatus.OK);
    }

    //------------------Count All Roti------------------//

    @GetMapping("/roti-count/")
    public ResponseEntity<?> countRoti(@RequestParam String idUser){
        User users = userService.findById(idUser);

        int listRoti;
        if (users.getRole().equals("Admin")){
            listRoti = rotiService.findAllCountRoti();
            return new ResponseEntity<>(listRoti,HttpStatus.OK);
        } else if (users.getRole().equals("Umum") || users.getRole().equals("Member")){
            listRoti = rotiService.findAllCountRotiPelanggan();
            return new ResponseEntity<>(listRoti,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new CustomErrorType("Tidak ada!"), HttpStatus.NOT_FOUND);
        }
    }

    //------------------Save a Data------------------//

    @PostMapping("/save-roti")
    public ResponseEntity<?> saveRoti(@RequestBody Roti roti){
        logger.info("Menyimpan Roti : {} ", roti);

        if (roti.getIdRoti().isBlank() || roti.getNamaRoti().isBlank() ||
                roti.getIdJenisRoti().isBlank() || roti.getKeterangan().isBlank()){
            return new ResponseEntity<>(new CustomErrorType("Data tidak boleh kosong"), HttpStatus.BAD_REQUEST);
        } else {
            if (roti.getStokRoti() >= 0) {
                if (roti.getHargaSatuan() != 0 && roti.getHargaSatuan() >= 5000){
                    if (roti.getHargaLusin() != 0 && roti.getHargaLusin() >= 4500 && roti.getHargaLusin() <= roti.getHargaSatuan()) {
                        try {
                            Roti findRoti = rotiService.findByNamaRoti(roti.getNamaRoti());
                            if (findRoti == null) {
                                rotiService.saveRoti(roti);
                                return new ResponseEntity<>(new CustomSuccessType("Data Berhasil Ditambahkan!"), HttpStatus.CREATED);
                            } else {
                                return new ResponseEntity<>(new CustomErrorType("Roti dengan nama '" + roti.getNamaRoti() + "' telah tersedia"), HttpStatus.CONFLICT);
                            }
                        } catch (DataAccessException e) {
                            e.printStackTrace();
                            return new ResponseEntity<>(new CustomErrorType("Gagal melakukan input data"), HttpStatus.BAD_GATEWAY);
                        }
                    } else {
                        return new ResponseEntity<>(new CustomErrorType("Harga selusin tidak boleh kosong atau kurang dari Rp.4500"), HttpStatus.BAD_REQUEST);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Harga satuan tidak boleh kosong atau kurang dari Rp.5000"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Stok roti tidak boleh 0 atau minus"), HttpStatus.BAD_REQUEST);
            }
        }
    }

    //------------------Get One Data Only------------------// (check)

    @GetMapping("/oneroti")
    public ResponseEntity<?> getOneRoti(@RequestParam String idRoti) {
        logger.info("Mencari roti dengan id {}", idRoti);
        Roti roti = rotiService.findById(idRoti);
        if (roti == null) {
            logger.error("Roti dengan id {} tidak ada.", idRoti);
            return new ResponseEntity<>(new CustomErrorType("Roti dengan id " + idRoti  + " tidak ada."), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(roti, HttpStatus.OK);
    }

    //------------------Update a Data------------------// (check)

    @PutMapping("/roti/{idRoti}")
    public ResponseEntity<?> updateRoti(@PathVariable("idRoti") String idRoti, @RequestBody Roti roti) {
        logger.info("Mengubah roti dengan id {}", idRoti);

        if (roti.getStokRoti() >= 0) {
            if (roti.getHargaSatuan() != 0 && roti.getHargaSatuan() >= 5000){
                if (roti.getHargaLusin() != 0 && roti.getHargaLusin() >= 4500 && roti.getHargaLusin() <= roti.getHargaSatuan()) {
                    try {
                        Roti roti1 = rotiService.findById(idRoti);
                        if (roti1 != null) {
                            roti1.setNamaRoti(roti.getNamaRoti());
                            roti1.setIdJenisRoti(roti.getIdJenisRoti());
                            roti1.setStokRoti(roti.getStokRoti());
                            roti1.setHargaSatuan(roti.getHargaSatuan());
                            roti1.setHargaLusin(roti.getHargaLusin());
                            roti1.setKeterangan(roti.getKeterangan());

                            rotiService.updateRoti(roti1);
                            return new ResponseEntity<>(new CustomSuccessType("Data Berhasil Diubah!"), HttpStatus.OK);
                        } else {
                            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data Roti. Roti dengan id " + idRoti + " tidak tersedia."), HttpStatus.NOT_FOUND);
                        }
                    } catch (DataAccessException e) {
                        e.printStackTrace();
                        return new ResponseEntity<>(new CustomErrorType("Gagal melakukan input data"), HttpStatus.BAD_GATEWAY);
                    }
                } else {
                    return new ResponseEntity<>(new CustomErrorType("Harga selusin tidak boleh 0 atau kurang dari Rp.4500"), HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<>(new CustomErrorType("Harga satuan tidak boleh 0 atau kurang dari Rp.5000"), HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(new CustomErrorType("Stok roti tidak boleh 0 atau minus"), HttpStatus.BAD_REQUEST);
        }
    }

    //------------------Switching Status One Data Only------------------// (check)

    @PutMapping("/roti/status/{idRoti}")
    public ResponseEntity<?> updateStatusRoti(@PathVariable("idRoti") String idRoti) {
        logger.info("Mengubah status roti dengan id {}", idRoti);

        Roti roti = rotiService.findById(idRoti);

        if (roti == null) {
            logger.error("Tidak dapat mengubah data Roti. Roti dengan id {} tidak tersedia.", idRoti);
            return new ResponseEntity<>(new CustomErrorType("Tidak dapat mengubah data roti. Roti dengan id "
                    + idRoti + " tidak tersedia."),
                    HttpStatus.NOT_FOUND);
        }

        if (roti.isStatusRoti() == true){
            roti.setStatusRoti(false);
        }else{
            roti.setStatusRoti(true);
        }

        rotiService.status(roti);
        return new ResponseEntity<>(new CustomSuccessType("Status Berhasil Diubah!"), HttpStatus.OK);
    }

    //------------------Sum Stok Roti------------------// (check)

    @GetMapping("/roti/stok-count")
    public ResponseEntity<?> countStokRoti(){
        int stokRoti = rotiService.countStokRoti();
        if (stokRoti == 0){
            return new ResponseEntity<>(new CustomErrorType("Tidak ada roti yang tersedia"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(stokRoti, HttpStatus.OK);
    }

    //------------------Searching Roti------------------//

    @GetMapping("/roti/searchadmin")
    public ResponseEntity<?> searchingRotiAdmin(@RequestParam String search, int page, int limit){
        List<Roti> rotiList = rotiService.findSearch(search, page, limit);
        if (rotiList.isEmpty()) {
            return new ResponseEntity<>(rotiList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rotiList, HttpStatus.OK);
    }

    //------------------Searching Roti------------------//

    @GetMapping("/roti/searchpelanggan")
    public ResponseEntity<?> searchingRotiPelanggan(@RequestParam String search, int page, int limit){
        List<Roti> rotiList = rotiService.findSearchPelanggan(search, page, limit);
        if (rotiList.isEmpty()) {
            return new ResponseEntity<>(rotiList, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(rotiList, HttpStatus.OK);
    }

    //------------------Count Searching Roti------------------//

    @GetMapping("/roti/searchadmincount")
    public ResponseEntity<?> searchingRotiCount(@RequestParam String search, String idUser){
        User users = userService.findById(idUser);

        int listRoti;
        if (users.getRole().equals("Admin")){
            listRoti = rotiService.countSearch(search);
            return new ResponseEntity<>(listRoti,HttpStatus.OK);
        } else if (users.getRole().equals("Umum") || users.getRole().equals("Member")){
            listRoti = rotiService.countSearchPelanggan(search);
            return new ResponseEntity<>(listRoti,HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new CustomErrorType("Tidak ada!"), HttpStatus.NOT_FOUND);
        }
    }
}
