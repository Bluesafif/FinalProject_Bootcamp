package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Laporan;

import java.util.List;

public interface LaporanRepository {
    void saveLaporan(Laporan laporan);

    List<Laporan> findAllCustomer(String idUser, int page, int limit);

    int countAllKuantitasRoti(String idUser);

    int countPengeluaranRoti(String idUser);

    List<Laporan> findAll(int page, int limit);

    int countAllRotiTerjual();

    int countPendapatanRoti();

    int findAllCountLaporan(String idUser);

    int countAllLaporan();

    List<Laporan> findAllMonth(int page, int limit, int bulan, int tahun, String namaPembeli, String namaRoti);

    int countAllLaporanMonth(int bulan, int tahun, String namaPembeli, String namaRoti);
}