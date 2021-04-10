package finalProject.toko.roti.model;

public class Grafik {

    private String label;
    private int data;

    public Grafik() {
    }

    public Grafik(String label, int data) {
        this.label = label;
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public int getData() {
        return data;
    }

    public void setData(int data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Grafik{" +
                "label='" + label + '\'' +
                ", data=" + data +
                '}';
    }
}
