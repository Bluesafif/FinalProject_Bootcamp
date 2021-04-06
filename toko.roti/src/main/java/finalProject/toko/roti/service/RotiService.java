package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Roti;

import java.util.List;

public interface RotiService {
    List<Roti> findAll(int page, int limit);

    Roti findByNamaRoti(String namaRoti);

    void saveRoti(Roti roti);

    Roti findById(String idRoti);

    void updateRoti(Roti roti);

    void status(Roti roti);

    int findAllCountRoti();

    int countStokRoti();

    int findAllCountRotiPelanggan();

    List<Roti> findSearch(String search, int page, int limit);

    int countSearch(String search);

    int countSearchPelanggan(String search);

    List<Roti> findSearchPelanggan(String search, int page, int limit);
}
