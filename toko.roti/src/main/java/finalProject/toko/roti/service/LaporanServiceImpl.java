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
    public List<Laporan> findAllCustomer(String idUser) {
        List<Laporan> laporanList = laporanRepository.findAllCustomer(idUser);
        return laporanList;
    }

    @Override
    public int countAllKuantitasRoti(String idUser) {
        return laporanRepository.countAllKuantitasRoti(idUser);
    }

    @Override
    public int countPengeluaranRoti(String idUser) {
        return laporanRepository.countPengeluaranRoti(idUser);
    }

    @Override
    public List<Laporan> findAll() {
        List<Laporan> laporanList = laporanRepository.findAll();
        return laporanList;
    }

    @Override
    public int countAllRotiTerjual() {
        return laporanRepository.countAllRotiTerjual();
    }

    @Override
    public int countPendapatanRoti() {
        return laporanRepository.countPendapatanRoti();
    }
}
