package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Keranjang;
import finalProject.toko.roti.model.Laporan;
import finalProject.toko.roti.repository.LaporanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("LaporanService")
public class LaporanServiceImpl implements LaporanService{

    @Autowired
    LaporanRepository laporanRepository;

    @Override
    public void saveLaporan(Laporan laporan) {
        synchronized (this) {
            laporanRepository.saveLaporan(laporan);
        }
    }

    @Override
    public List<Laporan> findAllCustomer(String idUser, int page, int limit) {
        List<Laporan> laporanList = laporanRepository.findAllCustomer(idUser, page, limit);
        return laporanList;
    }

    @Override
    public String countAllKuantitasRoti(String idUser) {
        return laporanRepository.countAllKuantitasRoti(idUser);
    }

    @Override
    public String countPengeluaranRoti(String idUser) {
        return laporanRepository.countPengeluaranRoti(idUser);
    }

    @Override
    public List<Laporan> findAll(int page, int limit) {
        List<Laporan> laporanList = laporanRepository.findAll(page, limit);
        return laporanList;
    }

    @Override
    public String countAllRotiTerjual() {
        return laporanRepository.countAllRotiTerjual();
    }

    @Override
    public String countPendapatanRoti() {
        return laporanRepository.countPendapatanRoti();
    }

    @Override
    public int findAllCountLaporan(String idUser) {
        return laporanRepository.findAllCountLaporan(idUser);
    }

    @Override
    public int countAllLaporan() {
        return laporanRepository.countAllLaporan();
    }

    @Override
    public List<Laporan> findAllMonth(int page, int limit, int bulan, int tahun, String namaPembeli, String namaRoti) {
        List<Laporan> laporanList = laporanRepository.findAllMonth(page, limit, bulan, tahun, namaPembeli, namaRoti);
        return laporanList;
    }

    @Override
    public int countAllLaporanMonth(int bulan, int tahun, String namaPembeli, String namaRoti) {
        return laporanRepository.countAllLaporanMonth(bulan, tahun, namaPembeli, namaRoti);
    }

    @Override
    public Laporan cariLaporan(String idUser) {
        return laporanRepository.cariLaporan(idUser);
    }
}
