package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Keranjang;

import java.util.List;

public interface KeranjangService {
    Keranjang findAll(String idUser);

    void deleteDetailById(String idDetail);
}
