package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Laporan;
import finalProject.toko.roti.service.LaporanService;
import finalProject.toko.roti.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/roti")
public class LaporanController {

    public static final Logger logger = LoggerFactory.getLogger(LaporanController.class);

    @Autowired
    LaporanService laporanService;

    //------------------Add to Cart------------------// (check)

    @PostMapping("/laporan")
    public ResponseEntity<?> addLaporan(@RequestBody Laporan laporan) {
        laporanService.saveLaporan(laporan);
        return new ResponseEntity<>(new CustomErrorType("Pembelian Berhasil"), HttpStatus.CREATED);
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/laporancustomer")
    public ResponseEntity<List<Laporan>> listAllLaporanCustomer(@RequestParam String idUser) {
        List<Laporan> laporanList = laporanService.findAllCustomer(idUser);
        if (laporanList.isEmpty()) {
            return new ResponseEntity<>(laporanList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(laporanList, HttpStatus.OK);
        }
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/laporanadmin")
    public ResponseEntity<List<Laporan>> listAllLaporan() {
        List<Laporan> laporanList = laporanService.findAll();
        if (laporanList.isEmpty()) {
            return new ResponseEntity<>(laporanList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(laporanList, HttpStatus.OK);
        }
    }

    //------------------Sum Kuantitas All Roti------------------// (check)

    @GetMapping("/laporan/allkuantitascount")
    public ResponseEntity<?> countAllKuantitasRoti(@RequestParam String idUser){
        int kuantitasRoti = laporanService.countAllKuantitasRoti(idUser);
        if (kuantitasRoti == 0){
            return new ResponseEntity<>(new CustomErrorType("Tidak ada roti yang terbeli"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(kuantitasRoti, HttpStatus.OK);
    }

    //------------------Sum Pengeluaran All Roti------------------// (check)

    @GetMapping("/laporan/allpengeluarancount")
    public ResponseEntity<?> countPengeluaranRoti(@RequestParam String idUser){
        int pengeluaranRoti = laporanService.countPengeluaranRoti(idUser);
        if (pengeluaranRoti == 0){
            return new ResponseEntity<>(new CustomErrorType("Tidak ada pengeluaran"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pengeluaranRoti, HttpStatus.OK);
    }

    //------------------Sum Kuantitas All Roti Terjual------------------// (check)

    @GetMapping("/laporan/allrotiterjual")
    public ResponseEntity<?> countAllRotiTerjual(){
        int kuantitasRoti = laporanService.countAllRotiTerjual();
        if (kuantitasRoti == 0){
            return new ResponseEntity<>(new CustomErrorType("Tidak ada roti yang terjual"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(kuantitasRoti, HttpStatus.OK);
    }

    //------------------Sum Pengeluaran All Roti------------------// (check)

    @GetMapping("/laporan/allpendapatancount")
    public ResponseEntity<?> countPendapatanRoti(){
        int pendapatanRoti = laporanService.countPendapatanRoti();
        if (pendapatanRoti == 0){
            return new ResponseEntity<>(new CustomErrorType("Tidak ada pendapatan"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(pendapatanRoti, HttpStatus.OK);
    }
}
