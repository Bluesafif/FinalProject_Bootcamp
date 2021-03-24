package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Laporan;

import java.util.List;

public interface LaporanRepository {
    void saveLaporan(Laporan laporan);

    List<Laporan> findAllCustomer(String idUser);

    int countAllKuantitasRoti(String idUser);

    int countPengeluaranRoti(String idUser);

    List<Laporan> findAll();

    int countAllRotiTerjual();

    int countPendapatanRoti();
}
