package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Laporan;

import java.util.List;

public interface LaporanRepository {
    void saveLaporan(Laporan laporan);

    List<Laporan> findAllCustomer(String idUser, int page, int limit);

    String countAllKuantitasRoti(String idUser);

    String countPengeluaranRoti(String idUser);

    List<Laporan> findAll(int page, int limit);

    String countAllRotiTerjual();

    String countPendapatanRoti();

    int findAllCountLaporan(String idUser);

    int countAllLaporan();

    List<Laporan> findAllMonth(int page, int limit, int bulan, int tahun, String namaPembeli, String namaRoti);

    int countAllLaporanMonth(int bulan, int tahun, String namaPembeli, String namaRoti);

    Laporan cariLaporan(String idUser);

    List<Laporan> findAllPrint(int bulan, int tahun, String namaPembeli, String namaRoti);
}
