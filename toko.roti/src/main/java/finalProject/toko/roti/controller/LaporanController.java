package finalProject.toko.roti.controller;

import finalProject.toko.roti.model.Laporan;
import finalProject.toko.roti.model.Roti;
import finalProject.toko.roti.service.LaporanService;
import finalProject.toko.roti.service.RotiService;
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
@RequestMapping("/roti")
public class LaporanController {

    public static final Logger logger = LoggerFactory.getLogger(LaporanController.class);

    @Autowired
    LaporanService laporanService;

    @Autowired
    RotiService rotiService;

    //------------------Add to Cart------------------// (check)

    @PostMapping("/laporan")
    public ResponseEntity<?> addLaporan(@RequestBody Laporan laporan) {

        List<Roti> rotiList = laporan.getRotiList();

        for (int i = 0; i < rotiList.size(); i++) {
            Roti roti = rotiService.findById(laporan.getRotiList().get(i).getIdRoti());
            if (laporan.getRotiList().get(i).getKuantitas() > roti.getStokRoti()) {
                return new ResponseEntity<>(new CustomErrorType("Pembelian gagal! Roti " + laporan.getRotiList().get(i).getNamaRoti() + " tidak tersedia."), HttpStatus.CONFLICT);
            } else if (!roti.isStatusRoti()) {
                return new ResponseEntity<>(new CustomErrorType("Pembelian gagal! Roti " + laporan.getRotiList().get(i).getNamaRoti() + " tidak tersedia."), HttpStatus.CONFLICT);
            }
        }

        laporanService.saveLaporan(laporan);
        return new ResponseEntity<>(new CustomErrorType("Pembelian Berhasil"), HttpStatus.CREATED);
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/laporancustomer")
    public ResponseEntity<List<Laporan>> listAllLaporanCustomer(@RequestParam String idUser, int page, int limit) {
        List<Laporan> laporanList = laporanService.findAllCustomer(idUser, page, limit);
        if (laporanList.isEmpty()) {
            return new ResponseEntity<>(laporanList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(laporanList, HttpStatus.OK);
        }
    }

    //------------------Count All Laporan Customer------------------// (check)

    @GetMapping("/laporancustomer-count")
    public ResponseEntity<?> countLaporanCustomer(@RequestParam String idUser){
        int listLaporan = laporanService.findAllCountLaporan(idUser);
        if (listLaporan == 0){
            return new ResponseEntity<>(listLaporan, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listLaporan,HttpStatus.OK);
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/laporanadmin")
    public ResponseEntity<List<Laporan>> listAllLaporan(@RequestParam int page, int limit) {
        List<Laporan> laporanList = laporanService.findAll(page, limit);
        if (laporanList.isEmpty()) {
            return new ResponseEntity<>(laporanList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(laporanList, HttpStatus.OK);
        }
    }

    //------------------Get All Data------------------// (check)

    @GetMapping("/laporanadminmonth")
    public ResponseEntity<List<Laporan>> listAllLaporanMonth(@RequestParam int page, int limit, int bulan, int tahun, String namaPembeli, String namaRoti) {
        List<Laporan> laporanList = laporanService.findAllMonth(page, limit, bulan, tahun, namaPembeli, namaRoti);
        if (laporanList.isEmpty()) {
            return new ResponseEntity<>(laporanList, HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(laporanList, HttpStatus.OK);
        }
    }

    //------------------Count All Laporan------------------// (check)

    @GetMapping("/laporanall-count")
    public ResponseEntity<?> countLaporanAll(){
        int listLaporan = laporanService.countAllLaporan();
        if (listLaporan == 0){
            return new ResponseEntity<>(listLaporan, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listLaporan,HttpStatus.OK);
    }

    //------------------Count All Laporan Month------------------// (check)

    @GetMapping("/laporanallmonth-count")
    public ResponseEntity<?> countLaporanAllMonth(@RequestParam int bulan, int tahun, String namaPembeli, String namaRoti){
        int listLaporan = laporanService.countAllLaporanMonth(bulan, tahun, namaPembeli, namaRoti);
        if (listLaporan == 0){
            return new ResponseEntity<>(listLaporan, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(listLaporan,HttpStatus.OK);
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
