package finalProject.toko.roti.service;

import finalProject.toko.roti.model.Grafik;
import finalProject.toko.roti.repository.GrafikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("grafikService")
public class GrafikServiceImpl implements GrafikService{

    @Autowired
    GrafikRepository grafikRepository;

    @Override
    public List<Grafik> rotiTerbeli() {
        List<Grafik> pd;
        try{
            pd = grafikRepository.rotiTerbeli();
        }catch (IndexOutOfBoundsException e){
            System.out.println(e);
            pd = null;
        }
        return pd;
    }
}
