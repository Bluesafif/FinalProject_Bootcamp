package finalProject.toko.roti.repository;

import finalProject.toko.roti.model.Roti;

import java.util.List;

public interface RotiRepository {

    List<Roti> findAll(String paginationSelect);

    Roti findByNamaRoti(String namaRoti);

    void saveRoti(Roti roti);

    Roti findById(String idRoti);

    void updateRoti(Roti roti);

    void status(Roti roti);

    int findAllCountObat();

    int countStokRoti();
}
