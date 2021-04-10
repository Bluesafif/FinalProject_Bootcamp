package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Grafik;

import java.util.List;

public interface GrafikRepository {
    List<Grafik> rotiTerbeli(int bulan, int tahun);
}
