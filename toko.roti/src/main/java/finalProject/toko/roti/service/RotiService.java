package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Roti;

import java.util.List;

public interface RotiService {
    List<Roti> findAll();

    Roti findByNamaRoti(String namaRoti);

    void saveRoti(Roti roti);

    Roti findById(String idRoti);

    void updateRoti(Roti roti);
}
